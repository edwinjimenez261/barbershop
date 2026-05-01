import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/ui/stars';
import { LocaleToggle } from '@/components/locale-toggle';
import { BarberCard } from '@/components/booking/barber-card';
import { ServiceLine } from '@/components/booking/service-line';
import { ReviewCard } from '@/components/booking/review-card';
import { Phone, MapPin, Compass } from 'lucide-react';

export default async function LandingPublica() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;

  const t = await getTranslations('landing');
  const locale = (await getLocale()) as 'es' | 'en';
  const { barbers, services, reviews } = await getTenantCatalog(tenant.id);

  return (
    <main className="bg-bg text-ink">
      {/* Sticky nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/80 border-b border-gold/10">
        <div className="container-tight flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-black border border-gold/40 overflow-hidden">
              <Image
                src={tenant.branding.logoUrl ?? '/styles-logo.png'}
                alt={tenant.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-display font-bold text-sm tracking-wide hidden sm:block">
              {tenant.name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LocaleToggle />
            <Link href={`/${locale}/reservar/barbero`}>
              <Button size="sm">{t('ctaBook')}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 0%, hsl(var(--gold) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 100%, hsl(var(--gold) / 0.10) 0%, transparent 50%)',
          }}
        />
        <div className="container-tight pt-12 pb-16 md:pt-20 md:pb-24 relative">
          <div className="kicker mb-5">· EST. 2018 · NEWARK, NJ ·</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.98] tracking-tight">
            {t('heroTitle')}
            <br />
            <em className="not-italic md:italic text-gold">{t('heroTitleAccent')}</em>
          </h1>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-xl mt-5">
            {t('heroSubtitle')}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 max-w-md">
            <Link href={`/${locale}/reservar/barbero`} className="flex-1">
              <Button size="xl" className="w-full">
                {t('ctaBook')} →
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-ink-dim">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>{t('openNow', { time: '8:00 PM' })}</span>
            <span className="opacity-40 mx-1">·</span>
            <Stars rating={tenant.settings.rating ?? 4.9} size={12} />
            <span>{tenant.settings.rating ?? 4.9}</span>
            <span className="text-ink-muted">({tenant.settings.reviewsCount ?? 287})</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gold/10 py-10">
        <div className="container-tight grid grid-cols-3 gap-4">
          <Stat n="4.9" l={t('stats.rating')} />
          <Stat n={`${tenant.settings.reviewsCount ?? 287}`} l={t('stats.reviews')} />
          <Stat n="7" l={t('stats.daysWeek')} />
        </div>
      </section>

      {/* Barberos */}
      <section className="container-tight py-16 md:py-24">
        <div className="kicker mb-2">· {t('team.kicker')} ·</div>
        <h2 className="section-title mb-3">
          {t('team.title')}
          <br />
          <em className="not-italic md:italic text-gold">{t('team.titleAccent')}</em>
        </h2>
        <p className="text-ink-muted mb-10 max-w-md">{t('team.subtitle')}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {barbers.map((b) => (
            <BarberCard key={b.id} barber={b} cta={t('team.book')} locale={locale} />
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="border-t border-gold/10 py-16 md:py-24">
        <div className="container-tight max-w-2xl">
          <div className="kicker mb-2">· {t('services.kicker')} ·</div>
          <h2 className="section-title mb-3">
            {t('services.title')}
            <br />
            <em className="not-italic md:italic text-gold">{t('services.titleAccent')}</em>
          </h2>
          <p className="text-ink-muted mb-8">{t('services.subtitle')}</p>
          <div>
            {services.map((s, i) => (
              <ServiceLine
                key={s.id}
                service={s}
                locale={locale}
                last={i === services.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="border-t border-gold/10 py-16 md:py-24">
        <div className="container-tight max-w-3xl">
          <div className="kicker mb-2">· {t('reviews.kicker')} ·</div>
          <h2 className="section-title mb-4">
            {t('reviews.title')}
            <br />
            <em className="not-italic md:italic text-gold">{t('reviews.titleAccent')}</em>
          </h2>
          <div className="flex items-center gap-2 mb-8">
            <Stars rating={5} size={16} />
            <span className="text-sm font-bold">{tenant.settings.rating ?? 4.9}</span>
            <span className="text-xs text-ink-muted">
              · {t('reviews.googleHint', { count: tenant.settings.reviewsCount ?? 287 })}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.slice(0, 4).map((r) => {
              const b = barbers.find((x) => x.id === r.barber_id);
              return (
                <ReviewCard
                  key={r.id}
                  review={r}
                  barberName={b?.full_name ?? ''}
                  attendedByLabel={t('reviews.attendedBy', { name: b?.full_name.split(' ')[0] ?? '' })}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="border-t border-gold/10 py-16 md:py-24">
        <div className="container-tight max-w-2xl">
          <div className="kicker mb-2">· {t('visit.kicker')} ·</div>
          <h2 className="section-title mb-8">
            {t('visit.title')}
            <br />
            <em className="not-italic md:italic text-gold">{t('visit.titleAccent')}</em>
          </h2>
          <div className="rounded-lg border border-gold/15 bg-surface p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-gold" />
              <div>
                <div className="font-semibold">{tenant.settings.address?.split(',')[0]}</div>
                <div className="text-sm text-ink-muted">
                  {tenant.settings.address?.split(',').slice(1).join(',').trim()}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gold/10">
              <Button variant="secondary" size="md">
                <Phone className="w-4 h-4" /> {t('visit.call')}
              </Button>
              <Button variant="secondary" size="md">
                <Compass className="w-4 h-4" /> {t('visit.directions')}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-gold/15 bg-surface p-6 mt-4">
            <div className="kicker mb-3">{t('visit.hours')}</div>
            {Object.entries(tenant.settings.hours).map(([day, hrs]) => (
              <div
                key={day}
                className="flex justify-between py-1.5 text-sm border-b border-gold/10 last:border-0"
              >
                <span>{day}</span>
                <span className="font-mono text-xs text-ink-muted">{hrs}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gold/10 py-16 md:py-24 text-center">
        <div className="container-tight max-w-xl">
          <h2 className="section-title mb-3">
            {t('finalCta.title')}
            <br />
            <em className="not-italic md:italic text-gold">{t('finalCta.titleAccent')}</em>
          </h2>
          <p className="text-ink-muted mb-8">{t('finalCta.subtitle')}</p>
          <Link href={`/${locale}/reservar/barbero`}>
            <Button size="xl">{t('ctaBook')} →</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-black border border-gold/40 mx-auto mb-3 overflow-hidden">
          <Image
            src={tenant.branding.logoUrl ?? '/styles-logo.png'}
            alt={tenant.name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-display font-bold text-gold tracking-wider">
          {tenant.name.toUpperCase()}
        </div>
        <div className="text-xs text-ink-muted mt-2">
          {tenant.settings.address}
          <br />
          {tenant.settings.phone}
        </div>
        <div className="text-[10px] text-ink-dim mt-4 tracking-wider">
          © 2026 · Powered by getbarber.app
        </div>
      </footer>
    </main>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gold leading-none">{n}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-muted mt-2 font-semibold">{l}</div>
    </div>
  );
}
