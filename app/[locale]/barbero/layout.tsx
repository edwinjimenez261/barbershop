import { getTranslations, getLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { Calendar, Clock, DollarSign, Image as ImageIcon, Star } from 'lucide-react';
import { PortalShell, type PortalNavItem } from '@/components/portal/portal-shell';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { mockBarbers } from '@/lib/mock-data';

export default async function BarberLayout({ children }: { children: React.ReactNode }) {
  const { tenant } = await getCurrentTenant();
  const t = await getTranslations('barberPortal.tabs');
  const locale = await getLocale();

  // Pick the barber for this subdomain (or fallback to José for the demo).
  const h = headers();
  const slug = h.get('x-tenant-barber-slug') ?? 'jose';
  const { barbers } = tenant ? await getTenantCatalog(tenant.id) : { barbers: mockBarbers };
  const barber = barbers.find((b) => b.slug === slug) ?? barbers[0];

  if (!tenant || !barber) return <div className="p-8 text-ink-muted">Barbero no encontrado.</div>;

  const base = `/${locale}/barbero`;
  const navItems: PortalNavItem[] = [
    { href: `${base}`,            label: t('today'),     icon: <Clock className="w-4 h-4" /> },
    { href: `${base}/calendario`, label: t('calendar'),  icon: <Calendar className="w-4 h-4" /> },
    { href: `${base}/ingresos`,   label: t('income'),    icon: <DollarSign className="w-4 h-4" /> },
    { href: `${base}/galeria`,    label: t('gallery'),   icon: <ImageIcon className="w-4 h-4" /> },
    { href: `${base}/resenas`,    label: t('reviews'),   icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <PortalShell
      title={tenant.name}
      user={{ name: barber.full_name, subtitle: barber.role_label ?? '', avatarColor: barber.color_hex }}
      navItems={navItems}
      logoSrc={tenant.branding.logoUrl ?? '/styles-logo.png'}
    >
      {children}
    </PortalShell>
  );
}
