import { NextRequest, NextResponse } from 'next/server';
import { createOnboardingLink } from '@/lib/stripe/connect';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const accountId = url.searchParams.get('aid');
  if (!accountId) return NextResponse.json({ error: 'no_account' }, { status: 400 });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getbarber.app';
  const link = await createOnboardingLink({
    accountId,
    refreshUrl: `${baseUrl}/api/stripe/connect/refresh?aid=${accountId}`,
    returnUrl: `${baseUrl}/es/barbero/ingresos?onboarded=1`,
  });
  return NextResponse.redirect(link.url);
}
