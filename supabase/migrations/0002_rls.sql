-- 0002_rls.sql — Row Level Security policies
-- Multi-tenant isolation: a tenant's data is invisible to other tenants.
-- Role-based access within a tenant: owner > barber > client.

alter table public.tenants            enable row level security;
alter table public.users              enable row level security;
alter table public.barbers            enable row level security;
alter table public.services_catalog   enable row level security;
alter table public.barber_services    enable row level security;
alter table public.clients            enable row level security;
alter table public.appointments       enable row level security;
alter table public.messages_log       enable row level security;
alter table public.reviews            enable row level security;
alter table public.payouts_log        enable row level security;
alter table public.booth_rent_charges enable row level security;

-- ── tenants ─────────────────────────────────────────────
-- Public can read minimal tenant data by custom_domain (for landing pages).
create policy tenants_public_read on public.tenants for select using (true);
create policy tenants_owner_update on public.tenants for update
  using (id = auth_tenant_id() and auth_role() = 'owner')
  with check (id = auth_tenant_id() and auth_role() = 'owner');

-- ── users ───────────────────────────────────────────────
create policy users_self_read on public.users for select
  using (id = auth.uid() or (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin')));
create policy users_self_update on public.users for update
  using (id = auth.uid()) with check (id = auth.uid());
create policy users_owner_manage on public.users for all
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'))
  with check (tenant_id = auth_tenant_id());

-- ── barbers ─────────────────────────────────────────────
-- Public read for booking flow.
create policy barbers_public_read on public.barbers for select using (is_active = true);
create policy barbers_owner_manage on public.barbers for all
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'))
  with check (tenant_id = auth_tenant_id());
create policy barbers_self_update on public.barbers for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ── services_catalog ────────────────────────────────────
create policy services_public_read on public.services_catalog for select using (is_active = true);
create policy services_owner_manage on public.services_catalog for all
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'))
  with check (tenant_id = auth_tenant_id());

-- ── barber_services ─────────────────────────────────────
create policy bs_public_read on public.barber_services for select using (true);
create policy bs_self_manage on public.barber_services for all
  using (
    barber_id = auth_barber_id()
    or exists(select 1 from public.barbers b where b.id = barber_id and b.tenant_id = auth_tenant_id() and auth_role() = 'owner')
  )
  with check (
    barber_id = auth_barber_id()
    or exists(select 1 from public.barbers b where b.id = barber_id and b.tenant_id = auth_tenant_id() and auth_role() = 'owner')
  );

-- ── clients ─────────────────────────────────────────────
-- Owners see all clients of their tenant. Barbers see only clients with appts assigned to them.
-- Clients see only themselves.
create policy clients_owner_all on public.clients for all
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'))
  with check (tenant_id = auth_tenant_id());
create policy clients_barber_read on public.clients for select
  using (
    auth_role() = 'barber'
    and exists (
      select 1 from public.appointments a
      where a.client_id = clients.id and a.barber_id = auth_barber_id()
    )
  );
create policy clients_self_read on public.clients for select
  using (user_id = auth.uid());

-- ── appointments ────────────────────────────────────────
create policy appts_owner_all on public.appointments for all
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'))
  with check (tenant_id = auth_tenant_id());
create policy appts_barber_own on public.appointments for all
  using (barber_id = auth_barber_id())
  with check (barber_id = auth_barber_id());
create policy appts_client_own on public.appointments for select
  using (client_id in (select id from public.clients where user_id = auth.uid()));

-- ── messages_log ────────────────────────────────────────
create policy msg_owner_read on public.messages_log for select
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'));
create policy msg_barber_read on public.messages_log for select
  using (
    auth_role() = 'barber'
    and exists (select 1 from public.appointments a where a.id = appointment_id and a.barber_id = auth_barber_id())
  );

-- ── reviews ─────────────────────────────────────────────
create policy reviews_public_read on public.reviews for select using (is_published = true);
create policy reviews_owner_manage on public.reviews for all
  using (tenant_id = auth_tenant_id() and auth_role() in ('owner', 'super_admin'))
  with check (tenant_id = auth_tenant_id());

-- ── payouts_log ─────────────────────────────────────────
-- ONLY the barber sees their own payouts. Owner does NOT (privacy of booth rental model).
create policy payouts_self_read on public.payouts_log for select
  using (barber_id = auth_barber_id());

-- ── booth_rent_charges ──────────────────────────────────
create policy rent_owner_read on public.booth_rent_charges for select
  using (
    auth_role() in ('owner', 'super_admin')
    and exists (select 1 from public.barbers b where b.id = barber_id and b.tenant_id = auth_tenant_id())
  );
create policy rent_self_read on public.booth_rent_charges for select
  using (barber_id = auth_barber_id());
