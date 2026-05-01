import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { BookingHeader } from '@/components/booking/booking-header';
import { PaymentForm } from '@/components/booking/payment-form';

export default async function PagoPage() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const locale = (await getLocale()) as 'es' | 'en';
  const t = await getTranslations('booking');
  const { barbers, services } = await getTenantCatalog(tenant.id);

  return (
    <main>
      <BookingHeader
        step={4}
        totalSteps={4}
        title={t('pago.title')}
        backHref={`/${locale}/reservar/datos`}
      />
      <div className="container-tight max-w-xl py-6">
        <PaymentForm
          barbers={barbers}
          services={services}
          locale={locale}
          depositPercent={tenant.settings.depositPercent}
        />
      </div>
    </main>
  );
}
