import { getTranslations, getLocale } from 'next-intl/server';
import { LayoutDashboard, Wallet, Calendar, Users, MessageSquare } from 'lucide-react';
import { PortalShell, type PortalNavItem } from '@/components/portal/portal-shell';
import { getCurrentTenant } from '@/lib/tenant';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { tenant } = await getCurrentTenant();
  const t = await getTranslations('ownerPortal.tabs');
  const locale = await getLocale();

  if (!tenant) return <div className="p-8 text-ink-muted">Acceso restringido.</div>;

  const base = `/${locale}/admin`;
  const navItems: PortalNavItem[] = [
    { href: `${base}`,            label: t('dashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: `${base}/rentas`,     label: t('rentas'),    icon: <Wallet className="w-4 h-4" /> },
    { href: `${base}/calendario`, label: t('calendar'),  icon: <Calendar className="w-4 h-4" /> },
    { href: `${base}/barberos`,   label: t('barbers'),   icon: <Users className="w-4 h-4" /> },
    { href: `${base}/mensajes`,   label: t('messages'),  icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <PortalShell
      title={tenant.name}
      user={{ name: 'Dueño', subtitle: locale === 'es' ? 'Administración' : 'Admin' }}
      navItems={navItems}
      logoSrc={tenant.branding.logoUrl ?? '/styles-logo.png'}
    >
      {children}
    </PortalShell>
  );
}
