import { headers } from 'next/headers';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { mockAppointmentsToday, mockServices } from '@/lib/mock-data';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCents } from '@/lib/utils';

export default async function BarberToday() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const t = await getTranslations('barberPortal.today');
  const locale = (await getLocale()) as 'es' | 'en';

  const h = headers();
  const slug = h.get('x-tenant-barber-slug') ?? 'jose';
  const { barbers } = await getTenantCatalog(tenant.id);
  const barber = barbers.find((b) => b.slug === slug) ?? barbers[0];

  const appts = mockAppointmentsToday.filter((a) => a.barber_id === barber.id);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">{t('title')}</h1>
          <p className="text-sm text-ink-muted mt-1">
            {t('appointmentsCount', { n: appts.length })}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {appts.map((a) => {
          const svc = mockServices.find((s) => s.slug === a.service_slug);
          const statusVariant: 'success' | 'gold' | 'muted' =
            a.status === 'in_progress' ? 'gold' : a.status === 'completed' ? 'success' : 'muted';
          return (
            <Card key={a.id} className="hover:border-gold/30 transition-colors">
              <CardHeader className="flex items-center justify-between gap-3 !py-3">
                <div className="font-mono text-2xl font-bold text-gold">{a.start_at}</div>
                <Badge variant={statusVariant}>
                  {a.status === 'in_progress'
                    ? t('ongoing')
                    : a.status === 'completed'
                      ? t('completed')
                      : ''}
                  {a.status === 'confirmed' && (locale === 'es' ? 'Confirmada' : 'Confirmed')}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <CardTitle className="text-base">{a.client_name}</CardTitle>
                  <div className="text-xs text-ink-muted mt-0.5">
                    {svc ? (locale === 'es' ? svc.name_es : svc.name_en) : a.service_slug}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gold/10 text-xs">
                  <span className="text-ink-muted">
                    {a.deposit_cents > 0
                      ? `${formatCents(a.deposit_cents, locale)} pagado`
                      : 'Sin depósito'}
                  </span>
                  <span className="font-mono font-semibold text-gold">{formatCents(a.price_cents, locale)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
