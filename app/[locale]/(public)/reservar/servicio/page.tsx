import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { BookingHeader } from '@/components/booking/booking-header';
import { ServicePicker } from '@/components/booking/service-picker';

export default async function PickServicePage() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const locale = (await getLocale()) as 'es' | 'en';
  const t = await getTranslations('booking');
  const { barbers, services, barberServices } = await getTenantCatalog(tenant.id);

  return (
    <main>
      <BookingHeader
        step={2}
        totalSteps={4}
        title={t('servicio.title')}
        backHref={`/${locale}/reservar/barbero`}
      />
      <div className="container-tight max-w-xl py-6">
        <ServicePicker
          barbers={barbers}
          services={services}
          barberServices={barberServices}
          locale={locale}
        />
      </div>
    </main>
  );
}
