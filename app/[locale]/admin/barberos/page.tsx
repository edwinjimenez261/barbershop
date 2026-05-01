import { getTranslations } from 'next-intl/server';
import { UserPlus } from 'lucide-react';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stars } from '@/components/ui/stars';

export default async function AdminBarberos() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const t = await getTranslations('ownerPortal.barbers');
  const { barbers } = await getTenantCatalog(tenant.id);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl font-bold">{t('title')}</h1>
        <Button>
          <UserPlus className="w-4 h-4" />
          {t('add')}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {barbers.map((b) => (
          <Card key={b.id}>
            <CardContent>
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold"
                  style={{ background: b.color_hex }}
                >
                  {b.full_name
                    .split(' ')
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{b.full_name}</div>
                      <div className="text-xs text-ink-muted">{b.role_label}</div>
                    </div>
                    <Badge variant={b.stripe_charges_enabled ? 'success' : 'muted'}>
                      {b.stripe_charges_enabled ? t('stripeOk') : t('stripePending')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Stars rating={b.rating} size={11} />
                    <span className="text-xs text-ink-muted">
                      {b.rating.toFixed(2)} · {b.reviews_count}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
