import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { BookingHeader } from '@/components/booking/booking-header';
import { TimePicker } from '@/components/booking/time-picker';

export default async function PickTimePage() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const locale = (await getLocale()) as 'es' | 'en';
  const t = await getTranslations('booking');
  const { barbers, services, barberServices } = await getTenantCatalog(tenant.id);

  return (
    <main>
      <BookingHeader
        step={3}
        totalSteps={4}
        title={t('horario.title')}
        backHref={`/${locale}/reservar/servicio`}
      />
      <div className="container-tight max-w-xl py-6">
        <TimePicker
          barbers={barbers}
          services={services}
          barberServices={barberServices}
          locale={locale}
          timezoneHint={t('horario.timezoneHint')}
        />
      </div>
    </main>
  );
}
