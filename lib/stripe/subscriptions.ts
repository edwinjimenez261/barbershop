import { getStripeClient } from './client';

/**
 * SaaS plans for getbarber.app. Price IDs come from Stripe dashboard
 * after creating the product+price in test/live mode.
 *
 * Edwin: paste these into .env.local once created.
 */
export const PLANS = {
  solo:     { priceId: process.env.STRIPE_PRICE_SOLO     ?? 'price_solo_placeholder',     amount: 3900,  name: 'Solo' },
  studio:   { priceId: process.env.STRIPE_PRICE_STUDIO   ?? 'price_studio_placeholder',   amount: 7900,  name: 'Studio' },
  pro:      { priceId: process.env.STRIPE_PRICE_PRO      ?? 'price_pro_placeholder',      amount: 14900, name: 'Pro' },
  business: { priceId: process.env.STRIPE_PRICE_BUSINESS ?? 'price_business_placeholder', amount: 24900, name: 'Business' },
} as const;

export type PlanKey = keyof typeof PLANS;

/**
 * Create a Checkout session for a shop owner to subscribe to a SaaS plan.
 */
export async function createSaasCheckoutSession(args: {
  plan: PlanKey;
  ownerEmail: string;
  tenantId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripeClient();
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: args.ownerEmail,
    line_items: [{ price: PLANS[args.plan].priceId, quantity: 1 }],
    success_url: args.successUrl,
    cancel_url: args.cancelUrl,
    metadata: { tenant_id: args.tenantId, plan: args.plan, source: 'saas_signup' },
    subscription_data: {
      metadata: { tenant_id: args.tenantId, plan: args.plan },
    },
  });
}

/**
 * Stripe Customer Portal for the shop owner to manage their SaaS subscription.
 */
export async function createCustomerPortalSession(args: {
  customerId: string;
  returnUrl: string;
}) {
  const stripe = getStripeClient();
  return stripe.billingPortal.sessions.create({
    customer: args.customerId,
    return_url: args.returnUrl,
  });
}
