import { getTwilioClient } from './client';
import { TEMPLATES, type TemplateKey, renderTemplate } from './templates';
import type { Locale } from '@/lib/types/database';

export async function sendSms(args: {
  to: string;
  template: TemplateKey;
  locale: Locale;
  vars: Record<string, string | number>;
}) {
  const tpl = TEMPLATES[args.template];
  const body = renderTemplate(args.locale === 'es' ? tpl.smsEs : tpl.smsEn, args.vars);

  const client = getTwilioClient();
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const msg = await client.messages.create({
    to: args.to,
    body,
    ...(messagingServiceSid
      ? { messagingServiceSid }
      : { from: process.env.TWILIO_SMS_FROM ?? '' }),
  });

  return { sid: msg.sid, status: msg.status };
}
