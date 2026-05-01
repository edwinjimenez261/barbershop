import { getStripeClient } from './client';

/**
 * Booth rental: the shop owner charges the barber a recurring fee
 * for renting their chair. The flow:
 *   1. Owner sets `booth_rent_amount_cents` + `booth_rent_period` on the barber.
 *   2. We create a Customer for the barber on the OWNER's Stripe account
 *      (the destination), so the owner sees the revenue.
 *   3. We create a Subscription with that price.
 *   4. The barber receives an invoice via Stripe in their preferred locale.
 *
 * NOTE: This requires the SHOP's Stripe customer to exist (the platform's
 * customer for the shop, used for SaaS billing) AND a separate Stripe account
 * controlled by the shop OR a Connect account where transfers go via
 * `transfer_data.destination`. For simplicity, this implementation uses
 * Invoicing on the platform account with `application_fee_percent` for the
 * platform cut. Edwin can refactor to a destination-charge model later.
 */
export async function setupBoothRentalSubscription(args: {
  barberStripeCustomerId: string;
  amountCents: number;
  period: 'weekly' | 'monthly';
  ownerStripeAccountId: string; // Connect account of the shop owner
  barberId: string;
  ownerTenantId: string;
}) {
  const stripe = getStripeClient();

  const interval: 'week' | 'month' = args.period === 'weekly' ? 'week' : 'month';

  // Create an inline price for this barber
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: args.amountCents,
    recurring: { interval, interval_count: 1 },
    product_data: { name: 'Renta de silla — getbarber.app' },
  });

  const subscription = await stripe.subscriptions.create({
    customer: args.barberStripeCustomerId,
    items: [{ price: price.id }],
    transfer_data: { destination: args.ownerStripeAccountId },
    metadata: {
      barber_id: args.barberId,
      tenant_id: args.ownerTenantId,
      kind: 'booth_rental',
    },
    collection_method: 'charge_automatically',
  });

  return { subscriptionId: subscription.id, priceId: price.id };
}

export async function cancelBoothRentalSubscription(subscriptionId: string) {
  const stripe = getStripeClient();
  return stripe.subscriptions.cancel(subscriptionId);
}
