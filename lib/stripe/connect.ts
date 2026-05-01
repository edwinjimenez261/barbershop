import { getStripeClient } from './client';

/**
 * Create a Stripe Connect Express account for a barber.
 * Express accounts let contractors onboard via a Stripe-hosted flow (5 min)
 * and accept SSN or ITIN (important for hispanic barbers without SSN).
 */
export async function createBarberConnectAccount(args: {
  email: string;
  fullName: string;
  country?: string;
}) {
  const stripe = getStripeClient();
  const account = await stripe.accounts.create({
    type: 'express',
    country: args.country ?? 'US',
    email: args.email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: 'individual',
    business_profile: {
      product_description: 'Servicios de barbería',
      mcc: '7230', // Beauty/Barber Shops
    },
    settings: {
      payouts: { schedule: { interval: 'daily' } },
    },
    metadata: {
      product: 'getbarber.app',
      full_name: args.fullName,
    },
  });
  return account;
}

/**
 * Create the onboarding link the barber clicks to verify their identity
 * and bank account. After completion they're redirected back to `returnUrl`.
 */
export async function createOnboardingLink(args: {
  accountId: string;
  refreshUrl: string;
  returnUrl: string;
}) {
  const stripe = getStripeClient();
  return stripe.accountLinks.create({
    account: args.accountId,
    refresh_url: args.refreshUrl,
    return_url: args.returnUrl,
    type: 'account_onboarding',
  });
}

/**
 * Create a PaymentIntent for a deposit payment that goes directly to the barber.
 * Application fee is 0 (we monetize via SaaS subscription, not transaction fees).
 *
 * Returns the client_secret for Stripe Elements.
 */
export async function createDepositPaymentIntent(args: {
  barberConnectAccountId: string;
  depositCents: number;
  customerName: string;
  appointmentId: string;
  locale: 'es' | 'en';
}) {
  const stripe = getStripeClient();
  const intent = await stripe.paymentIntents.create({
    amount: args.depositCents,
    currency: 'usd',
    capture_method: 'automatic',
    application_fee_amount: 0,
    transfer_data: { destination: args.barberConnectAccountId },
    automatic_payment_methods: { enabled: true },
    metadata: {
      appointment_id: args.appointmentId,
      customer_name: args.customerName,
      locale: args.locale,
      product: 'getbarber.app',
    },
  });
  return intent;
}

/**
 * Retrieve a Connect account's current charges_enabled status.
 * Useful for the barber portal to show the onboarding state.
 */
export async function getAccountStatus(accountId: string) {
  const stripe = getStripeClient();
  const acct = await stripe.accounts.retrieve(accountId);
  return {
    chargesEnabled: acct.charges_enabled,
    payoutsEnabled: acct.payouts_enabled,
    detailsSubmitted: acct.details_submitted,
    requirementsCurrentlyDue: acct.requirements?.currently_due ?? [],
  };
}
