# Stylos Barbershop 2 — Website

Landing page premium independiente para **Stylos Barbershop 2** (49 Warwick St, Newark, NJ).

Sub-proyecto separado del SaaS `getbarber.app`. Pensado para deployarse a su propio dominio: `stylosbarbershop2.com`.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** con tema `black & gold`
- **framer-motion** para animaciones premium
- **lucide-react** para iconos
- Tipografías: **Cormorant Garamond** (display) + **Inter** (body)

## Setup

```bash
cd website
npm install
npm run dev
```

Abre http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Estructura

```
website/
├── app/
│   ├── layout.tsx       # fuentes, metadata, SEO
│   ├── page.tsx         # landing principal
│   └── globals.css      # tema, utilidades, scrollbar
├── components/
│   ├── Navbar.tsx       # nav sticky con blur on scroll
│   ├── Hero.tsx         # hero + tarjeta de horarios
│   ├── TrustBar.tsx     # iconos de confianza
│   ├── Services.tsx     # grid de servicios
│   ├── Barbers.tsx      # equipo (4 barberos)
│   ├── Gallery.tsx      # galería bento
│   ├── Reviews.tsx      # testimonios
│   ├── Booking.tsx      # form que abre WhatsApp prellenado
│   ├── Contact.tsx      # mapa estilizado + horarios
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── SectionHeader.tsx
└── lib/
    ├── shop.ts          # datos del negocio (single source of truth)
    └── cn.ts            # helper clsx + tailwind-merge
```

## Personalización

Toda la data del negocio vive en `lib/shop.ts`:

- `SHOP` — nombre, dirección, teléfono, horarios, ratings
- `BARBERS` — equipo (4)
- `SERVICES` — menú de servicios y precios
- `REVIEWS` — testimonios destacados

Cambia ahí y el sitio entero se actualiza.

## Deploy a Vercel

```bash
cd website
vercel
```

Luego configura el dominio custom (`stylosbarbershop2.com`) en el dashboard.

## Diferencias con el SaaS principal

Este sitio es **separado del SaaS `getbarber.app`**:

- ✅ Optimizado para SEO de un solo negocio
- ✅ Carga rapidísima (sin auth, sin Stripe, sin DB)
- ✅ Dominio propio del cliente
- ✅ El barbero puede contratar a cualquiera para tocarlo sin riesgo de tumbar el sistema

El botón "Reservar" abre WhatsApp con un mensaje prellenado. En una fase 2 puede integrarse vía API con el SaaS para reserva en línea real.
