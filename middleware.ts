import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n';
import {
  TENANT_HOST_HEADER,
  TENANT_SUBPORTAL_HEADER,
  parseHost,
  type Subportal,
} from '@/lib/tenant-host';

const intlMiddleware = createIntlMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
});

const MARKETING_HOSTS = new Set([
  'getbarber.app',
  'www.getbarber.app',
]);

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').toLowerCase();
  const cleanHost = host.replace(/:\d+$/, '');
  const url = request.nextUrl;

  // Marketing apex — getbarber.app
  if (MARKETING_HOSTS.has(cleanHost)) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/marketing', request.url));
    }
    return intlMiddleware(request);
  }

  // Parse host into subportal + barber slug (no DB call — pure string parsing)
  const { subportal, barberSlug } = parseHost(cleanHost);

  const response = intlMiddleware(request);
  response.headers.set(TENANT_HOST_HEADER, host);
  response.headers.set(TENANT_SUBPORTAL_HEADER, subportal);
  if (barberSlug) response.headers.set('x-tenant-barber-slug', barberSlug);

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|api/stripe/webhook|api/twilio/webhook|favicon.ico|styles-logo.png|.*\\..*).*)',
  ],
};
