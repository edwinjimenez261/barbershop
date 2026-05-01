import { Logo } from "./Logo";
import { SHOP } from "@/lib/shop";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-ink-elev/40">
      <div className="container-x py-16">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          <div>
            <Logo />
            <p className="mt-5 text-sm text-bone-muted max-w-xs leading-relaxed">
              Calidad, estilo y confianza desde {SHOP.foundedYear}. La barbería
              de referencia en Newark, NJ.
            </p>
          </div>

          <FooterCol title="Sitio">
            <a href="#servicios">Servicios</a>
            <a href="#barberos">Barberos</a>
            <a href="#galeria">Galería</a>
            <a href="#resenas">Reseñas</a>
          </FooterCol>

          <FooterCol title="Reservar">
            <a href="#reservar">Online</a>
            <a href={SHOP.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`tel:${SHOP.phoneRaw}`}>Teléfono</a>
          </FooterCol>

          <FooterCol title="Visítanos">
            <span className="text-bone-muted">49 Warwick St</span>
            <span className="text-bone-muted">Newark, NJ 07105</span>
            <a href={SHOP.instagram} target="_blank" rel="noopener noreferrer">
              {SHOP.instagramHandle}
            </a>
          </FooterCol>
        </div>
      </div>

      <div className="border-t border-gold/5">
        <div className="container-x py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-bone-dim">
          <span>© {new Date().getFullYear()} {SHOP.name}. Todos los derechos reservados.</span>
          <span>
            Powered by{" "}
            <a href="https://getbarber.app" className="text-gold hover:text-gold-light transition-colors">
              getbarber.app
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">{title}</h4>
      <nav className="flex flex-col gap-3 text-sm text-bone-muted [&_a]:hover:text-gold [&_a]:transition-colors">
        {children}
      </nav>
    </div>
  );
}
