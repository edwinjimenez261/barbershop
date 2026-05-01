'use client';

import { useRouter } from 'next/navigation';
import type { Barber } from '@/lib/types/database';
import { BarberAvatar } from '@/components/ui/avatar';
import { Stars } from '@/components/ui/stars';
import { useBookingStore } from '@/lib/booking-store';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function BarberPicker({ barbers, locale }: { barbers: Barber[]; locale: 'es' | 'en' }) {
  const router = useRouter();
  const t = useTranslations('booking.barbero');
  const { barberId, setBooking } = useBookingStore();

  const select = (b: Barber) => {
    setBooking({ barberId: b.id });
    setTimeout(() => router.push(`/${locale}/reservar/servicio`), 200);
  };

  return (
    <div className="flex flex-col gap-3">
      {barbers.map((b) => {
        const sel = barberId === b.id;
        return (
          <button
            key={b.id}
            onClick={() => select(b)}
            className={cn(
              'flex gap-4 items-center p-4 rounded-lg border-2 text-left w-full transition-colors',
              sel
                ? 'bg-surface-light border-gold'
                : 'bg-surface border-gold/15 hover:border-gold/30',
            )}
          >
            <BarberAvatar fullName={b.full_name} colorHex={b.color_hex} size={64} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-base">{b.full_name}</div>
              {b.role_label && (
                <div className="text-[11px] text-gold font-semibold uppercase tracking-wider mt-0.5">
                  {b.role_label}
                </div>
              )}
              <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">{b.bio}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Stars rating={b.rating} size={11} />
                <span className="text-[11px] text-ink-muted">
                  {t('rating', { rating: b.rating.toFixed(2), count: b.reviews_count })}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
