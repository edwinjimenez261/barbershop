import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createDepositPaymentIntent } from '@/lib/stripe/connect';
import { notify } from '@/lib/notify';
import { resolveTenantByHost } from '@/lib/tenant';

const Body = z.object({
  barberId: z.string().uuid(),
  serviceId: z.string(),
  startAt: z.string(), // ISO
  locale: z.enum(['es', 'en']),
  name: z.string().min(2),
  phone: z.string().min(7),
  notes: z.string().optional(),
  priceCents: z.number().int().positive(),
  depositCents: z.number().int().nonnegative(),
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const host = req.headers.get('host') ?? '';
  const { tenant } = await resolveTenantByHost(host);
  if (!tenant) return NextResponse.json({ error: 'tenant_not_found' }, { status: 404 });

  const usingMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  if (usingMock) {
    // Just return success without persisting; the UI handles it.
    return NextResponse.json({ ok: true, appointmentId: 'mock-' + Date.now(), clientSecret: null });
  }

  const supabase = createSupabaseAdminClient();

  // 1. Upsert client
  const existingRes = await supabase
    .from('clients')
    .select('id')
    .eq('tenant_id', tenant.id)
    .eq('phone', body.phone)
    .maybeSingle();
  const existingClient = existingRes.data as { id: string } | null;

  let clientId = existingClient?.id;
  if (!clientId) {
    const newRes = await supabase
      .from('clients')
      .insert({ tenant_id: tenant.id, name: body.name, phone: body.phone, preferred_locale: body.locale })
      .select('id')
      .single();
    if (newRes.error) return NextResponse.json({ error: newRes.error.message }, { status: 500 });
    clientId = (newRes.data as { id: string }).id;
  }

  // 2. Compute end_at from service duration
  const svcRes = await supabase
    .from('services_catalog')
    .select('duration_min')
    .eq('id', body.serviceId)
    .single();
  const svc = svcRes.data as { duration_min: number } | null;
  if (!svc) return NextResponse.json({ error: 'service_not_found' }, { status: 404 });
  const start = new Date(body.startAt);
  const end = new Date(start.getTime() + svc.duration_min * 60_000);

  // 3. Insert appointment (status pending until deposit captured)
  const apptRes = await supabase
    .from('appointments')
    .insert({
      tenant_id: tenant.id,
      barber_id: body.barberId,
      client_id: clientId,
      service_id: body.serviceId,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      status: 'pending',
      locale: body.locale,
      price_cents: body.priceCents,
      deposit_cents: body.depositCents,
      deposit_status: body.depositCents > 0 ? 'pending' : 'none',
      notes_client: body.notes,
    })
    .select('id')
    .single();
  if (apptRes.error) return NextResponse.json({ error: apptRes.error.message }, { status: 500 });
  const appt = apptRes.data as { id: string };

  // 4. Create Stripe PaymentIntent if deposit > 0 and barber has Connect account
  let clientSecret: string | null = null;
  if (body.depositCents > 0) {
    const barberRes = await supabase
      .from('barbers')
      .select('stripe_account_id, stripe_charges_enabled, full_name')
      .eq('id', body.barberId)
      .single();
    const barber = barberRes.data as
      | { stripe_account_id: string | null; stripe_charges_enabled: boolean; full_name: string }
      | null;

    if (barber?.stripe_account_id && barber.stripe_charges_enabled) {
      const intent = await createDepositPaymentIntent({
        barberConnectAccountId: barber.stripe_account_id,
        depositCents: body.depositCents,
        customerName: body.name,
        appointmentId: appt.id,
        locale: body.locale,
      });
      clientSecret = intent.client_secret;
      await supabase
        .from('appointments')
        .update({ payment_intent_id: intent.id })
        .eq('id', appt.id);
    } else {
      // Fallback: barber not onboarded → mark deposit as none, confirm anyway
      await supabase
        .from('appointments')
        .update({ status: 'confirmed', deposit_status: 'none', deposit_cents: 0 })
        .eq('id', appt.id);
    }
  } else {
    await supabase.from('appointments').update({ status: 'confirmed' }).eq('id', appt.id);
  }

  // 5. Send confirmation message (best-effort, don't block on failure)
  notify({
    tenantId: tenant.id,
    appointmentId: appt.id,
    to: body.phone,
    template: 'appointment_confirmed',
    locale: body.locale,
    vars: {
      name: body.name.split(' ')[0],
      shop: tenant.name,
      barber: '',
      date: start.toLocaleDateString(body.locale === 'es' ? 'es-US' : 'en-US'),
      time: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deposit: (body.depositCents / 100).toFixed(0),
      url: `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/${body.locale}`,
    },
  }).catch(() => {});

  return NextResponse.json({ ok: true, appointmentId: appt.id, clientSecret });
}
