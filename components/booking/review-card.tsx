import type { Review } from '@/lib/types/database';
import { Stars } from '@/components/ui/stars';
import { initials } from '@/lib/utils';

export function ReviewCard({
  review,
  barberName,
  attendedByLabel,
}: {
  review: Review;
  barberName: string;
  attendedByLabel: string;
}) {
  return (
    <div className="rounded-lg bg-surface border border-gold/15 p-5">
      <div className="flex items-center justify-between mb-3">
        <Stars rating={review.rating} size={12} />
        <div className="text-[10px] text-ink-dim tracking-wider uppercase">
          {new Date(review.created_at).toLocaleDateString()}
        </div>
      </div>
      <p className="text-sm text-ink leading-relaxed italic font-display mb-4">
        «{review.text}»
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-gold/10">
        <div className="w-7 h-7 rounded-full bg-surface-light text-gold flex items-center justify-center text-[10px] font-bold font-display">
          {initials(review.author_name ?? 'A')}
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold">{review.author_name}</div>
          <div className="text-[10px] text-ink-muted">{attendedByLabel}</div>
        </div>
      </div>
    </div>
  );
}
