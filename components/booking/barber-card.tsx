import Link from 'next/link';
import type { Barber } from '@/lib/types/database';
import { BarberAvatar } from '@/components/ui/avatar';
import { Stars } from '@/components/ui/stars';

export function BarberCard({
  barber,
  cta,
  locale,
}: {
  barber: Barber;
  cta: string;
  locale: 'es' | 'en';
}) {
  return (
    <Link
      href={`/${locale}/reservar/servicio?barbero=${barber.slug}`}
      className="group block rounded-lg border border-gold/15 bg-surface overflow-hidden hover:border-gold/40 transition-colors"
    >
      <div
        className="h-32 relative border-b border-gold/15"
        style={{
          background: `linear-gradient(135deg, ${barber.color_hex}66, ${barber.color_hex}22)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent 0 8px, rgba(0,0,0,0.08) 8px 9px)',
          }}
        />
        <div className="absolute -bottom-8 left-5">
          <div className="border-[3px] border-surface rounded-full">
            <BarberAvatar fullName={barber.full_name} colorHex={barber.color_hex} size={64} />
          </div>
        </div>
        {barber.role_label && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 text-white text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
            {barber.role_label.split('·')[0].trim()}
          </div>
        )}
      </div>
      <div className="px-5 pt-12 pb-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-display font-bold text-lg leading-tight">{barber.full_name}</div>
            {barber.alias && (
              <div className="text-xs text-gold font-semibold tracking-wider mt-1 italic font-display">
                «{barber.alias}»
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Stars rating={barber.rating} size={11} />
            <span className="font-semibold text-xs">{barber.rating.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-sm text-ink-muted mt-3 leading-relaxed">{barber.bio}</p>
        <div className="mt-4 pt-4 border-t border-gold/10 flex items-center justify-between">
          <div className="text-xs text-ink-dim">{barber.instagram}</div>
          <div className="text-[10px] text-gold font-bold tracking-wider uppercase group-hover:translate-x-1 transition-transform">
            {cta} →
          </div>
        </div>
      </div>
    </Link>
  );
}
