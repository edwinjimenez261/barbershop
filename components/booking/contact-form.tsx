'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input, Textarea, FieldLabel } from '@/components/ui/input';
import { useBookingStore } from '@/lib/booking-store';

export function ContactForm({ locale }: { locale: 'es' | 'en' }) {
  const router = useRouter();
  const t = useTranslations('booking.datos');
  const { barberId, serviceId, time, name, phone, notes, consent, setBooking } = useBookingStore();

  useEffect(() => {
    if (!barberId) router.replace(`/${locale}/reservar/barbero`);
    else if (!serviceId) router.replace(`/${locale}/reservar/servicio`);
    else if (!time) router.replace(`/${locale}/reservar/horario`);
  }, [barberId, serviceId, time, locale, router]);

  const valid = name.trim().length > 1 && phone.trim().length >= 10;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    router.push(`/${locale}/reservar/pago`);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <FieldLabel>{t('name')}</FieldLabel>
        <Input
          value={name}
          onChange={(e) => setBooking({ name: e.target.value })}
          placeholder="Roberto Núñez"
          autoComplete="name"
        />
      </div>
      <div>
        <FieldLabel>{t('phone')}</FieldLabel>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setBooking({ phone: e.target.value })}
          placeholder="(973) 555-0142"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <div>
        <FieldLabel>{t('notes')}</FieldLabel>
        <Textarea
          value={notes}
          onChange={(e) => setBooking({ notes: e.target.value })}
          placeholder={t('notesPh')}
          rows={3}
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-ink-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setBooking({ consent: e.target.checked })}
          className="mt-0.5"
        />
        <span>
          {t('consent')}
        </span>
      </label>
      <Button type="submit" size="lg" className="w-full" disabled={!valid}>
        {t('submit')} →
      </Button>
    </form>
  );
}
