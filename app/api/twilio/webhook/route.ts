import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/**
 * Inbound webhook: Twilio sends here when a client replies to SMS/WhatsApp
 * (e.g. "ENGLISH" / "ESPAÑOL" to switch locale, or STOP to opt out).
 */
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const from = form.get('From')?.toString() ?? '';
  const body = (form.get('Body')?.toString() ?? '').trim().toLowerCase();

  const supa = createSupabaseAdminClient();
  const phone = from.replace(/^whatsapp:/, '');

  if (body === 'english' || body === 'en') {
    await supa.from('clients').update({ preferred_locale: 'en' }).eq('phone', phone);
    return new NextResponse('<Response><Message>Switched to English.</Message></Response>', {
      headers: { 'content-type': 'text/xml' },
    });
  }
  if (body === 'español' || body === 'espanol' || body === 'es') {
    await supa.from('clients').update({ preferred_locale: 'es' }).eq('phone', phone);
    return new NextResponse('<Response><Message>Listo, ahora en español.</Message></Response>', {
      headers: { 'content-type': 'text/xml' },
    });
  }
  if (body === 'stop' || body === 'baja') {
    // Opt-out handling: Twilio handles STOP at the carrier level for SMS
    return new NextResponse('<Response/>', { headers: { 'content-type': 'text/xml' } });
  }

  return new NextResponse('<Response/>', { headers: { 'content-type': 'text/xml' } });
}
