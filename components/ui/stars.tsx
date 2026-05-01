import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Stars({ rating, size = 12, className }: { rating: number; size?: number; className?: string }) {
  return (
    <div className={cn('inline-flex gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            i <= Math.floor(rating) ? 'fill-gold text-gold' : 'text-gold',
          )}
          style={{ width: size, height: size }}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
