// Generated-style typing for the Supabase schema.
// In production, replace with `supabase gen types typescript --project-id ... > lib/types/database.ts`.
// Kept hand-written for now so typecheck passes without running the CLI.

export type Locale = 'es' | 'en';
export type UserRole = 'owner' | 'barber' | 'client' | 'super_admin';
export type TenantPlan = 'solo' | 'studio' | 'pro' | 'business';
export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';
export type DepositStatus = 'none' | 'pending' | 'paid' | 'refunded' | 'failed';
export type MessageChannel = 'sms' | 'whatsapp';
export type MessageStatus = 'queued' | 'sent' | 'delivered' | 'failed';
export type StripeAccountStatus = 'pending' | 'restricted' | 'active' | 'disabled';
export type RentPeriod = 'weekly' | 'monthly';
export type RentChargeStatus = 'scheduled' | 'paid' | 'failed' | 'cancelled';

export type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

export interface TenantBranding {
  theme: 'black_gold' | 'classic_pole' | 'modern_minimal';
  logoUrl: string | null;
  primary?: string | null;
}

export interface TenantSettings {
  address: string | null;
  phone: string | null;
  hours: Record<string, string>;
  depositPercent: number;
  whatsappEnabled: boolean;
  smsEnabled: boolean;
  boothRentalEnabled: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  custom_domain: string | null;
  plan: TenantPlan;
  locale_default: Locale;
  branding: TenantBranding;
  settings: TenantSettings;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Barber {
  id: string;
  tenant_id: string;
  user_id: string | null;
  slug: string;
  full_name: string;
  alias: string | null;
  role_label: string | null;
  bio: string | null;
  color_hex: string;
  instagram: string | null;
  rating: number;
  reviews_count: number;
  is_active: boolean;
  gallery: Json;
  stripe_account_id: string | null;
  stripe_account_status: StripeAccountStatus;
  stripe_charges_enabled: boolean;
  booth_rent_amount_cents: number;
  booth_rent_period: RentPeriod;
  booth_rent_active: boolean;
  booth_rent_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  tenant_id: string;
  slug: string;
  name_es: string;
  name_en: string;
  description_es: string | null;
  description_en: string | null;
  duration_min: number;
  base_price_cents: number;
  is_active: boolean;
  sort_order: number;
}

export interface BarberService {
  barber_id: string;
  service_id: string;
  price_cents: number;
  duration_min: number | null;
  is_offered: boolean;
}

export interface Client {
  id: string;
  tenant_id: string;
  user_id: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  preferred_locale: Locale;
  preferred_barber_id: string | null;
  notes: string | null;
}

export interface Appointment {
  id: string;
  tenant_id: string;
  barber_id: string;
  client_id: string;
  service_id: string;
  start_at: string;
  end_at: string;
  status: AppointmentStatus;
  locale: Locale;
  price_cents: number;
  deposit_cents: number;
  deposit_status: DepositStatus;
  payment_intent_id: string | null;
  paid_in_full: boolean;
  notes_client: string | null;
  notes_barber: string | null;
}

export interface Review {
  id: string;
  tenant_id: string;
  barber_id: string;
  rating: number;
  text: string | null;
  author_name: string | null;
  is_published: boolean;
  created_at: string;
}

// Database type for the supabase-js generic.
// NOTE: regenerate with `supabase gen types typescript --project-id <ref>` once the
// project is linked. Hand-written for now so typecheck passes without the CLI.

type TableShape<T> = {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      tenants:            TableShape<Tenant>;
      users:              TableShape<{ id: string; tenant_id: string | null; role: UserRole; email: string | null; full_name: string | null; phone: string | null; preferred_locale: Locale; created_at: string }>;
      barbers:            TableShape<Barber>;
      services_catalog:   TableShape<Service>;
      barber_services:    TableShape<BarberService>;
      clients:            TableShape<Client>;
      appointments:       TableShape<Appointment>;
      reviews:            TableShape<Review>;
      messages_log:       TableShape<{ id: string; tenant_id: string; appointment_id: string | null; channel: MessageChannel; template: string; locale: Locale; to_number: string; status: MessageStatus; twilio_sid: string | null; error_message: string | null; payload: Json | null; sent_at: string }>;
      payouts_log:        TableShape<{ id: string; barber_id: string; amount_cents: number; stripe_transfer_id: string | null; stripe_payment_intent_id: string | null; appointment_id: string | null; created_at: string }>;
      booth_rent_charges: TableShape<{ id: string; barber_id: string; period_start: string; period_end: string; amount_cents: number; status: RentChargeStatus; stripe_invoice_id: string | null; paid_at: string | null; created_at: string }>;
    };
    Views: Record<string, { Row: Record<string, unknown>; Relationships: [] }>;
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: {
      user_role: UserRole;
      tenant_plan: TenantPlan;
      locale_code: Locale;
      appointment_status: AppointmentStatus;
      deposit_status: DepositStatus;
      message_channel: MessageChannel;
      message_status: MessageStatus;
      stripe_account_status: StripeAccountStatus;
      rent_period: RentPeriod;
      rent_charge_status: RentChargeStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
