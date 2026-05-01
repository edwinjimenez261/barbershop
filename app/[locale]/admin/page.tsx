import { getTranslations, getLocale } from 'next-intl/server';
import { Calendar, Users, TrendingUp, UserPlus, Award } from 'lucide-react';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { mockAppointmentsToday } from '@/lib/mock-data';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default async function AdminDashboard() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const t = await getTranslations('ownerPortal.dashboard');
  const locale = (await getLocale()) as 'es' | 'en';
  const { barbers } = await getTenantCatalog(tenant.id);

  const todayCount = mockAppointmentsToday.length;
  const weekCount = todayCount * 5;
  const occupancy = 78;
  const newClients = 14;
  const top = [...barbers].sort((a, b) => b.rating - a.rating)[0];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">{t('title')}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI icon={<Calendar />} label={t('todayBookings')} value={String(todayCount)} />
        <KPI icon={<TrendingUp />} label={t('weekBookings')} value={String(weekCount)} />
        <KPI icon={<Users />} label={t('occupancy')} value={`${occupancy}%`} />
        <KPI icon={<UserPlus />} label={t('newClients')} value={String(newClients)} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-semibold">Barberos hoy</div>
            <Award className="w-4 h-4 text-gold" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gold/10">
            {barbers.map((b) => {
              const count = mockAppointmentsToday.filter((a) => a.barber_id === b.id).length;
              const isTop = b.id === top?.id;
              return (
                <div key={b.id} className="py-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: b.color_hex }}
                  >
                    {b.full_name
                      .split(' ')
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{b.full_name}</div>
                    <div className="text-xs text-ink-muted">
                      {b.role_label} · ★ {b.rating.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-2xl font-bold text-gold leading-none">{count}</div>
                    <div className="text-[10px] text-ink-muted uppercase tracking-wider mt-0.5">
                      {locale === 'es' ? 'citas' : 'bookings'}
                    </div>
                  </div>
                  {isTop && (
                    <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                      {t('topBarber')}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KPI({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent>
        <div className="w-9 h-9 rounded-md bg-gold/15 text-gold flex items-center justify-center mb-3 [&>svg]:w-4 [&>svg]:h-4">
          {icon}
        </div>
        <div className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">{label}</div>
        <div className="font-display text-3xl font-bold mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}
