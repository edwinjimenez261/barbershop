import { getTwilioClient } from './client';
import { TEMPLATES, type TemplateKey, renderTemplate } from './templates';
import type { Locale } from '@/lib/types/database';

/**
 * Send a WhatsApp message via Twilio Content API. Requires:
 *  - The template approved by Meta (returns a `contentSid`).
 *  - `TWILIO_WHATSAPP_FROM` env var (e.g. `whatsapp:+14155238886`).
 *
 * Falls back to SMS if WhatsApp is unavailable for the recipient (per v2 plan).
 */
export async function sendWhatsApp(args: {
  to: string;
  template: TemplateKey;
  locale: Locale;
  vars: Record<string, string | number>;
}) {
  const tpl = TEMPLATES[args.template];
  const contentSid = args.locale === 'es' ? tpl.contentSidEs : tpl.contentSidEn;

  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!from) throw new Error('TWILIO_WHATSAPP_FROM not set');

  const client = getTwilioClient();
  const toFormatted = args.to.startsWith('whatsapp:') ? args.to : `whatsapp:${args.to}`;

  if (contentSid) {
    // Approved template path
    const msg = await client.messages.create({
      from,
      to: toFormatted,
      contentSid,
      contentVariables: JSON.stringify(args.vars),
    });
    return { sid: msg.sid, status: msg.status };
  }

  // Fallback: send as session message (only valid within 24h customer service window)
  const body = renderTemplate(args.locale === 'es' ? tpl.smsEs : tpl.smsEn, args.vars);
  const msg = await client.messages.create({ from, to: toFormatted, body });
  return { sid: msg.sid, status: msg.status };
}
