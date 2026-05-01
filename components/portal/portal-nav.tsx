'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PortalNavItem {
  href: string;
  label: string;
  icon?: ReactNode;
}

export function PortalNav({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gold/10 bg-bg-elev/50 sticky top-0 z-20 backdrop-blur-md">
      <div className="container-tight flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active =
            item.href === pathname || (item.href !== items[0]?.href && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                active ? 'border-gold text-gold' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
