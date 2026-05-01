import { getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { BookingConfirmed } from '@/components/booking/booking-confirmed';

export default async function ConfirmadaPage() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const locale = (await getLocale()) as 'es' | 'en';
  const { barbers, services } = await getTenantCatalog(tenant.id);

  return (
    <main className="bg-bg min-h-screen">
      <BookingConfirmed
        barbers={barbers}
        services={services}
        locale={locale}
        depositPercent={tenant.settings.depositPercent}
        address={tenant.settings.address ?? ''}
      />
    </main>
  );
}
