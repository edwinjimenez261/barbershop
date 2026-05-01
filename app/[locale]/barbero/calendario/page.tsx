import { headers } from 'next/headers';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { mockAppointmentsToday, mockServices } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

const HOURS = Array.from({ length: 11 }, (_, i) => 9 + i); // 9am – 7pm

export default async function BarberCalendario() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;

  const h = headers();
  const slug = h.get('x-tenant-barber-slug') ?? 'jose';
  const { barbers } = await getTenantCatalog(tenant.id);
  const barber = barbers.find((b) => b.slug === slug) ?? barbers[0];
  const appts = mockAppointmentsToday.filter((a) => a.barber_id === barber.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Calendario</h1>
        <p className="text-sm text-ink-muted mt-1">
          Arrastra una cita para reagendarla. (Solo lectura en demo · drag & drop full en próxima iteración.)
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-[80px_1fr] divide-x divide-gold/10">
          <div className="bg-bg-elev">
            {HOURS.map((h) => (
              <div
                key={h}
                className="h-20 px-3 py-2 border-b border-gold/10 last:border-0 text-xs font-mono text-ink-muted"
              >
                {h.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>
          <div className="relative">
            {HOURS.map((h) => (
              <div key={h} className="h-20 border-b border-gold/10 last:border-0" />
            ))}
            {appts.map((a) => {
              const [hh, mm] = a.start_at.split(':').map(Number);
              const top = (hh - 9) * 80 + (mm / 60) * 80;
              const svc = mockServices.find((s) => s.slug === a.service_slug);
              const height = (svc?.duration_min ?? 30) * (80 / 60);
              return (
                <div
                  key={a.id}
                  style={{ top, height: height - 4 }}
                  className="absolute left-2 right-2 rounded-md border border-gold/40 bg-gold/15 px-3 py-2 text-xs"
                >
                  <div className="font-bold text-gold">{a.client_name}</div>
                  <div className="text-ink-muted">{svc?.name_es}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
