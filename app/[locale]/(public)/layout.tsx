import { getCurrentTenant } from '@/lib/tenant';
import { redirect } from 'next/navigation';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const { tenant, subportal } = await getCurrentTenant();

  // If we're on admin.* or barber.* subdomains, the public layout is not the right one.
  if (subportal === 'admin') redirect('/admin');
  if (subportal === 'barber') redirect('/barbero');

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-muted">
        Tenant no encontrado.
      </div>
    );
  }

  return <div className="min-h-screen bg-bg text-ink">{children}</div>;
}
