# getbarber.app

Multi-tenant SaaS de reservas para barberías hispanas en EE. UU. Cliente piloto: **Styles Barbershop 2** (49 Warwick St, Newark, NJ).

> Bilingüe nativo (ES/EN) · WhatsApp como canal principal · Pagos directos al barbero (Stripe Connect Express) · Cobro automático de renta de silla.

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** con tema `black_gold` (negro & dorado)
- **next-intl** (es + en con español neutro)
- **Supabase** (Postgres + RLS + Auth + Storage)
- **Stripe**: Subscriptions (cobro SaaS al dueño) + Connect Express (cliente → barbero) + Subscription destination charges (booth rental dueño → barbero)
- **Twilio**: SMS + WhatsApp Business via Content API
- **Vercel**: hosting + Cron Jobs para recordatorios

---

## Estructura

```
app/
├── [locale]/              # locale-prefixed routes (es | en)
│   ├── (public)/          # cliente final por tenant
│   │   ├── page.tsx       # landing pública
│   │   └── reservar/      # flujo de 5 pasos
│   ├── admin/             # portal del dueño (subdominio admin.*)
│   ├── barbero/           # portal del barbero (subdominio <slug>.*)
│   └── auth/              # sign-in (magic link)
├── api/
│   ├── booking/create/    # crear cita + payment intent
│   ├── stripe/            # connect onboarding, checkout, webhook
│   └── twilio/webhook/    # inbound (cambio de idioma vía SMS)
└── _marketing/            # landing de getbarber.app

components/
├── ui/                    # primitives (button, card, input, badge…)
├── booking/               # pasos del wizard
├── portal/                # shell de los portales
└── auth/                  # sign-in form

lib/
├── supabase/              # server, client, admin
├── stripe/                # client, connect, subscriptions, booth-rental
├── twilio/                # client, sms, whatsapp, templates
├── notify.ts              # WhatsApp con fallback SMS
├── tenant.ts              # resolución por hostname
└── mock-data.ts           # seed Styles Barbershop 2 para dev sin DB

supabase/migrations/
├── 0001_init.sql          # 11 tablas + ENUMs + helpers RLS
├── 0002_rls.sql           # policies multi-tenant + role-based
└── 0003_seed_styles.sql   # tenant + barberos + servicios reales

messages/{es,en}.json      # 14 templates de UI bilingües

demo/                      # bundle de Claude Design (demo de venta)
```

---

## Setup local

### 1. Dependencias

```bash
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env.local
```

Llena las llaves:

| Variable | Origen |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | Dashboard Supabase → API |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Dashboard Stripe → Test mode → API keys |
| `STRIPE_WEBHOOK_SECRET` | `stripe listen --forward-to localhost:3000/api/stripe/webhook` |
| `STRIPE_CONNECT_CLIENT_ID` | Dashboard Stripe → Connect → Settings |
| `STRIPE_PRICE_SOLO/STUDIO/PRO/BUSINESS` | Crea los Products + Prices en Stripe |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Dashboard Twilio |
| `TWILIO_MESSAGING_SERVICE_SID` | Twilio → Messaging → Services |
| `TWILIO_WHATSAPP_FROM` | Tu número WhatsApp aprobado por Meta (formato `whatsapp:+1...`) |
| `TWILIO_TEMPLATE_*` | SIDs devueltos por Meta tras aprobar templates |

Mientras no haya DB, deja `NEXT_PUBLIC_USE_MOCK_DATA=true` y la app corre con datos seed de Styles Barbershop 2 (mock-data.ts).

### 3. Supabase migrations

Con `supabase` CLI ([install](https://supabase.com/docs/guides/cli)):

```bash
supabase link --project-ref <ref>
supabase db push   # aplica 0001_init + 0002_rls + 0003_seed_styles
```

### 4. Dev server

```bash
npm run dev
```

### 5. Probar multi-tenancy local

Edita `/etc/hosts` (Linux/macOS) o `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1   stylesbarbershop2.local
127.0.0.1   admin.stylesbarbershop2.local
127.0.0.1   jose.stylesbarbershop2.local
127.0.0.1   getbarber.local
```

Luego visita:

| URL | Vista |
|---|---|
| `http://stylesbarbershop2.local:3000/` | Landing pública del cliente |
| `http://stylesbarbershop2.local:3000/reservar/barbero` | Flujo de reserva |
| `http://admin.stylesbarbershop2.local:3000/` | Portal del dueño |
| `http://jose.stylesbarbershop2.local:3000/` | Portal del barbero José |
| `http://getbarber.local:3000/` | Marketing site del SaaS |

### 6. Stripe webhook forwarding

En otra terminal:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copia el `whsec_…` que aparece a `.env.local` como `STRIPE_WEBHOOK_SECRET`.

---

## Deploy a Vercel

1. `vercel link`
2. Configura **Custom Domains** en Vercel:
   - `getbarber.app` (apex) + `www.getbarber.app`
   - `stylesbarbershop2.com`, `admin.stylesbarbershop2.com`, `*.stylesbarbershop2.com` (wildcard para barberos)
3. Configura las **Environment Variables** del paso 2 en Vercel.
4. Push a `main` → deploy automático.

### Crons (Vercel Cron)

Recordatorios de cita 24h y 2h antes — agregar a `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/cron/reminders-24h", "schedule": "0 9 * * *" },
    { "path": "/api/cron/reminders-2h",  "schedule": "*/15 * * * *" }
  ]
}
```

(Edwin: las routes de cron quedan pendientes para próximo turno — el código de envío ya existe en `lib/notify.ts`.)

---

## Demo de venta

`demo/Styles-Barbershop-2-Demo.html` — archivo único standalone (3.4 MB) generado en Claude Design. Mándaselo al cliente por WhatsApp; abre en cualquier navegador sin internet.

---

## Roadmap (del plan v2 ya aprobado)

- [x] Fundación + MVP (este commit)
- [ ] Cron de recordatorios 24h / 2h
- [ ] Stripe Elements en `payment-form.tsx` (reemplazar inputs falsos)
- [ ] Drag & drop real en calendario barbero
- [ ] Galería con upload a Supabase Storage
- [ ] Onboarding self-service en `app.getbarber.app`
- [ ] Sync Google Calendar (Fase 2)
- [ ] Agente de voz Stella (Fase 3)

---

## Notas de arquitectura

- **Booth rental**: la cuenta Stripe del barbero es independiente de la del dueño. Los pagos del cliente final van directo al banco del barbero (`transfer_data.destination`). La renta de silla es una Subscription separada que cobra al barbero y deposita al dueño.
- **`application_fee_amount: 0`**: getbarber.app no toma fee transaccional. Monetización 100% vía Subscriptions del SaaS al dueño. Pitch más limpio.
- **RLS**: payouts de cada barbero son invisibles incluso para el dueño (privacidad del modelo booth rental). El dueño solo ve agregados.
- **Español neutro**: glosario en `messages/es.json`. Evitar "turno" (Argentina), "booking" (anglicismo), "adelanto" (calco). Usar siempre "cita", "reserva", "depósito".
- **Fallback sin Stripe**: si un barbero no terminó el onboarding de Connect, el sistema permite reservas SIN depósito y marca la cita como `confirmed` con `deposit_status: 'none'`. El cobro pasa en local.
