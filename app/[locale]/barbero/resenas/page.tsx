import { headers } from 'next/headers';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { Card, CardContent } from '@/components/ui/card';
import { Stars } from '@/components/ui/stars';

export default async function BarberResenas() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const t = await getTranslations('barberPortal.reviews');
  const locale = (await getLocale()) as 'es' | 'en';

  const h = headers();
  const slug = h.get('x-tenant-barber-slug') ?? 'jose';
  const { barbers, reviews } = await getTenantCatalog(tenant.id);
  const barber = barbers.find((b) => b.slug === slug) ?? barbers[0];
  const own = reviews.filter((r) => r.barber_id === barber.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">{t('title')}</h1>
        <p className="text-sm text-ink-muted mt-1">
          {t('average', { rating: barber.rating.toFixed(2), count: barber.reviews_count })}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {own.map((r) => (
          <Card key={r.id}>
            <CardContent>
              <div className="flex justify-between items-center mb-3">
                <Stars rating={r.rating} size={12} />
                <div className="text-[10px] text-ink-dim tracking-wider uppercase">
                  {new Date(r.created_at).toLocaleDateString(locale)}
                </div>
              </div>
              <p className="text-sm italic font-display leading-relaxed">«{r.text}»</p>
              <div className="text-xs text-ink-muted mt-3 pt-3 border-t border-gold/10">
                — {r.author_name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
