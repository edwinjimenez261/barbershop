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

// Minimal Database type for the supabase-js generic.
export interface Database {
  public: {
    Tables: {
      tenants:           { Row: Tenant;        Insert: Partial<Tenant>;        Update: Partial<Tenant> };
      barbers:           { Row: Barber;        Insert: Partial<Barber>;        Update: Partial<Barber> };
      services_catalog:  { Row: Service;       Insert: Partial<Service>;       Update: Partial<Service> };
      barber_services:   { Row: BarberService; Insert: Partial<BarberService>; Update: Partial<BarberService> };
      clients:           { Row: Client;        Insert: Partial<Client>;        Update: Partial<Client> };
      appointments:      { Row: Appointment;   Insert: Partial<Appointment>;   Update: Partial<Appointment> };
      reviews:           { Row: Review;        Insert: Partial<Review>;        Update: Partial<Review> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
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
  };
}
