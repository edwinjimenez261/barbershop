import Image from 'next/image';
import type { ReactNode } from 'react';
import { LocaleToggle } from '@/components/locale-toggle';
import { PortalNav, type PortalNavItem } from './portal-nav';

export type { PortalNavItem };

export function PortalShell({
  title,
  user,
  navItems,
  children,
  logoSrc = '/styles-logo.png',
}: {
  title: string;
  user?: { name: string; subtitle?: string; avatarColor?: string };
  navItems: PortalNavItem[];
  children: ReactNode;
  logoSrc?: string;
}) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-gold/10 bg-bg-elev">
        <div className="container-tight flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black border border-gold/40 overflow-hidden flex-shrink-0">
              <Image src={logoSrc} alt={title} width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display text-base font-bold leading-tight">{title}</div>
              {user?.subtitle && <div className="text-[11px] text-ink-muted">{user.subtitle}</div>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LocaleToggle />
            {user && (
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-surface border border-gold/15 text-sm">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ background: user.avatarColor ?? '#C9A961' }}
                >
                  {user.name
                    .split(' ')
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join('')}
                </div>
                <span className="font-medium hidden sm:inline">{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <PortalNav items={navItems} />

      <main className="container-tight py-8">{children}</main>
    </div>
  );
}
