-- 0001_init.sql — getbarber.app multi-tenant schema
-- Created for the SaaS pilot with Styles Barbershop 2 (Newark, NJ).

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ─── ENUMs ──────────────────────────────────────────────
create type public.user_role as enum ('owner', 'barber', 'client', 'super_admin');
create type public.tenant_plan as enum ('solo', 'studio', 'pro', 'business');
create type public.locale_code as enum ('es', 'en');
create type public.appointment_status as enum (
  'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'
);
create type public.deposit_status as enum ('none', 'pending', 'paid', 'refunded', 'failed');
create type public.message_channel as enum ('sms', 'whatsapp');
create type public.message_status as enum ('queued', 'sent', 'delivered', 'failed');
create type public.stripe_account_status as enum ('pending', 'restricted', 'active', 'disabled');
create type public.rent_period as enum ('weekly', 'monthly');
create type public.rent_charge_status as enum ('scheduled', 'paid', 'failed', 'cancelled');

-- ─── tenants ────────────────────────────────────────────
create table public.tenants (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  name          text not null,
  custom_domain text unique,
  plan          tenant_plan not null default 'studio',
  locale_default locale_code not null default 'es',
  branding      jsonb not null default '{"theme":"black_gold","logoUrl":null,"primary":null}'::jsonb,
  settings      jsonb not null default '{
    "address": null,
    "phone": null,
    "hours": {},
    "depositPercent": 25,
    "whatsappEnabled": true,
    "smsEnabled": true,
    "boothRentalEnabled": false
  }'::jsonb,
  stripe_customer_id   text,
  stripe_subscription_id text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index tenants_custom_domain_idx on public.tenants (custom_domain);

-- ─── users (mirrors auth.users with role+tenant) ────────
create table public.users (
  id           uuid primary key references auth.users(id) on delete cascade,
  tenant_id    uuid references public.tenants(id) on delete cascade,
  role         user_role not null default 'client',
  email        text,
  full_name    text,
  phone        text,
  preferred_locale locale_code not null default 'es',
  created_at   timestamptz not null default now()
);
create index users_tenant_idx on public.users (tenant_id);
create index users_role_idx on public.users (role);

-- ─── barbers ────────────────────────────────────────────
create table public.barbers (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  user_id       uuid unique references public.users(id) on delete set null,
  slug          text not null,
  full_name     text not null,
  alias         text,
  role_label    text,
  bio           text,
  color_hex     text default '#C9A961',
  instagram     text,
  rating        numeric(3,2) default 0,
  reviews_count int default 0,
  is_active     boolean not null default true,
  gallery       jsonb not null default '[]'::jsonb,
  -- Stripe Connect
  stripe_account_id     text,
  stripe_account_status stripe_account_status not null default 'pending',
  stripe_charges_enabled boolean not null default false,
  -- Booth rental
  booth_rent_amount_cents int default 0,
  booth_rent_period       rent_period default 'weekly',
  booth_rent_active       boolean not null default false,
  booth_rent_subscription_id text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (tenant_id, slug)
);
create index barbers_tenant_idx on public.barbers (tenant_id);

-- ─── services_catalog (per tenant) ──────────────────────
create table public.services_catalog (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  slug         text not null,
  name_es      text not null,
  name_en      text not null,
  description_es text,
  description_en text,
  duration_min int not null,
  base_price_cents int not null,
  is_active    boolean not null default true,
  sort_order   int default 0,
  created_at   timestamptz not null default now(),
  unique (tenant_id, slug)
);
create index services_tenant_idx on public.services_catalog (tenant_id);

-- ─── barber_services (override per barber) ──────────────
create table public.barber_services (
  barber_id    uuid not null references public.barbers(id) on delete cascade,
  service_id   uuid not null references public.services_catalog(id) on delete cascade,
  price_cents  int not null,
  duration_min int,
  is_offered   boolean not null default true,
  primary key (barber_id, service_id)
);

-- ─── clients (CRM per tenant) ───────────────────────────
create table public.clients (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  user_id      uuid references public.users(id) on delete set null,
  name         text not null,
  phone        text,
  email        text,
  preferred_locale locale_code not null default 'es',
  preferred_barber_id uuid references public.barbers(id) on delete set null,
  notes        text,
  created_at   timestamptz not null default now(),
  unique (tenant_id, phone)
);
create index clients_tenant_idx on public.clients (tenant_id);
create index clients_phone_idx on public.clients (phone);

-- ─── appointments ───────────────────────────────────────
create table public.appointments (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  barber_id    uuid not null references public.barbers(id) on delete restrict,
  client_id    uuid not null references public.clients(id) on delete restrict,
  service_id   uuid not null references public.services_catalog(id) on delete restrict,
  start_at     timestamptz not null,
  end_at       timestamptz not null,
  status       appointment_status not null default 'pending',
  locale       locale_code not null default 'es',
  price_cents  int not null,
  deposit_cents int not null default 0,
  deposit_status deposit_status not null default 'none',
  payment_intent_id text,
  paid_in_full boolean not null default false,
  notes_client text,
  notes_barber text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index appointments_tenant_start_idx on public.appointments (tenant_id, start_at);
create index appointments_barber_start_idx on public.appointments (barber_id, start_at);
create index appointments_client_idx on public.appointments (client_id);

-- ─── messages_log ───────────────────────────────────────
create table public.messages_log (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  channel      message_channel not null,
  template     text not null,
  locale       locale_code not null,
  to_number    text not null,
  status       message_status not null default 'queued',
  twilio_sid   text,
  error_message text,
  payload      jsonb,
  sent_at      timestamptz default now()
);
create index messages_log_tenant_idx on public.messages_log (tenant_id);
create index messages_log_appt_idx on public.messages_log (appointment_id);

-- ─── reviews ────────────────────────────────────────────
create table public.reviews (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  barber_id     uuid not null references public.barbers(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  client_id     uuid references public.clients(id) on delete set null,
  rating        int not null check (rating between 1 and 5),
  text          text,
  author_name   text,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);
create index reviews_barber_idx on public.reviews (barber_id);

-- ─── payouts_log (Stripe Connect transfers) ─────────────
create table public.payouts_log (
  id              uuid primary key default uuid_generate_v4(),
  barber_id       uuid not null references public.barbers(id) on delete cascade,
  amount_cents    int not null,
  stripe_transfer_id text,
  stripe_payment_intent_id text,
  appointment_id  uuid references public.appointments(id) on delete set null,
  created_at      timestamptz not null default now()
);
create index payouts_barber_idx on public.payouts_log (barber_id);

-- ─── booth_rent_charges ─────────────────────────────────
create table public.booth_rent_charges (
  id            uuid primary key default uuid_generate_v4(),
  barber_id     uuid not null references public.barbers(id) on delete cascade,
  period_start  date not null,
  period_end    date not null,
  amount_cents  int not null,
  status        rent_charge_status not null default 'scheduled',
  stripe_invoice_id text,
  paid_at       timestamptz,
  created_at    timestamptz not null default now()
);
create index booth_rent_barber_idx on public.booth_rent_charges (barber_id);

-- ─── helper functions for RLS ───────────────────────────
create or replace function public.auth_role() returns user_role
  language sql stable as $$
    select role from public.users where id = auth.uid();
  $$;

create or replace function public.auth_tenant_id() returns uuid
  language sql stable as $$
    select tenant_id from public.users where id = auth.uid();
  $$;

create or replace function public.auth_barber_id() returns uuid
  language sql stable as $$
    select id from public.barbers where user_id = auth.uid();
  $$;

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger
  language plpgsql as $$
  begin new.updated_at = now(); return new; end;
  $$;

create trigger tenants_updated  before update on public.tenants  for each row execute function public.set_updated_at();
create trigger barbers_updated  before update on public.barbers  for each row execute function public.set_updated_at();
create trigger appts_updated    before update on public.appointments for each row execute function public.set_updated_at();
