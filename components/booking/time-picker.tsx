'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Barber, Service, BarberService } from '@/lib/types/database';
import { BarberAvatar } from '@/components/ui/avatar';
import { useBookingStore } from '@/lib/booking-store';
import { formatCents, cn } from '@/lib/utils';

const SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

// Mock unavailable slots — in prod this comes from server based on barber's calendar
const UNAVAILABLE = ['11:00', '14:00', '17:00'];

const DAY_NAMES_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function TimePicker({
  barbers,
  services,
  barberServices,
  locale,
  timezoneHint,
}: {
  barbers: Barber[];
  services: Service[];
  barberServices: BarberService[];
  locale: 'es' | 'en';
  timezoneHint: string;
}) {
  const router = useRouter();
  const { barberId, serviceId, priceCents, date, time, setBooking } = useBookingStore();
  const [selectedDay, setSelectedDay] = useState(0);

  const barber = useMemo(() => barbers.find((b) => b.id === barberId), [barbers, barberId]);
  const service = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);

  useEffect(() => {
    if (!barberId) router.replace(`/${locale}/reservar/barbero`);
    else if (!serviceId) router.replace(`/${locale}/reservar/servicio`);
  }, [barberId, serviceId, locale, router]);

  if (!barber || !service) return null;

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const dayNames = locale === 'es' ? DAY_NAMES_ES : DAY_NAMES_EN;

  const pickDay = (i: number) => {
    setSelectedDay(i);
    const d = days[i];
    const iso = d.toISOString().split('T')[0];
    const label = `${dayNames[d.getDay()]} ${d.getDate()}`;
    setBooking({ date: iso, dateLabel: label });
  };

  const pickTime = (t: string) => {
    setBooking({ time: t });
    setTimeout(() => router.push(`/${locale}/reservar/datos`), 200);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3 rounded-md bg-surface border border-gold/15 mb-5">
        <div className="flex gap-2.5 items-center min-w-0">
          <BarberAvatar fullName={barber.full_name} colorHex={barber.color_hex} size={32} />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">
              {barber.full_name.split(' ')[0]} · {locale === 'es' ? service.name_es : service.name_en}
            </div>
            <div className="text-[11px] text-ink-muted">
              {service.duration_min} min · {formatCents(priceCents, locale)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto -mx-1 px-1 [&::-webkit-scrollbar]:hidden">
        {days.map((d, i) => {
          const sel = selectedDay === i;
          return (
            <button
              key={i}
              onClick={() => pickDay(i)}
              className={cn(
                'flex-shrink-0 px-3 py-2.5 min-w-[60px] rounded-md border transition-colors',
                sel
                  ? 'bg-gold border-gold text-[#0a0a0a]'
                  : 'bg-surface border-gold/15 hover:border-gold/30',
              )}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-70">{dayNames[d.getDay()]}</div>
              <div className="text-lg font-bold">{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {SLOTS.map((s) => {
          const unavail = UNAVAILABLE.includes(s);
          const sel = time === s;
          return (
            <button
              key={s}
              disabled={unavail}
              onClick={() => pickTime(s)}
              className={cn(
                'py-3 rounded-md border font-mono text-sm font-semibold transition-colors',
                sel && 'bg-gold border-gold text-[#0a0a0a]',
                !sel && !unavail && 'bg-surface border-gold/15 hover:border-gold/30',
                unavail && 'border-gold/10 text-ink-dim line-through cursor-not-allowed opacity-50',
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-ink-muted text-center mt-6">{timezoneHint}</p>
    </div>
  );
}
