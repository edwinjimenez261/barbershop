import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe/client';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: 'no_signature' }, { status: 400 });

  const stripe = getStripeClient();
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    return NextResponse.json({ error: 'bad_signature' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const apptId = pi.metadata.appointment_id;
      if (apptId) {
        await supabase
          .from('appointments')
          .update({ deposit_status: 'paid', status: 'confirmed' })
          .eq('id', apptId);
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const apptId = pi.metadata.appointment_id;
      if (apptId) {
        await supabase.from('appointments').update({ deposit_status: 'failed' }).eq('id', apptId);
      }
      break;
    }
    case 'account.updated': {
      const acct = event.data.object as Stripe.Account;
      await supabase
        .from('barbers')
        .update({
          stripe_charges_enabled: acct.charges_enabled,
          stripe_account_status: acct.charges_enabled ? 'active' : acct.requirements?.disabled_reason ? 'restricted' : 'pending',
        })
        .eq('stripe_account_id', acct.id);
      break;
    }
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const tenantId = session.metadata?.tenant_id;
      if (tenantId && session.subscription && session.customer) {
        await supabase
          .from('tenants')
          .update({
            stripe_customer_id: session.customer.toString(),
            stripe_subscription_id: session.subscription.toString(),
          })
          .eq('id', tenantId);
      }
      break;
    }
    case 'invoice.paid': {
      const inv = event.data.object as Stripe.Invoice;
      if (inv.metadata?.kind === 'booth_rental' && inv.metadata.barber_id) {
        await supabase.from('booth_rent_charges').insert({
          barber_id: inv.metadata.barber_id,
          period_start: new Date(inv.period_start * 1000).toISOString().split('T')[0],
          period_end: new Date(inv.period_end * 1000).toISOString().split('T')[0],
          amount_cents: inv.amount_paid,
          status: 'paid',
          stripe_invoice_id: inv.id,
          paid_at: new Date().toISOString(),
        });
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
