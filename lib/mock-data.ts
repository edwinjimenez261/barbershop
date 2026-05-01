// Mock data mirroring the Styles Barbershop 2 seed (supabase/migrations/0003_seed_styles.sql).
// Used when NEXT_PUBLIC_USE_MOCK_DATA=true so dev runs without Supabase.

import type { Tenant, Barber, Service, BarberService, Review } from '@/lib/types/database';

export const mockTenant: Tenant = {
  id: '11111111-1111-1111-1111-111111111111',
  slug: 'styles-barbershop-2',
  name: 'Styles Barbershop 2',
  custom_domain: 'stylesbarbershop2.com',
  plan: 'pro',
  locale_default: 'es',
  branding: { theme: 'black_gold', logoUrl: '/styles-logo.png' },
  settings: {
    address: '49 Warwick St, Newark, NJ 07105',
    phone: '(973) 555-0142',
    hours: {
      Mon: '10:00 AM – 8:00 PM',
      Tue: '10:00 AM – 8:00 PM',
      Wed: '10:00 AM – 8:00 PM',
      Thu: '10:00 AM – 8:00 PM',
      Fri: '10:00 AM – 9:00 PM',
      Sat: '9:00 AM – 9:00 PM',
      Sun: '10:00 AM – 5:00 PM',
    },
    depositPercent: 25,
    whatsappEnabled: true,
    smsEnabled: true,
    boothRentalEnabled: true,
    rating: 4.9,
    reviewsCount: 287,
  },
  stripe_customer_id: null,
  stripe_subscription_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const tid = mockTenant.id;
const now = new Date().toISOString();

export const mockBarbers: Barber[] = [
  {
    id: 'a0000001-0000-0000-0000-000000000001',
    tenant_id: tid,
    user_id: null,
    slug: 'jose',
    full_name: 'José Ramírez',
    alias: 'El Maestro',
    role_label: 'Senior · 15 años',
    bio: 'Especialista en fades clásicos, diseños y barba con toalla caliente.',
    color_hex: '#C9A961',
    instagram: '@jose_thecuts',
    rating: 4.95,
    reviews_count: 124,
    is_active: true,
    gallery: [],
    stripe_account_id: null,
    stripe_account_status: 'pending',
    stripe_charges_enabled: false,
    booth_rent_amount_cents: 25000,
    booth_rent_period: 'weekly',
    booth_rent_active: true,
    booth_rent_subscription_id: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'a0000001-0000-0000-0000-000000000002',
    tenant_id: tid,
    user_id: null,
    slug: 'carlos',
    full_name: 'Carlos Mendoza',
    alias: 'Carlito',
    role_label: 'Senior · 8 años',
    bio: 'Cortes modernos, diseños creativos y enchape perfecto.',
    color_hex: '#8B6F47',
    instagram: '@carlito_barber',
    rating: 4.88,
    reviews_count: 89,
    is_active: true,
    gallery: [],
    stripe_account_id: null,
    stripe_account_status: 'pending',
    stripe_charges_enabled: false,
    booth_rent_amount_cents: 20000,
    booth_rent_period: 'weekly',
    booth_rent_active: true,
    booth_rent_subscription_id: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'a0000001-0000-0000-0000-000000000003',
    tenant_id: tid,
    user_id: null,
    slug: 'miguel',
    full_name: 'Miguel Santos',
    alias: 'Miguelito',
    role_label: 'Mid · 4 años',
    bio: 'Especialista en cortes infantiles y kids cuts.',
    color_hex: '#5D4E37',
    instagram: '@miguel_styles',
    rating: 4.82,
    reviews_count: 56,
    is_active: true,
    gallery: [],
    stripe_account_id: null,
    stripe_account_status: 'pending',
    stripe_charges_enabled: false,
    booth_rent_amount_cents: 18000,
    booth_rent_period: 'weekly',
    booth_rent_active: true,
    booth_rent_subscription_id: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'a0000001-0000-0000-0000-000000000004',
    tenant_id: tid,
    user_id: null,
    slug: 'luis',
    full_name: 'Luis Pérez',
    alias: 'Junior',
    role_label: 'Junior · 2 años',
    bio: 'Fades, líneas limpias y precios accesibles.',
    color_hex: '#A0826D',
    instagram: '@luis_thebarber',
    rating: 4.75,
    reviews_count: 32,
    is_active: true,
    gallery: [],
    stripe_account_id: null,
    stripe_account_status: 'pending',
    stripe_charges_enabled: false,
    booth_rent_amount_cents: 15000,
    booth_rent_period: 'weekly',
    booth_rent_active: false,
    booth_rent_subscription_id: null,
    created_at: now,
    updated_at: now,
  },
];

export const mockServices: Service[] = [
  { id: 's-corte',         tenant_id: tid, slug: 'corte',         name_es: 'Corte clásico',   name_en: 'Classic cut',   description_es: 'Corte tradicional con tijera y máquina',         description_en: 'Traditional cut with scissors and clippers', duration_min: 30, base_price_cents: 2500, is_active: true, sort_order: 1 },
  { id: 's-fade',          tenant_id: tid, slug: 'fade',          name_es: 'Fade',            name_en: 'Fade',          description_es: 'Degradado limpio (low, mid o high fade)',        description_en: 'Clean fade (low, mid, or high)',             duration_min: 30, base_price_cents: 3000, is_active: true, sort_order: 2 },
  { id: 's-corte-barba',   tenant_id: tid, slug: 'corte-barba',   name_es: 'Corte + Barba',   name_en: 'Cut + Beard',   description_es: 'Corte completo más arreglo de barba',            description_en: 'Full cut plus beard trim',                   duration_min: 45, base_price_cents: 4000, is_active: true, sort_order: 3 },
  { id: 's-diseno',        tenant_id: tid, slug: 'diseno',        name_es: 'Diseño / Líneas', name_en: 'Design / Lines',description_es: 'Corte con diseño personalizado',                 description_en: 'Cut with custom design',                     duration_min: 60, base_price_cents: 5000, is_active: true, sort_order: 4 },
  { id: 's-barba-premium', tenant_id: tid, slug: 'barba-premium', name_es: 'Barba premium',   name_en: 'Premium beard', description_es: 'Arreglo de barba con toalla caliente y aceites', description_en: 'Hot towel beard with oils',                  duration_min: 30, base_price_cents: 2500, is_active: true, sort_order: 5 },
  { id: 's-kids',          tenant_id: tid, slug: 'kids',          name_es: 'Corte niño',      name_en: 'Kids cut',      description_es: 'Corte para menores de 12 años',                  description_en: 'Cut for under-12 kids',                      duration_min: 30, base_price_cents: 2000, is_active: true, sort_order: 6 },
];

const overrides: Record<string, Record<string, number>> = {
  'a0000001-0000-0000-0000-000000000001': { 'corte': 3500, 'fade': 4500, 'corte-barba': 5500, 'diseno': 6500, 'barba-premium': 3500 },
  'a0000001-0000-0000-0000-000000000002': { 'corte': 3000, 'fade': 3500, 'corte-barba': 4500, 'diseno': 5500, 'barba-premium': 3000 },
  'a0000001-0000-0000-0000-000000000003': { 'corte': 2500, 'fade': 3000, 'corte-barba': 4000, 'diseno': 5000, 'kids': 2000, 'barba-premium': 2500 },
  'a0000001-0000-0000-0000-000000000004': { 'corte': 2000, 'fade': 2500, 'corte-barba': 3500, 'diseno': 4500, 'kids': 1800 },
};

export const mockBarberServices: BarberService[] = (() => {
  const out: BarberService[] = [];
  for (const [barberId, prices] of Object.entries(overrides)) {
    for (const [slug, price] of Object.entries(prices)) {
      const svc = mockServices.find((s) => s.slug === slug);
      if (!svc) continue;
      out.push({
        barber_id: barberId,
        service_id: svc.id,
        price_cents: price,
        duration_min: svc.duration_min,
        is_offered: true,
      });
    }
  }
  return out;
})();

export const mockReviews: Review[] = [
  { id: 'r1', tenant_id: tid, barber_id: 'a0000001-0000-0000-0000-000000000001', rating: 5, text: 'José es un maestro. El fade quedó perfecto y la barba con la toalla caliente es otro nivel. 100% recomendado.', author_name: 'Roberto N.', is_published: true, created_at: now },
  { id: 'r2', tenant_id: tid, barber_id: 'a0000001-0000-0000-0000-000000000001', rating: 5, text: 'Llevo 3 años yendo. Siempre puntual, siempre limpio. El mejor de Newark.', author_name: 'Andrés V.', is_published: true, created_at: now },
  { id: 'r3', tenant_id: tid, barber_id: 'a0000001-0000-0000-0000-000000000002', rating: 5, text: 'Carlito hizo un diseño en la nuca brutal. Muy creativo y trabaja rápido.', author_name: 'Eduardo R.', is_published: true, created_at: now },
  { id: 'r4', tenant_id: tid, barber_id: 'a0000001-0000-0000-0000-000000000003', rating: 5, text: 'Llevo a mi hijo con Miguel. Tiene paciencia y los niños lo aman.', author_name: 'Sebastián M.', is_published: true, created_at: now },
  { id: 'r5', tenant_id: tid, barber_id: 'a0000001-0000-0000-0000-000000000004', rating: 5, text: 'Luis está empezando pero tiene mano. Buen precio, buen corte.', author_name: 'Iván F.', is_published: true, created_at: now },
];

// Mock appointments for "today" — used in barber/owner portals
export interface MockAppointment {
  id: string;
  barber_id: string;
  client_name: string;
  service_slug: string;
  start_at: string; // HH:mm for simplicity
  status: 'confirmed' | 'in_progress' | 'completed' | 'no_show';
  deposit_cents: number;
  price_cents: number;
}

export const mockAppointmentsToday: MockAppointment[] = [
  { id: '1',  barber_id: 'a0000001-0000-0000-0000-000000000001', client_name: 'Roberto Núñez',  service_slug: 'corte-barba',   start_at: '10:00', status: 'confirmed',   deposit_cents: 1500, price_cents: 5500 },
  { id: '2',  barber_id: 'a0000001-0000-0000-0000-000000000001', client_name: 'Andrés Vega',    service_slug: 'fade',          start_at: '11:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 4500 },
  { id: '3',  barber_id: 'a0000001-0000-0000-0000-000000000001', client_name: 'Manuel López',   service_slug: 'diseno',        start_at: '12:30', status: 'in_progress', deposit_cents: 2000, price_cents: 6500 },
  { id: '4',  barber_id: 'a0000001-0000-0000-0000-000000000001', client_name: 'Pedro Cruz',     service_slug: 'corte',         start_at: '14:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 3500 },
  { id: '5',  barber_id: 'a0000001-0000-0000-0000-000000000001', client_name: 'Diego Morales',  service_slug: 'corte-barba',   start_at: '15:30', status: 'confirmed',   deposit_cents: 1500, price_cents: 5500 },
  { id: '6',  barber_id: 'a0000001-0000-0000-0000-000000000001', client_name: 'Javier Ortiz',   service_slug: 'corte',         start_at: '18:30', status: 'confirmed',   deposit_cents: 1000, price_cents: 3500 },
  { id: '7',  barber_id: 'a0000001-0000-0000-0000-000000000002', client_name: 'Eduardo Rivas',  service_slug: 'fade',          start_at: '11:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 3500 },
  { id: '8',  barber_id: 'a0000001-0000-0000-0000-000000000002', client_name: 'Tomás Herrera',  service_slug: 'corte',         start_at: '12:00', status: 'confirmed',   deposit_cents: 0,    price_cents: 3000 },
  { id: '9',  barber_id: 'a0000001-0000-0000-0000-000000000002', client_name: 'Ricardo Soto',   service_slug: 'corte-barba',   start_at: '14:30', status: 'in_progress', deposit_cents: 1500, price_cents: 4500 },
  { id: '10', barber_id: 'a0000001-0000-0000-0000-000000000002', client_name: 'Antonio Gil',    service_slug: 'fade',          start_at: '16:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 3500 },
  { id: '11', barber_id: 'a0000001-0000-0000-0000-000000000003', client_name: 'Sebastián M.',   service_slug: 'kids',          start_at: '10:30', status: 'confirmed',   deposit_cents: 0,    price_cents: 2000 },
  { id: '12', barber_id: 'a0000001-0000-0000-0000-000000000003', client_name: 'Joaquín R.',     service_slug: 'kids',          start_at: '11:30', status: 'confirmed',   deposit_cents: 0,    price_cents: 2000 },
  { id: '13', barber_id: 'a0000001-0000-0000-0000-000000000003', client_name: 'David Castillo', service_slug: 'fade',          start_at: '13:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 3000 },
  { id: '14', barber_id: 'a0000001-0000-0000-0000-000000000003', client_name: 'Jorge Mejía',    service_slug: 'corte',         start_at: '15:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 2500 },
  { id: '15', barber_id: 'a0000001-0000-0000-0000-000000000004', client_name: 'Iván Flores',    service_slug: 'fade',          start_at: '12:00', status: 'confirmed',   deposit_cents: 1000, price_cents: 2500 },
  { id: '16', barber_id: 'a0000001-0000-0000-0000-000000000004', client_name: 'Raúl Bautista',  service_slug: 'corte',         start_at: '14:00', status: 'confirmed',   deposit_cents: 0,    price_cents: 2000 },
  { id: '17', barber_id: 'a0000001-0000-0000-0000-000000000004', client_name: 'Camilo Ruiz',    service_slug: 'fade',          start_at: '16:30', status: 'confirmed',   deposit_cents: 1000, price_cents: 2500 },
];
