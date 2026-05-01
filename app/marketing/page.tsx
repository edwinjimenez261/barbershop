import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scissors, Globe, CreditCard, MessageCircle, Wallet, Sparkles } from 'lucide-react';

export default function MarketingHome() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Top nav */}
      <header className="border-b border-gold/10">
        <div className="container-tight flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black border border-gold/40 flex items-center justify-center">
              <Scissors className="w-4 h-4 text-gold" />
            </div>
            <div className="font-display font-bold tracking-wide">getbarber.app</div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/auth/sign-in" className="text-ink-muted hover:text-ink">
              Iniciar sesión
            </Link>
            <Link href="https://app.getbarber.app">
              <Button size="sm">Empezar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container-tight py-16 md:py-28 text-center">
        <div className="kicker mb-4">Para barberías hispanas en EE. UU.</div>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-3xl mx-auto">
          El sistema que tus <em className="text-gold not-italic">barberos sí van a usar.</em>
        </h1>
        <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mt-6 leading-relaxed">
          Reservas online, depósitos directos al barbero por Stripe, WhatsApp bilingüe automático,
          y cobro de renta de silla en piloto automático. Hecho para el modelo booth rental.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Link href="https://app.getbarber.app">
            <Button size="xl">Quiero el sistema</Button>
          </Link>
          <Link href="#features">
            <Button size="xl" variant="outline">
              Ver cómo funciona
            </Button>
          </Link>
        </div>
        <div className="mt-6 text-sm text-ink-dim">
          Setup en español · Llave en mano · Sin tarjeta para empezar
        </div>
      </section>

      {/* Diferenciadores */}
      <section id="features" className="container-tight py-16 md:py-24 border-t border-gold/10">
        <div className="kicker text-center mb-3">Por qué nosotros</div>
        <h2 className="section-title text-center mb-12">
          Cuatro razones por las que <em className="text-gold not-italic">Booksy y Square no nos alcanzan.</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Feature
            icon={<Globe />}
            title="Bilingüe nativo"
            body="Español neutro de verdad y inglés. No es un toggle, es arquitectura — los SMS, el WhatsApp y la UI siguen el idioma de cada cliente."
          />
          <Feature
            icon={<CreditCard />}
            title="Pago directo al barbero"
            body="Cada barbero tiene su propia cuenta Stripe Connect Express. El depósito va a su banco, no pasa por el dueño. Booth rental nativo."
          />
          <Feature
            icon={<MessageCircle />}
            title="WhatsApp como canal #1"
            body="Confirmación, recordatorios 24h y 2h, follow-up de reseña. Todo en el WhatsApp del cliente, en su idioma."
          />
          <Feature
            icon={<Wallet />}
            title="Cobro de renta de silla"
            body="El sistema le cobra automático al barbero la semana o el mes. El dueño se ahorra perseguir a cada uno los lunes."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="container-tight py-16 md:py-24 border-t border-gold/10">
        <div className="kicker text-center mb-3">Planes</div>
        <h2 className="section-title text-center mb-3">Precio claro, sin trampa.</h2>
        <p className="text-center text-ink-muted mb-12">El SaaS te lo cobramos a ti. El cliente le paga al barbero, no a nosotros.</p>
        <div className="grid md:grid-cols-4 gap-4">
          <PricingCard name="Solo" price={39} sub="1 barbero independiente" />
          <PricingCard name="Studio" price={79} sub="2–3 barberos" />
          <PricingCard name="Pro" price={149} sub="4–8 barberos · booth rental incluido" highlight />
          <PricingCard name="Business" price={249} sub="Multi-sucursal · API" />
        </div>
      </section>

      <footer className="container-tight py-10 border-t border-gold/10 text-center text-sm text-ink-muted">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="font-display font-bold">getbarber.app</span>
        </div>
        <div>© 2026 · Hecho en Newark, NJ</div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-gold/15 bg-surface p-6">
      <div className="w-11 h-11 rounded-md bg-gold/10 text-gold flex items-center justify-center mb-4 [&>svg]:w-5 [&>svg]:h-5">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  sub,
  highlight,
}: {
  name: string;
  price: number;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-6 text-center ${
        highlight
          ? 'border-2 border-gold bg-gold/5 shadow-gold'
          : 'border border-gold/15 bg-surface'
      }`}
    >
      <div className="kicker mb-2">{name}</div>
      <div className="font-display text-5xl font-bold text-gold">${price}</div>
      <div className="text-xs text-ink-dim mb-4">/mes</div>
      <div className="text-sm text-ink-muted">{sub}</div>
    </div>
  );
}
