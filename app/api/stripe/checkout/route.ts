import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSaasCheckoutSession, type PlanKey } from '@/lib/stripe/subscriptions';

const Body = z.object({
  plan: z.enum(['solo', 'studio', 'pro', 'business']),
  ownerEmail: z.string().email(),
  tenantId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getbarber.app';
  const session = await createSaasCheckoutSession({
    plan: body.plan as PlanKey,
    ownerEmail: body.ownerEmail,
    tenantId: body.tenantId,
    successUrl: `${baseUrl}/admin?subscribed=1`,
    cancelUrl: `${baseUrl}/admin?subscribed=0`,
  });

  return NextResponse.json({ url: session.url });
}
