import { getTranslations, getLocale } from 'next-intl/server';
import { Zap } from 'lucide-react';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCents } from '@/lib/utils';

export default async function AdminRentas() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const t = await getTranslations('ownerPortal.rentas');
  const locale = (await getLocale()) as 'es' | 'en';
  const { barbers } = await getTenantCatalog(tenant.id);

  const totalActive = barbers
    .filter((b) => b.booth_rent_active)
    .reduce((s, b) => s + b.booth_rent_amount_cents, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-2">
            <Zap className="w-7 h-7 text-gold" />
            {t('title')}
          </h1>
          <p className="text-sm text-ink-muted mt-1">{t('subtitle')}</p>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
            {locale === 'es' ? 'Total semanal activo' : 'Active weekly'}
          </div>
          <div className="font-display text-3xl font-bold text-gold">
            {formatCents(totalActive, locale)}
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {barbers.map((b) => (
          <Card key={b.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: b.color_hex }}
                  >
                    {b.full_name
                      .split(' ')
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{b.full_name}</div>
                    <div className="text-xs text-ink-muted">{b.role_label}</div>
                  </div>
                </div>
                <Badge variant={b.booth_rent_active ? 'success' : 'muted'}>
                  {b.booth_rent_active ? t('active') : t('paused')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                    {locale === 'es' ? 'Monto' : 'Amount'}
                  </div>
                  <div className="font-display text-2xl font-bold text-gold mt-1">
                    {formatCents(b.booth_rent_amount_cents, locale)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                    {locale === 'es' ? 'Frecuencia' : 'Frequency'}
                  </div>
                  <div className="text-sm font-semibold mt-1.5">
                    {b.booth_rent_period === 'weekly' ? t('weekly') : t('monthly')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                    {locale === 'es' ? 'Próx. cobro' : 'Next charge'}
                  </div>
                  <div className="text-sm font-semibold mt-1.5">Lun 4 May</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gold/10 flex justify-end">
                <Button variant="secondary" size="sm">
                  {t('configure')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
