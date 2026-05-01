import { headers } from 'next/headers';
import { mockTenant, mockBarbers, mockServices, mockBarberServices, mockReviews } from '@/lib/mock-data';
import {
  TENANT_HOST_HEADER,
  TENANT_SUBPORTAL_HEADER,
  parseHost,
  type Subportal,
} from '@/lib/tenant-host';
import type { Tenant, Barber, Service, BarberService, Review } from '@/lib/types/database';

export { TENANT_HOST_HEADER, TENANT_SUBPORTAL_HEADER, type Subportal };

// We're in mock mode either explicitly, or implicitly when Supabase env vars
// are missing (e.g. early Vercel previews before Edwin pastes the keys).
function isMockMode(): boolean {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') return true;
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY;
}

type CachedResolution = { tenant: Tenant | null; subportal: Subportal; barberSlug: string | null };

/**
 * Resolve the current tenant from middleware-set headers.
 * Mock mode (or missing Supabase keys) returns the Styles Barbershop 2 seed,
 * so previews render something useful before real data is wired up.
 */
export async function getCurrentTenant(): Promise<CachedResolution> {
  const h = headers();
  const subportal = (h.get(TENANT_SUBPORTAL_HEADER) ?? 'public') as Subportal;
  const host = h.get(TENANT_HOST_HEADER) ?? '';
  const { barberSlug, rootHost } = parseHost(host);

  if (isMockMode()) {
    return { tenant: mockTenant, subportal, barberSlug };
  }

  // Lazy-import the admin client so middleware (Edge runtime) never bundles it.
  const { createSupabaseAdminClient } = await import('@/lib/supabase/admin');
  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from('tenants')
      .select('*')
      .eq('custom_domain', rootHost)
      .maybeSingle();
    return { tenant: (data as Tenant | null) ?? null, subportal, barberSlug };
  } catch {
    return { tenant: null, subportal, barberSlug };
  }
}

export async function getTenantCatalog(tenantId: string): Promise<{
  barbers: Barber[];
  services: Service[];
  barberServices: BarberService[];
  reviews: Review[];
}> {
  if (isMockMode()) {
    return {
      barbers: mockBarbers,
      services: mockServices,
      barberServices: mockBarberServices,
      reviews: mockReviews,
    };
  }

  const { createSupabaseAdminClient } = await import('@/lib/supabase/admin');
  try {
    const supabase = createSupabaseAdminClient();
    const [barbersRes, servicesRes, bsRes, reviewsRes] = await Promise.all([
      supabase.from('barbers').select('*').eq('tenant_id', tenantId).eq('is_active', true).order('full_name'),
      supabase.from('services_catalog').select('*').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order'),
      supabase.from('barber_services').select('*'),
      supabase
        .from('reviews')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);
    return {
      barbers: (barbersRes.data ?? []) as Barber[],
      services: (servicesRes.data ?? []) as Service[],
      barberServices: (bsRes.data ?? []) as BarberService[],
      reviews: (reviewsRes.data ?? []) as Review[],
    };
  } catch {
    return {
      barbers: mockBarbers,
      services: mockServices,
      barberServices: mockBarberServices,
      reviews: mockReviews,
    };
  }
}
