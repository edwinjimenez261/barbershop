import { headers } from 'next/headers';
import { cache } from 'react';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { mockTenant, mockBarbers, mockServices, mockBarberServices, mockReviews } from '@/lib/mock-data';
import type { Tenant, Barber, Service, BarberService, Review } from '@/lib/types/database';

export const TENANT_HEADER = 'x-tenant-id';
export const TENANT_SUBPORTAL_HEADER = 'x-tenant-subportal';
export const TENANT_HOST_HEADER = 'x-tenant-host';

export type Subportal = 'public' | 'admin' | 'barber';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

/**
 * Resolve a tenant by hostname (custom_domain) or by subdomain (admin.*, <barber>.*).
 * Returns { tenant, subportal, barberSlug? }.
 */
export async function resolveTenantByHost(
  host: string,
): Promise<{ tenant: Tenant | null; subportal: Subportal; barberSlug: string | null }> {
  const cleanHost = host.replace(/:\d+$/, '').toLowerCase();
  const parts = cleanHost.split('.');

  let subportal: Subportal = 'public';
  let barberSlug: string | null = null;
  let rootHost = cleanHost;

  if (parts.length >= 3) {
    const sub = parts[0];
    if (sub === 'admin') {
      subportal = 'admin';
      rootHost = parts.slice(1).join('.');
    } else if (sub === 'app') {
      // app.getbarber.app — onboarding self-service, not a tenant
      return { tenant: null, subportal: 'public', barberSlug: null };
    } else {
      // jose.stylesbarbershop2.com — barber portal
      subportal = 'barber';
      barberSlug = sub;
      rootHost = parts.slice(1).join('.');
    }
  }

  if (useMock) {
    if (rootHost === mockTenant.custom_domain || rootHost.endsWith(mockTenant.custom_domain ?? '___')) {
      return { tenant: mockTenant, subportal, barberSlug };
    }
    if (cleanHost.includes('localhost') || cleanHost.endsWith('.local')) {
      return { tenant: mockTenant, subportal, barberSlug };
    }
    return { tenant: null, subportal, barberSlug };
  }

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from('tenants')
    .select('*')
    .eq('custom_domain', rootHost)
    .maybeSingle();

  return { tenant: (data as Tenant) ?? null, subportal, barberSlug };
}

/**
 * Read the resolved tenant from middleware-set headers (cached per request).
 */
export const getCurrentTenant = cache(async (): Promise<{
  tenant: Tenant | null;
  subportal: Subportal;
  barberSlug: string | null;
}> => {
  const h = headers();
  const tenantId = h.get(TENANT_HEADER);
  const subportal = (h.get(TENANT_SUBPORTAL_HEADER) ?? 'public') as Subportal;
  const host = h.get(TENANT_HOST_HEADER) ?? '';

  if (!tenantId) {
    return { tenant: null, subportal, barberSlug: null };
  }

  if (useMock) {
    if (tenantId === mockTenant.id) return { tenant: mockTenant, subportal, barberSlug: parseBarberFromHost(host) };
    return { tenant: null, subportal, barberSlug: null };
  }

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from('tenants').select('*').eq('id', tenantId).maybeSingle();
  return {
    tenant: (data as Tenant) ?? null,
    subportal,
    barberSlug: parseBarberFromHost(host),
  };
});

function parseBarberFromHost(host: string): string | null {
  const parts = host.replace(/:\d+$/, '').split('.');
  if (parts.length < 3) return null;
  if (parts[0] === 'admin' || parts[0] === 'app') return null;
  return parts[0];
}

/**
 * Fetch barbers, services, prices, reviews for a tenant (public booking flow data).
 */
export async function getTenantCatalog(tenantId: string): Promise<{
  barbers: Barber[];
  services: Service[];
  barberServices: BarberService[];
  reviews: Review[];
}> {
  if (useMock) {
    return {
      barbers: mockBarbers,
      services: mockServices,
      barberServices: mockBarberServices,
      reviews: mockReviews,
    };
  }

  const supabase = createSupabaseAdminClient();
  const [barbersRes, servicesRes, bsRes, reviewsRes] = await Promise.all([
    supabase.from('barbers').select('*').eq('tenant_id', tenantId).eq('is_active', true).order('full_name'),
    supabase.from('services_catalog').select('*').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order'),
    supabase.from('barber_services').select('*'),
    supabase.from('reviews').select('*').eq('tenant_id', tenantId).eq('is_published', true).order('created_at', { ascending: false }).limit(10),
  ]);

  return {
    barbers: (barbersRes.data ?? []) as Barber[],
    services: (servicesRes.data ?? []) as Service[],
    barberServices: (bsRes.data ?? []) as BarberService[],
    reviews: (reviewsRes.data ?? []) as Review[],
  };
}
