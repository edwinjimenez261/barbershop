# Plan Estratégico: SaaS de Barbería Multi-Tenant — v2

**Cliente piloto:** Barbería en NJ
**Objetivo doble:** Resolver el caso real + construir producto replicable
**Modelo operativo:** Booth rental USA (barberos independientes gestionan su dinero)
**Idiomas nativos:** Español neutro + Inglés
**Arquitecto:** Edwin / Infinity Pro AI

---

## Cambios clave vs v1

1. **Modelo de pagos rediseñado** alrededor de booth rental: cada barbero tiene su propia cuenta Stripe Connect Express. El dueño no toca el flujo de dinero del cliente.
2. **Bilingüismo nativo desde día 1** — no es un toggle, es arquitectura.
3. **Pricing por barbero** (no por barbería) — cada barbero define sus tarifas.
4. **Nueva feature vendible:** automatización de cobro de renta de silla al barbero.

---

## 1. Análisis estratégico

### El mercado y la competencia

El espacio de software para barberías en USA está dominado por **Booksy, Square Appointments, y Fresha**. Todos genéricos (sirven spa, peluquería, uñas), todos en inglés con español "traducido", ninguno pensado para el flujo cultural de la barbería hispana de USA.

### Tu diferenciador defendible

No compitas en features. Compite en cuatro frentes que tus competidores grandes no van a copiar:

- **Bilingüe nativo** (UX pensada para hispanos, no traducción de inglés)
- **WhatsApp como canal principal** (no Booksy notifications)
- **Modelo booth rental nativo** (Booksy y Square asumen empleados con comisión)
- **Setup hecho por ti**, en persona, en español — esto es lo que cobras

### Doble objetivo confirmado

Tu cliente actual financia el desarrollo del MVP. Bien arquitecturado, ese mismo MVP se replica a 50-200 barberías hispanas en NJ/NY/PA/FL. Mismo playbook que Casa Del Mar → Infinity Pro AI, mismo método Insider.

**Regla no negociable:** todo configurable, nada hardcodeado. Si el nombre, logo o servicios del cliente NJ están en el código, lo hiciste mal.

---

## 2. Arquitectura del producto

### Los tres portales

**Portal del Dueño (Owner Dashboard)**
- Vista global del negocio: # de citas, ocupación por barbero, hora pico, retención
- Gestión de barberos (alta, baja, configuración de horarios)
- Catálogo base de servicios (cada barbero puede sobrescribir precios)
- Reportes operativos (NO ve dinero específico de cada barbero — solo agregados)
- Configuración de la barbería (horarios, días no laborables, branding)
- Gestión de templates de mensajes automáticos
- **Booth rental management:** configura renta semanal/mensual por barbero, sistema cobra automático
- Acceso de lectura a todos los calendarios

**Portal del Barbero (Barber App)**
- Su calendario personal con drag-and-drop
- Sus clientes con historial completo y notas privadas
- **Sus ingresos en tiempo real** (depósitos recibidos, pagos pendientes, propinas)
- **Su cuenta Stripe Connect** y payouts directos a su banco
- Sus comisiones y/o rentas pendientes al dueño
- Bloquear horarios propios (descanso, comida, vacaciones)
- Ajustar precios de sus servicios
- Subir galería de cortes
- Ver sus propias reseñas y rating individual

**Portal del Cliente (Booking Flow)**
- Sin registro forzado para reservar (reduce fricción)
- **Detección automática de idioma** + toggle visible
- Selección: barbero → servicio (con precio del barbero) → fecha/hora
- Pago opcional de depósito (10-25% del servicio) si la política del barbero lo requiere
- Confirmaciones, recordatorios, follow-ups en su idioma preferido
- Si crea cuenta: historial, repetir cita en 1 click, programa de lealtad

### Multi-tenant desde el inicio (Supabase + RLS)

```
- tenants (cada barbería)
  - id, slug, name, plan, settings, branding, locale_default
- users (con tenant_id + role: owner/barber/client)
- barbers
  - id, user_id, tenant_id, stripe_account_id (Connect Express)
  - booth_rent_amount, booth_rent_period, booth_rent_active
  - bio, gallery, locale_preference
- services_catalog (catálogo base de la barbería)
- barber_services (override de precio/duración por barbero)
- appointments
  - id, tenant_id, barber_id, client_id, service_id
  - deposit_amount, deposit_status, payment_intent_id
  - locale (idioma usado para esta cita)
- clients (CRM por tenant, con preferred_locale, preferred_barber_id)
- messages_log (SMS/WhatsApp enviados, con idioma usado)
- reviews (por barbero + agregadas por barbería)
- payouts_log (registro de transferencias Stripe Connect)
- booth_rent_charges (cobros automáticos al barbero)
```

Row Level Security: dueño A nunca ve data de barbería B; barbero solo ve sus propios clientes/citas/dinero.

### Stack técnico definitivo

- **Frontend:** Next.js 14 + App Router + Tailwind + shadcn/ui
- **i18n:** `next-intl` (mejor que next-i18next para App Router)
- **Backend/DB/Auth:** Supabase (Postgres + RLS + Auth + Storage)
- **Pagos SaaS (tú cobras al dueño):** Stripe Subscriptions
- **Pagos cliente → barbero:** Stripe Connect Express por barbero
- **Cobro booth rental (dueño → barbero):** Stripe Subscriptions secundario o Stripe Invoicing
- **Automatizaciones:** n8n self-hosted en VPS Hostinger
- **SMS:** Twilio
- **WhatsApp:** Meta WhatsApp Business API
- **Voice (Fase 2):** ElevenLabs estilo Stella
- **Deploy:** Vercel (frontend) + VPS (n8n)
- **Multi-tenant routing:** subdominios `barbershop.tudominio.com` o dominios custom

---

## 3. Modelo de pagos detallado (booth rental USA)

### Los tres flujos de dinero

**Flujo 1: Cliente final → Barbero (depósito o pago completo)**
```
Cliente reserva con Carlos → paga depósito $10
   ↓
Stripe procesa el pago via Stripe Connect Express
   ↓
Dinero va a la cuenta Stripe de Carlos directamente
   (NO pasa por el dueño, NO pasa por ti)
   ↓
Stripe hace payout automático a banco de Carlos
```

El SaaS puede tomar una `application_fee_amount` opcional (ej: $0.50 por transacción para cubrir Stripe fees). Recomendación: **no tomarla**, monetizar solo vía suscripción mensual. Hace el sales pitch más limpio.

**Flujo 2: Tú (Infinity Pro Barber) → Dueño de barbería**
```
Dueño se suscribe al plan (Studio, Pro, Business)
   ↓
Stripe Subscription mensual: $79-249
   ↓
Dinero va a tu cuenta Infinity Pro AI
```

**Flujo 3: Dueño → Barbero (booth rental)**
```
Configuración: "Carlos paga $200/semana cada lunes"
   ↓
Sistema crea Stripe Subscription o Invoice
   ↓
Cobro automático del método de pago de Carlos
   ↓
Dinero va al banco/Stripe del dueño
```

Este último flujo es **una feature premium vendible** — los dueños persiguen cobros de renta semanalmente y odian hacerlo. Cobrarles $20/mes extra solo por esto, lo pagan sin pestañear.

### Onboarding del barbero a Stripe Connect Express

1. Dueño da de alta a Carlos en el sistema
2. Carlos recibe SMS/email: "Conecta tu cuenta para recibir pagos"
3. Carlos hace tap → flujo Stripe Express (5 min): nombre legal, SSN/ITIN, cuenta bancaria
4. Stripe verifica → Carlos puede recibir pagos
5. Si Carlos no completa el onboarding: el sistema permite reservas SIN depósito (modo legacy, cobro 100% en local)

**Importante:** Stripe Connect Express en USA permite contractors con SSN o ITIN. Un barbero hispano sin SSN pero con ITIN puede operar. Esto es ventaja vs competidores que asumen SSN.

### Pricing por barbero (no por barbería)

```
Catálogo base (definido por dueño):
  - Corte clásico: 30 min, precio sugerido $25
  - Fade: 30 min, precio sugerido $30
  - Corte + barba: 45 min, precio sugerido $40
  - Diseño: 60 min, precio sugerido $50

Override de Carlos (junior):
  - Corte clásico: $20
  - Fade: $25

Override de José (senior, 15 años exp):
  - Corte clásico: $35
  - Fade: $45
  - Servicio propio: "Estilo barba premium con toalla caliente": $60
```

El cliente ve el precio del barbero que selecciona. Si compara entre barberos, ve la diferencia y entiende que está pagando por experiencia.

### Reportes con privacidad financiera

| Lo que ve el dueño | Lo que ve el barbero |
|--------------------|----------------------|
| # de citas por barbero | Sus ingresos brutos |
| Tasa de ocupación | Sus payouts a banco |
| Hora pico | Sus propinas |
| Retención de clientes | Su renta pendiente al dueño |
| Servicios más populares | Sus clientes con frecuencia |
| Renta cobrada/pendiente | Su rating individual |
| **NO ve:** ingresos exactos de cada barbero | |

Esto respeta la cultura del booth rental: el barbero es independiente, su negocio es suyo.

---

## 4. Bilingüismo nativo (español neutro + inglés)

### Arquitectura i18n

- **Librería:** `next-intl` (compatible con App Router, soporta server components)
- **Estructura:** `messages/es.json` y `messages/en.json` con namespaces (booking, dashboard, emails, sms, whatsapp)
- **Detección inicial:** `Accept-Language` header al primer request
- **Override manual:** toggle visible en header siempre, también en flujo de booking
- **Persistencia:** cookie + en perfil del cliente si se registra
- **Mensajes salientes:** se usa `client.preferred_locale`, no la sesión actual

### Glosario de español neutro

| ❌ Evitar (regional) | ✅ Usar (neutro) |
|---------------------|------------------|
| Turno (Argentina) | Cita |
| Reservación (calco inglés) | Reserva, Cita, Agendar |
| Booking (anglicismo) | Reserva |
| Apuntarse | Agendar, Reservar |
| Coger cita (España, vulgar LATAM) | Agendar, Tomar cita |
| Cobrar el adelanto | Pagar el depósito, Pago inicial |
| Recortarse (Caribe) | Cortarse el cabello, Hacerse el corte |
| Pelarse (México) | Cortarse el cabello |
| Plata (Sudamérica) / Lana (México) | Dinero, Pago |
| El de la barbería | El barbero, Tu barbero |

Términos universales OK: corte, barbero, fade, barba, propina, cliente, hora, día, semana, descuento, gracias.

### Templates WhatsApp duales

Cada template debe enviarse a Meta en español Y en inglés. Son aprobaciones separadas (1-3 días cada una). Templates iniciales necesarios:

1. `appointment_confirmed_es` / `appointment_confirmed_en`
2. `appointment_reminder_24h_es` / `_en`
3. `appointment_reminder_2h_es` / `_en`
4. `review_request_es` / `_en`
5. `re_engagement_30d_es` / `_en`
6. `cancellation_confirmed_es` / `_en`
7. `barber_new_booking_es` / `_en` (al barbero)

Total: 14 templates iniciales en Meta. Empieza el proceso de aprobación temprano (semana 2 del proyecto).

### Detección de idioma del cliente

```
Caso 1: Cliente nuevo entra a reservar
  → Detecta navegador → muestra UI en idioma detectado
  → Toggle visible permite cambiar

Caso 2: Cliente reserva primera vez
  → Sistema guarda locale en client.preferred_locale
  → Todos los mensajes futuros en ese idioma

Caso 3: Cliente cambia preferencia
  → Toggle en su portal de cliente o respondiendo "ENGLISH" / "ESPAÑOL" al SMS
```

---

## 5. Features completas

### MVP (Fase 1 — para cliente NJ)

**Operación core:**
- Calendario público multi-barbero con disponibilidad real
- Selección barbero → servicio → fecha → hora → datos cliente
- Bloqueo de horarios por barbero (descansos, días libres)
- Servicios con duración variable (30, 45, 60 min)
- Catálogo base + override de precios por barbero
- Cancelación y reagendamiento por el cliente sin llamar
- Walk-ins / lista de espera con notificación cuando toque
- Cliente recurrente con preferencias guardadas (barbero favorito, corte usual, notas privadas del barbero)

**Pagos:**
- Stripe Connect Express onboarding por barbero
- Depósito opcional al reservar (configurable por barbero: $0, $5, $10, % del servicio)
- Política de no-show (depósito no se reembolsa si no se presenta)
- Pago completo en local sigue siendo válido

**Comunicaciones:**
- SMS: confirmación inmediata + recordatorio 24h + recordatorio 2h
- WhatsApp: review request post-visita + re-engagement 30 días
- Idioma según preferencia del cliente
- Notificación al barbero cuando entra reserva

**Portales:**
- Owner: dashboard, gestión barberos, configuración, reportes operativos
- Barber: calendario, clientes, ingresos, Stripe payouts, galería
- Client: opcional, con historial y repeat booking

### Fase 2 — Diferenciación competitiva

- **Booth rental automatizado** (cobro semanal/mensual al barbero, feature premium)
- Programa de lealtad por barbero (cada barbero gestiona su propio loyalty)
- Programa de referidos (descuento mutuo)
- Reportes avanzados (cohort retention, LTV cliente, analytics por servicio)
- Multi-sucursal para barberías que crecen
- Inventario de productos retail (gel, pomada, shampoo)
- Reviews internas + sync con Google Business Profile API
- Sync bidireccional con Google Calendar de cada barbero
- PWA instalable como app

### Fase 3 — Escala SaaS

- Onboarding self-service completo (la barbería se da de alta sola)
- Marketplace público (clientes descubren barberías cercanas)
- Agente de voz Stella-style para reservas por llamada
- White-label para distribuidores regionales
- API pública
- App móvil nativa (React Native)

---

## 6. Modelo de negocio

### Cobrar al cliente NJ (piloto)

- **Setup fee:** $1,800 - $2,500 (financia tu desarrollo)
- **Mensualidad año 1:** $49/mes (descuento caso de estudio, vs $99 normal)
- **Acuerdo:** uso público como caso de estudio + 2 testimoniales en video + permiso de visitas a otros prospects
- **Pago dividido:** 50% al firmar contrato, 50% al go-live
- **Setup incluye:** configuración inicial, alta de barberos, capacitación 2 sesiones, 14 templates WhatsApp, integración Stripe Connect

### Pricing para venta a otras barberías

| Plan | Precio mensual | Para quién | Incluye |
|------|----------------|------------|---------|
| **Solo** | $39/mes | Barbero independiente con su silla rentada | 1 barbero, calendario, SMS básico (200/mes), Stripe Connect |
| **Studio** | $79/mes | Barbería 2-3 sillas | Hasta 3 barberos, WhatsApp + SMS (500/mes), reportes operativos |
| **Pro** | $149/mes | Barbería establecida 4-8 barberos | Hasta 8 barberos, todo lo anterior, depósitos, booth rental automatizado |
| **Business** | $249/mes | Multi-sucursal o cadena | Multi-location, API, priority support, white-label opcional |
| **Setup fee** | $497 - $997 one-time | Todos los planes | Setup hecho por tu equipo en español |

**Add-ons:**
- SMS extra sobre incluidos: $0.02/msg
- WhatsApp Business API setup: $200 one-time (cubre el proceso con Meta)
- Agente de voz Stella: $50/mes
- Booth rental automatizado: $20/mes (incluido en Pro+)
- Custom domain: incluido en Pro+

### Estrategia de venta (Método Insider aplicado)

1. Caso de estudio del cliente NJ con métricas reales: ingresos antes/después, no-shows reducidos %, tiempo administrativo ahorrado por barbero, reviews Google ganadas
2. Visitas en persona a barberías hispanas: Hudson County, Bergen, Bronx, Queens, Paterson, Union City, Newark
3. Demo en su tablet con sus servicios pre-cargados (preview personalizado de 5 minutos)
4. Free trial 30 días + setup fee al inicio (no setup gratis — quien no paga no implementa)
5. Programa referidos: barbería que refiere otra recibe 1 mes gratis cuando la referida paga su segundo mes

---

## 7. Plan de ejecución por fases

### Fase 0 — Definición y Diseño (Semana 1-2)

- Reunión formal con cliente NJ, scope firmado, 50% setup cobrado
- Definición de marca del SaaS (nombre, logo, dominio)
- Wireframes de los 3 portales en Claude Design / Figma
- Diseño visual aprobado por cliente NJ
- Schema Supabase v1 con multi-tenancy + Stripe Connect fields
- 14 templates WhatsApp redactados en ES y EN, enviados a Meta para aprobación
- Setup proyecto Next.js + Supabase + Vercel + Stripe (Test mode)

### Fase 1 — MVP funcional (Semana 3-7)

- Auth con Supabase Auth (3 roles + RLS)
- i18n con next-intl, glosario español neutro implementado
- Stripe Connect Express onboarding flow (barbero conecta cuenta)
- Booking flow del cliente (la vista más crítica, polish extra)
- Portal del barbero con calendario y vista de ingresos
- Portal del dueño con configuración y reportes operativos
- Integración Twilio (SMS) y WhatsApp Business
- Workflows n8n para mensajes automáticos
- Stripe Subscriptions para tu cobro mensual al dueño
- Tests con Stripe en modo Test extensivos

### Fase 2 — Lanzamiento con piloto (Semana 8-10)

- Migración a Stripe Live mode
- Carga de datos del cliente NJ (barberos, servicios, horarios)
- Onboarding de cada barbero a Stripe Connect (sesión presencial)
- Import de clientes históricos (CSV)
- Capacitación dueño + barberos
- Soft launch con clientes habituales primero
- Monitoreo intensivo + iteración rápida

### Fase 3 — Empaquetado SaaS (Semana 11-14)

- Onboarding self-service para nuevas barberías
- Página de marketing dedicada (dominio nuevo del SaaS)
- Booth rental automatizado (Fase 2 feature)
- Documentación + videos tutoriales en ES y EN
- Caso de estudio publicado del cliente NJ
- Materiales de venta: deck, one-pager, video demo de 90 segundos
- Stripe Subscriptions con plan tiers en producción

### Fase 4 — Adquisición (Mes 4+)

- Visitas en persona método Insider
- Anuncios Meta segmentados a dueños de barbería en NJ/NY
- Contenido en Instagram/TikTok mostrando el sistema en acción
- Programa de afiliados con barberos influencers latinos

---

## 8. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Cliente piloto cambia scope a mitad | Media | Alto | Contrato detallado, pago dividido 50/50 |
| Barbero no completa Stripe onboarding | Media | Medio | Sistema funciona sin Stripe = solo agendamiento |
| Stripe rechaza barbero (ITIN issues) | Baja | Medio | Documentación clara, fallback a cobro local |
| Costos SMS/WhatsApp se disparan | Baja | Medio | Pasar costo a barbería + límites incluidos |
| Booksy/Square copian ángulo hispano | Baja | Bajo | Tu ventaja es servicio + idioma + relación, no software |
| Bug crítico en hora pico | Media | Alto | Staging env, Sentry, backups Supabase, runbook |
| No-shows altos sin depósitos | Media | Alto | Stripe Connect activo desde day 1 |
| Cliente quiere features fuera de scope | Alta | Medio | Lista "futuro" documentada, "sí pero costo extra" |
| Templates WhatsApp tardan en aprobar | Alta | Medio | Empezar proceso semana 1, fallback a SMS |
| Traducción al inglés con errores culturales | Media | Bajo | Native English speaker review previo a launch |

---

## 9. Próximos pasos inmediatos

**Esta semana:**

1. **Reunión formal con cliente NJ** — scope firmado, primer 50% cobrado
2. **Definir marca del SaaS** — nombre, dominio, posicionamiento (no es lo mismo "Infinity Pro Barber" que un nombre dedicado tipo "BarberSOS", "Sillón", "BarberFlow")
3. **Schema Supabase v1** con todas las tablas incluyendo Stripe Connect y locales
4. **Redactar los 14 templates WhatsApp** en ES y EN, enviar a Meta (aprobación toma 1-3 días cada uno, no esperes)

**Semana 2:**

5. **Wireframes en Claude Design** vista por vista, empezando por booking flow del cliente (es la más crítica del MVP)
6. **Aprobación visual del cliente NJ** antes de tocar código
7. **Setup repos:** Next.js + Supabase + Stripe + i18n configurado

**Decisiones que necesitan tu input:**
- Nombre del producto SaaS (define dominio y branding)
- ¿`application_fee` en Stripe Connect = 0% o 1-2%? (Recomendación: 0%)
- ¿Booth rental automatizado en MVP o Fase 2? (Recomendación: Fase 2, pero schema preparado)
- ¿Cliente NJ paga $1,800 o $2,500 de setup? Define en función de cuánto custom branding hay

---

*Documento vivo. Actualizar según evolucione el proyecto.*
*v2 — Modelo booth rental + bilingüismo nativo integrados*
