import { getTranslations, getLocale } from 'next-intl/server';
import { BookingHeader } from '@/components/booking/booking-header';
import { ContactForm } from '@/components/booking/contact-form';

export default async function DatosPage() {
  const locale = (await getLocale()) as 'es' | 'en';
  const t = await getTranslations('booking');

  return (
    <main>
      <BookingHeader
        step={4}
        totalSteps={4}
        title={t('datos.title')}
        backHref={`/${locale}/reservar/horario`}
      />
      <div className="container-tight max-w-xl py-6">
        <ContactForm locale={locale} />
      </div>
    </main>
  );
}
