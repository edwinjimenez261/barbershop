import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n';
import {
  resolveTenantByHost,
  TENANT_HEADER,
  TENANT_SUBPORTAL_HEADER,
  TENANT_HOST_HEADER,
} from '@/lib/tenant';

const intlMiddleware = createIntlMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
});

const MARKETING_HOSTS = new Set([
  'getbarber.app',
  'www.getbarber.app',
  'localhost',
]);

export async function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').toLowerCase();
  const cleanHost = host.replace(/:\d+$/, '');
  const url = request.nextUrl;

  // Marketing site — no tenant resolution.
  if (MARKETING_HOSTS.has(cleanHost) && !cleanHost.endsWith('.local')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/marketing', request.url));
    }
    return intlMiddleware(request);
  }

  // Tenant resolution
  const { tenant, subportal, barberSlug } = await resolveTenantByHost(host);

  if (!tenant) {
    return NextResponse.redirect(new URL('https://getbarber.app'));
  }

  const response = intlMiddleware(request);
  response.headers.set(TENANT_HEADER, tenant.id);
  response.headers.set(TENANT_SUBPORTAL_HEADER, subportal);
  response.headers.set(TENANT_HOST_HEADER, host);
  if (barberSlug) response.headers.set('x-tenant-barber-slug', barberSlug);

  return response;
}

export const config = {
  matcher: [
    // Skip Next internals, static, api routes that don't need tenant
    '/((?!_next|_vercel|api/stripe/webhook|api/twilio/webhook|favicon.ico|styles-logo.png|.*\\..*).*)',
  ],
};
