'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Barber, Service, BarberService } from '@/lib/types/database';
import { BarberAvatar } from '@/components/ui/avatar';
import { useBookingStore } from '@/lib/booking-store';
import { formatCents, cn } from '@/lib/utils';

export function ServicePicker({
  barbers,
  services,
  barberServices,
  locale,
}: {
  barbers: Barber[];
  services: Service[];
  barberServices: BarberService[];
  locale: 'es' | 'en';
}) {
  const router = useRouter();
  const { barberId, serviceId, setBooking } = useBookingStore();

  const barber = useMemo(() => barbers.find((b) => b.id === barberId), [barbers, barberId]);
  const offered = useMemo(() => {
    if (!barberId) return [];
    const ids = new Set(barberServices.filter((bs) => bs.barber_id === barberId && bs.is_offered).map((bs) => bs.service_id));
    return services.filter((s) => ids.has(s.id));
  }, [services, barberServices, barberId]);

  useEffect(() => {
    if (!barberId) router.replace(`/${locale}/reservar/barbero`);
  }, [barberId, locale, router]);

  if (!barber) return null;

  const priceFor = (sid: string) =>
    barberServices.find((bs) => bs.barber_id === barberId && bs.service_id === sid)?.price_cents ?? 0;

  const select = (s: Service) => {
    const price = priceFor(s.id);
    setBooking({ serviceId: s.id, priceCents: price, durationMin: s.duration_min });
    setTimeout(() => router.push(`/${locale}/reservar/horario`), 200);
  };

  return (
    <div>
      {/* Barber pill */}
      <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full bg-surface border border-gold/15 text-sm mb-6">
        <BarberAvatar fullName={barber.full_name} colorHex={barber.color_hex} size={28} />
        <span className="font-semibold">{barber.full_name}</span>
        <span className="text-xs text-ink-muted">· {barber.role_label?.split('·')[0].trim()}</span>
      </div>

      <div className="flex flex-col gap-3">
        {offered.map((s) => {
          const sel = serviceId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => select(s)}
              className={cn(
                'flex justify-between items-center p-4 rounded-lg border-2 w-full text-left transition-colors',
                sel
                  ? 'bg-surface-light border-gold'
                  : 'bg-surface border-gold/15 hover:border-gold/30',
              )}
            >
              <div className="flex-1">
                <div className="font-display text-lg font-bold mb-0.5">
                  {locale === 'es' ? s.name_es : s.name_en}
                </div>
                <div className="text-[11px] text-ink-muted">
                  {s.duration_min} min · {locale === 'es' ? s.description_es : s.description_en}
                </div>
              </div>
              <div className="font-display text-2xl font-bold text-gold ml-3">
                {formatCents(priceFor(s.id), locale)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
