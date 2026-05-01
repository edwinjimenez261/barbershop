import type { Service } from '@/lib/types/database';
import { formatCents } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ServiceLine({
  service,
  locale,
  last,
}: {
  service: Service;
  locale: 'es' | 'en';
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 py-5',
        !last && 'border-b border-gold/10',
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-display text-lg font-semibold leading-tight">
          {locale === 'es' ? service.name_es : service.name_en}
        </div>
        <div className="text-xs text-ink-muted mt-1.5 leading-relaxed">
          {locale === 'es' ? service.description_es : service.description_en}
        </div>
        <div className="text-[10px] text-ink-dim mt-1.5 tracking-wider">
          {service.duration_min} MIN
        </div>
      </div>
      <div className="font-display text-2xl font-bold text-gold whitespace-nowrap">
        {formatCents(service.base_price_cents, locale)}
        <span className="text-sm opacity-60">+</span>
      </div>
    </div>
  );
}
