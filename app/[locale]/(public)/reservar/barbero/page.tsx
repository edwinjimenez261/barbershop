import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { BookingHeader } from '@/components/booking/booking-header';
import { BarberPicker } from '@/components/booking/barber-picker';

export default async function PickBarberPage() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const locale = (await getLocale()) as 'es' | 'en';
  const t = await getTranslations('booking');
  const { barbers } = await getTenantCatalog(tenant.id);

  return (
    <main>
      <BookingHeader step={1} totalSteps={4} title={t('barbero.title')} backHref={`/${locale}`} />
      <div className="container-tight max-w-xl py-6">
        <BarberPicker barbers={barbers} locale={locale} />
      </div>
    </main>
  );
}
