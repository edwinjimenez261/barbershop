import { headers } from 'next/headers';
import { getTranslations, getLocale } from 'next-intl/server';
import { CreditCard, TrendingUp, Wallet, AlertCircle } from 'lucide-react';
import { getCurrentTenant, getTenantCatalog } from '@/lib/tenant';
import { mockAppointmentsToday } from '@/lib/mock-data';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConnectButton } from '@/components/portal/connect-button';
import { formatCents } from '@/lib/utils';

export default async function BarberIngresos() {
  const { tenant } = await getCurrentTenant();
  if (!tenant) return null;
  const t = await getTranslations('barberPortal.income');
  const locale = (await getLocale()) as 'es' | 'en';

  const h = headers();
  const slug = h.get('x-tenant-barber-slug') ?? 'jose';
  const { barbers } = await getTenantCatalog(tenant.id);
  const barber = barbers.find((b) => b.slug === slug) ?? barbers[0];

  const appts = mockAppointmentsToday.filter((a) => a.barber_id === barber.id);
  const todayDeposits = appts.reduce((sum, a) => sum + a.deposit_cents, 0);
  const weekTotal = todayDeposits * 5;
  const monthTotal = todayDeposits * 22;
  const stripeOk = barber.stripe_charges_enabled;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">{t('title')}</h1>
          <p className="text-sm text-ink-muted mt-1">
            {stripeOk ? t('stripeConnect') : t('stripeNotConnected')}
          </p>
        </div>
        {stripeOk ? (
          <Badge variant="success">{t('stripeConnect')}</Badge>
        ) : (
          <ConnectButton label={t('connectAction')} />
        )}
      </div>

      {!stripeOk && (
        <Card className="border-danger/30 bg-danger/5">
          <CardContent className="flex items-start gap-3 py-4">
            <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
            <div className="text-sm">
              <div className="font-semibold mb-1">Stripe pendiente</div>
              <p className="text-ink-muted">
                Conecta tu cuenta de Stripe Express para recibir pagos directos al banco. Es 5 minutos
                y aceptamos SSN o ITIN.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-3 gap-3">
        <Stat icon={<TrendingUp />} label={t('weekTotal')} value={formatCents(weekTotal, locale)} />
        <Stat icon={<Wallet />} label={t('monthTotal')} value={formatCents(monthTotal, locale)} />
        <Stat
          icon={<CreditCard />}
          label={t('rentDue')}
          value={formatCents(barber.booth_rent_amount_cents, locale)}
          accent="danger"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-semibold">Citas pagadas hoy</div>
            <div className="text-sm text-gold font-mono">{formatCents(todayDeposits, locale)}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gold/10">
            {appts.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gold w-14">{a.start_at}</span>
                  <span>{a.client_name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-ink-muted">{a.deposit_cents > 0 ? 'Depósito' : 'Sin depósito'}</span>
                  <span className="font-mono font-semibold text-gold w-16 text-right">
                    {formatCents(a.deposit_cents, locale)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent = 'gold',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: 'gold' | 'danger';
}) {
  return (
    <Card>
      <CardContent>
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center mb-3 ${
            accent === 'danger' ? 'bg-danger/15 text-danger' : 'bg-gold/15 text-gold'
          } [&>svg]:w-4 [&>svg]:h-4`}
        >
          {icon}
        </div>
        <div className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">{label}</div>
        <div className="font-display text-3xl font-bold mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}
