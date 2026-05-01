import { sendSms } from './twilio/sms';
import { sendWhatsApp } from './twilio/whatsapp';
import { createSupabaseAdminClient } from './supabase/admin';
import type { TemplateKey } from './twilio/templates';
import type { Locale } from './types/database';

/**
 * Unified notification entry-point. Sends WhatsApp first (if enabled for tenant),
 * falls back to SMS on failure or if WhatsApp is disabled.
 */
export async function notify(args: {
  tenantId: string;
  appointmentId?: string;
  to: string;
  template: TemplateKey;
  locale: Locale;
  vars: Record<string, string | number>;
  preferWhatsApp?: boolean;
}) {
  const supabase = createSupabaseAdminClient();
  const usingMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  let result: { sid: string; status: string } | null = null;
  let channel: 'sms' | 'whatsapp' = 'sms';
  let errorMsg: string | null = null;

  if (usingMock) {
    // Don't actually send in mock mode
    return { ok: true, channel: 'sms' as const, sid: 'mock' };
  }

  if (args.preferWhatsApp ?? true) {
    try {
      result = await sendWhatsApp({ to: args.to, template: args.template, locale: args.locale, vars: args.vars });
      channel = 'whatsapp';
    } catch (e) {
      errorMsg = (e as Error).message;
    }
  }

  if (!result) {
    try {
      result = await sendSms({ to: args.to, template: args.template, locale: args.locale, vars: args.vars });
      channel = 'sms';
      errorMsg = null;
    } catch (e) {
      errorMsg = (e as Error).message;
    }
  }

  // Log to messages_log
  await supabase.from('messages_log').insert({
    tenant_id: args.tenantId,
    appointment_id: args.appointmentId,
    channel,
    template: args.template,
    locale: args.locale,
    to_number: args.to,
    status: result ? 'sent' : 'failed',
    twilio_sid: result?.sid,
    error_message: errorMsg,
    payload: args.vars as never,
  });

  return result ? { ok: true as const, channel, sid: result.sid } : { ok: false as const, error: errorMsg };
}
