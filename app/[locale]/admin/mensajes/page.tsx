import { getTranslations, getLocale } from 'next-intl/server';
import { MessageCircle, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TEMPLATES, type TemplateKey } from '@/lib/twilio/templates';

const LABELS: Record<TemplateKey, { es: string; en: string; trigger: string }> = {
  appointment_confirmed:    { es: 'Cita confirmada',         en: 'Booking confirmed',  trigger: 'Al reservar' },
  appointment_reminder_24h: { es: 'Recordatorio 24h',        en: 'Reminder 24h',       trigger: '24h antes' },
  appointment_reminder_2h:  { es: 'Recordatorio 2h',         en: 'Reminder 2h',        trigger: '2h antes' },
  review_request:           { es: 'Pedir reseña',            en: 'Review request',     trigger: '2h después' },
  re_engagement_30d:        { es: 'Re-engagement 30d',       en: 'Re-engagement 30d',  trigger: '30d sin volver' },
  cancellation_confirmed:   { es: 'Cancelación',             en: 'Cancellation',       trigger: 'Al cancelar' },
  barber_new_booking:       { es: 'Nueva reserva (barbero)', en: 'New booking',        trigger: 'Al reservar' },
};

export default async function AdminMensajes() {
  const t = await getTranslations('ownerPortal.messages');
  const locale = (await getLocale()) as 'es' | 'en';

  const items = (Object.keys(TEMPLATES) as TemplateKey[]).map((k) => {
    const cfg = TEMPLATES[k];
    const label = LABELS[k];
    return { key: k, cfg, label };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">{t('title')}</h1>
        <p className="text-sm text-ink-muted mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid gap-3">
        {items.map(({ key, cfg, label }) => (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-gold/15 text-gold flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold">{label[locale]}</div>
                    <div className="text-[11px] text-ink-muted">Disparador: {label.trigger}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={cfg.contentSidEs ? 'success' : 'muted'}>
                    ES {cfg.contentSidEs ? t('approved') : t('pending')}
                  </Badge>
                  <Badge variant={cfg.contentSidEn ? 'success' : 'muted'}>
                    EN {cfg.contentSidEn ? t('approved') : t('pending')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                <Preview locale="es" body={cfg.smsEs} />
                <Preview locale="en" body={cfg.smsEn} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Preview({ locale, body }: { locale: 'es' | 'en'; body: string }) {
  return (
    <div className="rounded-md bg-bg p-3 border border-gold/10">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
        <Smartphone className="w-3 h-3" />
        SMS · {locale.toUpperCase()}
      </div>
      <p className="text-xs leading-relaxed text-ink">{body}</p>
    </div>
  );
}
