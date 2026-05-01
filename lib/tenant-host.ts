// Pure string parsing of the request host. Edge-safe (no Node APIs, no DB).
// Used by middleware to set headers without calling Supabase.

export const TENANT_HOST_HEADER = 'x-tenant-host';
export const TENANT_SUBPORTAL_HEADER = 'x-tenant-subportal';

export type Subportal = 'public' | 'admin' | 'barber';

export function parseHost(host: string): {
  subportal: Subportal;
  barberSlug: string | null;
  rootHost: string;
} {
  const cleanHost = host.replace(/:\d+$/, '').toLowerCase();
  const parts = cleanHost.split('.');

  if (parts.length >= 3) {
    const sub = parts[0];
    const rest = parts.slice(1).join('.');
    if (sub === 'admin') return { subportal: 'admin', barberSlug: null, rootHost: rest };
    if (sub === 'app') return { subportal: 'public', barberSlug: null, rootHost: rest };
    return { subportal: 'barber', barberSlug: sub, rootHost: rest };
  }

  return { subportal: 'public', barberSlug: null, rootHost: cleanHost };
}
