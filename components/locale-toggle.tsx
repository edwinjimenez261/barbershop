'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export function LocaleToggle({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchTo = (next: 'es' | 'en') => {
    if (next === locale) return;
    const segs = pathname.split('/');
    if (['es', 'en'].includes(segs[1])) {
      segs[1] = next;
    } else {
      segs.splice(1, 0, next);
    }
    router.push(segs.join('/') || '/');
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gold/15 text-xs',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => switchTo('es')}
        className={cn(
          'px-1.5 font-bold transition-colors',
          locale === 'es' ? 'text-gold' : 'text-ink-muted hover:text-ink',
        )}
      >
        ES
      </button>
      <span className="opacity-30">·</span>
      <button
        type="button"
        onClick={() => switchTo('en')}
        className={cn(
          'px-1.5 font-bold transition-colors',
          locale === 'en' ? 'text-gold' : 'text-ink-muted hover:text-ink',
        )}
      >
        EN
      </button>
    </div>
  );
}
