'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function BookingHeader({
  step,
  totalSteps,
  title,
  backHref,
}: {
  step: number;
  totalSteps: number;
  title: string;
  backHref: string;
}) {
  const t = useTranslations('booking');
  return (
    <div className="sticky top-0 z-30 bg-bg-elev border-b border-gold/10">
      <div className="container-tight max-w-xl py-4">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href={backHref}
            className="w-9 h-9 rounded-full bg-surface border border-gold/15 flex items-center justify-center hover:bg-surface-light"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
            {t('step', { current: step, total: totalSteps })}
          </div>
          <div className="ml-auto flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all',
                  i + 1 <= step ? 'w-5 bg-gold' : 'w-1.5 bg-gold/15',
                )}
              />
            ))}
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
      </div>
    </div>
  );
}
