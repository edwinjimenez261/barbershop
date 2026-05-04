import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createBarberConnectAccount, createOnboardingLink } from '@/lib/stripe/connect';

/**
 * Start the Stripe Connect Express onboarding flow for the authenticated barber.
 * Creates the account if missing, then returns a hosted onboarding URL.
 */
export async function POST(req: NextRequest) {
  const supa = createSupabaseServerClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const admin = createSupabaseAdminClient();
  const barberRes = await admin
    .from('barbers')
    .select('id, full_name, stripe_account_id')
    .eq('user_id', user.id)
    .single();
  const barber = barberRes.data as
    | { id: string; full_name: string; stripe_account_id: string | null }
    | null;

  if (!barber) return NextResponse.json({ error: 'not_a_barber' }, { status: 403 });

  let accountId = barber.stripe_account_id;
  if (!accountId) {
    const acct = await createBarberConnectAccount({
      email: user.email!,
      fullName: barber.full_name,
    });
    accountId = acct.id;
    await admin.from('barbers').update({ stripe_account_id: accountId }).eq('id', barber.id);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getbarber.app';
  const link = await createOnboardingLink({
    accountId,
    refreshUrl: `${baseUrl}/api/stripe/connect/refresh?aid=${accountId}`,
    returnUrl: `${baseUrl}/es/barbero/ingresos?onboarded=1`,
  });

  return NextResponse.json({ url: link.url });
}
