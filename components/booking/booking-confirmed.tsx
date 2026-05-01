'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Check, MapPin, Calendar, MessageSquare } from 'lucide-react';
import type { Barber, Service } from '@/lib/types/database';
import { Button } from '@/components/ui/button';
import { BarberAvatar } from '@/components/ui/avatar';
import { useBookingStore } from '@/lib/booking-store';
import { formatCents, depositCents } from '@/lib/utils';

export function BookingConfirmed({
  barbers,
  services,
  locale,
  depositPercent,
  address,
}: {
  barbers: Barber[];
  services: Service[];
  locale: 'es' | 'en';
  depositPercent: number;
  address: string;
}) {
  const router = useRouter();
  const t = useTranslations('booking.confirmada');
  const { barberId, serviceId, priceCents, dateLabel, time, name, resetBooking } = useBookingStore();

  const barber = useMemo(() => barbers.find((b) => b.id === barberId), [barbers, barberId]);
  const service = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);

  useEffect(() => {
    if (!barberId || !serviceId || !time) router.replace(`/${locale}`);
  }, [barberId, serviceId, time, locale, router]);

  if (!barber || !service) return null;

  const deposit = depositCents(priceCents, depositPercent);

  return (
    <div className="container-tight max-w-xl py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-gold to-gold-hover flex items-center justify-center shadow-gold">
          <Check className="w-10 h-10 text-[#0a0a0a]" strokeWidth={3} />
        </div>
        <div className="kicker mb-1">{t('kicker')}</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
          {t('headline', { name: name.split(' ')[0] })}
        </h1>
        <div className="text-sm text-ink-muted mt-2">{t('subhead')}</div>
      </div>

      <div className="rounded-lg border border-gold/30 bg-gradient-to-br from-surface to-surface-light p-5 mb-4">
        <div className="flex items-center gap-3 pb-4 border-b border-gold/10">
          <BarberAvatar fullName={barber.full_name} colorHex={barber.color_hex} size={52} />
          <div>
            <div className="font-bold">{barber.full_name}</div>
            <div className="text-xs text-ink-muted">
              {locale === 'es' ? service.name_es : service.name_en}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Cell l={t('fields.date')} r={dateLabel} />
          <Cell l={t('fields.time')} r={time ?? ''} />
          <Cell l={t('fields.duration')} r={`${service.duration_min} min`} />
          <Cell
            l={t('fields.deposit')}
            r={t('depositPaid', { amount: deposit / 100 })}
            primary
          />
        </div>
        <div className="mt-4 px-3 py-2.5 rounded-md bg-bg text-xs text-ink-muted">
          <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-gold" />
          <strong className="text-ink">{address.split(',')[0]}</strong>
          {address.includes(',') ? `, ${address.split(',').slice(1).join(',').trim()}` : ''}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button variant="secondary" size="md">
          <Calendar className="w-4 h-4" />
          {t('addToCalendar')}
        </Button>
        <Button variant="secondary" size="md">
          <MapPin className="w-4 h-4" />
          {t('directions')}
        </Button>
      </div>

      <div className="rounded-md border border-dashed border-gold/30 bg-surface p-4 flex gap-3 items-start">
        <MessageSquare className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <div className="text-xs text-ink-muted leading-relaxed">{t('notice')}</div>
      </div>

      <Link
        href={`/${locale}`}
        onClick={() => resetBooking()}
        className="block mt-6"
      >
        <Button variant="outline" size="lg" className="w-full">
          {t('backHome')}
        </Button>
      </Link>
    </div>
  );
}

function Cell({ l, r, primary }: { l: string; r: string; primary?: boolean }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-ink-muted font-semibold">{l}</div>
      <div className={`text-sm font-bold mt-1 ${primary ? 'text-gold' : ''}`}>{r}</div>
    </div>
  );
}
