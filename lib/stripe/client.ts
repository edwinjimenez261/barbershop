import Stripe from 'stripe';

/**
 * Server-only Stripe client. Uses the platform secret key.
 * For Stripe Connect on-behalf-of operations, pass `{ stripeAccount: barberConnectId }`
 * as the second arg to API methods.
 */
export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, {
    apiVersion: '2025-02-24.acacia',
    typescript: true,
    appInfo: { name: 'getbarber.app', version: '0.1.0' },
  });
}
