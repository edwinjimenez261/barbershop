import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { mockAppointmentsToday, mockServices } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import type { Barber } from '@/lib/types/database';

const HOURS = Array.from({ length: 11 }, (_, i) => 9 + i);

function CalendarRow({ h, barbers }: { h: number; barbers: Barber[] }) {
  return (
    <>
      <div className="bg-bg-elev px-3 py-2 border-b border-gold/10 last:border-0 text-xs font-mono text-ink-muted h-20">
        {h.toString().padStart(2, '0')}:00
      </div>
      {barbers.map((b) => (
        <div key={b.id} className="border-b border-gold/10 last:border-0 h-20 relative">
          {mockAppointmentsToday
            .filter((a) => a.barber_id === b.id && parseInt(a.start_at.split(':')[0]) === h)
            .map((a) => {
              const svc = mockServices.find((s) => s.slug === a.service_slug);
              const mm = parseInt(a.start_at.split(':')[1]);
              const top = (mm / 60) * 80;
              const height = (svc?.duration_min ?? 30) * (80 / 60);
              return (
                <div
                  key={a.id}
                  style={{ top, height: height - 4 }}
                  className="absolute left-1 right-1 rounded-md border border-gold/40 bg-gold/15 px-2 py-1 text-[10px]"
                >
                  <div className="font-bold text-gold truncate">{a.client_name}</div>
                  <div className="text-ink-muted truncate">{svc?.name_es}</div>
                </div>
              );
            })}
        </div>
      ))}
    </>
  );
}

export default async function AdminCalendario() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const { barbers } = await getTenantCatalog(tenant.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Calendario global</h1>
        <p className="text-sm text-ink-muted mt-1">Vista de todos los barberos · solo lectura</p>
      </div>

      <Card className="overflow-x-auto">
        <div
          className="grid divide-x divide-gold/10 min-w-fit"
          style={{ gridTemplateColumns: `80px repeat(${barbers.length}, minmax(180px, 1fr))` }}
        >
          {/* Header */}
          <div className="bg-bg-elev p-3 border-b border-gold/10 text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
            Hora
          </div>
          {barbers.map((b) => (
            <div key={b.id} className="bg-bg-elev p-3 border-b border-gold/10">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ background: b.color_hex }}
                >
                  {b.full_name
                    .split(' ')
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join('')}
                </div>
                <span className="text-xs font-semibold">{b.full_name.split(' ')[0]}</span>
              </div>
            </div>
          ))}

          {/* Hours */}
          {HOURS.map((h) => (
            <CalendarRow key={h} h={h} barbers={barbers} />
          ))}
        </div>
      </Card>
    </div>
  );
}
