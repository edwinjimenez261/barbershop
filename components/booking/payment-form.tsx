'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import type { Barber, Service } from '@/lib/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarberAvatar } from '@/components/ui/avatar';
import { useBookingStore } from '@/lib/booking-store';
import { formatCents, depositCents, cn } from '@/lib/utils';

export function PaymentForm({
  barbers,
  services,
  locale,
  depositPercent,
}: {
  barbers: Barber[];
  services: Service[];
  locale: 'es' | 'en';
  depositPercent: number;
}) {
  const router = useRouter();
  const t = useTranslations('booking.pago');
  const booking = useBookingStore();
  const { barberId, serviceId, priceCents, dateLabel, time, name, phone, notes } = booking;

  useEffect(() => {
    if (!barberId || !serviceId || !time || !name || !phone) {
      router.replace(`/${locale}/reservar/barbero`);
    }
  }, [barberId, serviceId, time, name, phone, locale, router]);

  const barber = useMemo(() => barbers.find((b) => b.id === barberId), [barbers, barberId]);
  const service = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);

  const deposit = depositCents(priceCents, depositPercent);
  const remaining = priceCents - deposit;

  const [card, setCard] = useState('4242 4242 4242 4242');
  const [exp, setExp] = useState('12/27');
  const [cvc, setCvc] = useState('123');
  const [zip, setZip] = useState('07105');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!barber || !service) return null;

  const pay = async () => {
    setProcessing(true);
    setError(null);
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          barberId,
          serviceId,
          startAt: `${booking.date}T${time}:00`,
          locale,
          name,
          phone,
          notes,
          priceCents,
          depositCents: deposit,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? 'failed');
      }
      router.push(`/${locale}/reservar/confirmada`);
    } catch (err) {
      // In MVP without Stripe wired, fail closed-ish: still proceed to confirmation in mock mode
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        await new Promise((r) => setTimeout(r, 800));
        router.push(`/${locale}/reservar/confirmada`);
      } else {
        setError((err as Error).message);
        setProcessing(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Resumen */}
      <div className="rounded-lg border border-gold/15 bg-surface p-5">
        <div className="kicker mb-3">{t('summary')}</div>
        <div className="flex items-center gap-3 mb-3">
          <BarberAvatar fullName={barber.full_name} colorHex={barber.color_hex} size={42} />
          <div>
            <div className="font-semibold text-sm">{barber.full_name}</div>
            <div className="text-xs text-ink-muted">
              {locale === 'es' ? service.name_es : service.name_en} · {service.duration_min} min
            </div>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-3 flex justify-between text-sm">
          <span className="text-ink-muted">
            {dateLabel} · {time}
          </span>
          <span className="font-semibold text-gold">{formatCents(priceCents, locale)}</span>
        </div>
      </div>

      {/* Desglose */}
      <div className="rounded-lg border border-gold/15 bg-surface p-5 text-sm space-y-2">
        <Row l={t('service', { name: locale === 'es' ? service.name_es : service.name_en })} r={formatCents(priceCents, locale)} />
        <Row
          l={t('depositNow', { pct: depositPercent })}
          r={formatCents(deposit, locale)}
          bold
          primary
        />
        <div className="h-px bg-gold/10 my-1" />
        <Row l={t('remaining')} r={formatCents(remaining, locale)} muted />
      </div>

      {/* Card form (Stripe Elements wiring will go here) */}
      <div className="rounded-lg border border-gold/15 bg-surface p-5 space-y-3">
        <div className="text-sm font-semibold">{t('card')}</div>
        <Input
          value={card}
          onChange={(e) => setCard(e.target.value)}
          placeholder="1234 1234 1234 1234"
          inputMode="numeric"
          className="font-mono tracking-wider"
        />
        <div className="grid grid-cols-3 gap-2">
          <Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/AA" className="font-mono" />
          <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" className="font-mono" />
          <Input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP" className="font-mono" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-ink-muted">
          <Lock className="w-3 h-3" />
          {t('secureBy', { name: barber.full_name.split(' ')[0] })}
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-danger/30 bg-danger/10 p-3 text-xs text-danger">
          {error}
        </div>
      )}

      <Button onClick={pay} disabled={processing} size="xl" className="w-full">
        {processing ? t('processing') : t('payAndBook', { amount: deposit / 100 })}
      </Button>
      <p className="text-[10px] text-center text-ink-muted">{t('noShowPolicy')}</p>
    </div>
  );
}

function Row({
  l,
  r,
  bold,
  primary,
  muted,
}: {
  l: string;
  r: string;
  bold?: boolean;
  primary?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn('flex justify-between', muted && 'text-ink-muted')}
    >
      <span className={bold ? 'font-semibold' : ''}>{l}</span>
      <span
        className={cn(
          'font-mono',
          bold ? 'font-bold' : 'font-medium',
          primary && 'text-gold',
        )}
      >
        {r}
      </span>
    </div>
  );
}
