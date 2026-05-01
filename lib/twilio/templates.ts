// Registry of message templates. The 14 templates needed for the v2 plan
// (7 ES + 7 EN). For WhatsApp, each `contentSid` is the SID returned by Meta
// after template approval — Edwin pastes them into env vars after submission.
//
// For SMS, plain template strings work without approval.

export type TemplateKey =
  | 'appointment_confirmed'
  | 'appointment_reminder_24h'
  | 'appointment_reminder_2h'
  | 'review_request'
  | 're_engagement_30d'
  | 'cancellation_confirmed'
  | 'barber_new_booking';

export interface TemplateConfig {
  /** Twilio Content API SID (from Meta-approved WhatsApp template) */
  contentSidEs?: string;
  contentSidEn?: string;
  /** Plain SMS body with {{var}} substitution */
  smsEs: string;
  smsEn: string;
}

const env = (k: string) => process.env[k] ?? '';

export const TEMPLATES: Record<TemplateKey, TemplateConfig> = {
  appointment_confirmed: {
    contentSidEs: env('TWILIO_TEMPLATE_CONFIRMED_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_CONFIRMED_EN'),
    smsEs: 'Hola {{name}}, tu cita en {{shop}} con {{barber}} el {{date}} a las {{time}} está confirmada. Depósito de ${{deposit}} pagado. Cancela o reprograma: {{url}}',
    smsEn: 'Hi {{name}}, your booking at {{shop}} with {{barber}} on {{date}} at {{time}} is confirmed. ${{deposit}} deposit paid. Cancel or reschedule: {{url}}',
  },
  appointment_reminder_24h: {
    contentSidEs: env('TWILIO_TEMPLATE_REMINDER_24H_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_REMINDER_24H_EN'),
    smsEs: 'Recordatorio: mañana {{date}} a las {{time}} tienes tu cita en {{shop}} con {{barber}}. {{address}}',
    smsEn: 'Reminder: tomorrow {{date}} at {{time}} you have your booking at {{shop}} with {{barber}}. {{address}}',
  },
  appointment_reminder_2h: {
    contentSidEs: env('TWILIO_TEMPLATE_REMINDER_2H_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_REMINDER_2H_EN'),
    smsEs: 'En 2 horas tu cita en {{shop}} con {{barber}}. {{address}}. Te esperamos.',
    smsEn: 'In 2 hours your booking at {{shop}} with {{barber}}. {{address}}. See you soon.',
  },
  review_request: {
    contentSidEs: env('TWILIO_TEMPLATE_REVIEW_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_REVIEW_EN'),
    smsEs: '{{name}}, gracias por venir. ¿Cómo te trató {{barber}}? Califica acá: {{url}}',
    smsEn: '{{name}}, thanks for coming in. How was {{barber}}? Leave a review: {{url}}',
  },
  re_engagement_30d: {
    contentSidEs: env('TWILIO_TEMPLATE_REENGAGE_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_REENGAGE_EN'),
    smsEs: '{{name}}, hace un mes que no vienes. ¿Reservamos tu próximo corte con {{barber}}? {{url}}',
    smsEn: 'Hi {{name}}, it\'s been a month. Want to book your next cut with {{barber}}? {{url}}',
  },
  cancellation_confirmed: {
    contentSidEs: env('TWILIO_TEMPLATE_CANCEL_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_CANCEL_EN'),
    smsEs: 'Tu cita del {{date}} a las {{time}} fue cancelada. Reservar de nuevo: {{url}}',
    smsEn: 'Your booking on {{date}} at {{time}} has been cancelled. Book again: {{url}}',
  },
  barber_new_booking: {
    contentSidEs: env('TWILIO_TEMPLATE_BARBER_NEW_ES'),
    contentSidEn: env('TWILIO_TEMPLATE_BARBER_NEW_EN'),
    smsEs: 'Nueva reserva: {{client}} para {{service}} el {{date}} a las {{time}}.',
    smsEn: 'New booking: {{client}} for {{service}} on {{date}} at {{time}}.',
  },
};

export function renderTemplate(
  body: string,
  vars: Record<string, string | number>,
): string {
  return body.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? ''));
}
