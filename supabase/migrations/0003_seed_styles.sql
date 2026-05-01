-- 0003_seed_styles.sql — Seed data for pilot tenant: Styles Barbershop 2
-- Newark, NJ · Owner: client signed and approved.

insert into public.tenants (id, slug, name, custom_domain, plan, locale_default, branding, settings)
values (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'styles-barbershop-2',
  'Styles Barbershop 2',
  'stylesbarbershop2.com',
  'pro',
  'es',
  '{"theme":"black_gold","logoUrl":"/styles-logo.png"}'::jsonb,
  '{
    "address": "49 Warwick St, Newark, NJ 07105",
    "phone": "(973) 555-0142",
    "hours": {
      "Mon": "10:00 AM – 8:00 PM",
      "Tue": "10:00 AM – 8:00 PM",
      "Wed": "10:00 AM – 8:00 PM",
      "Thu": "10:00 AM – 8:00 PM",
      "Fri": "10:00 AM – 9:00 PM",
      "Sat": "9:00 AM – 9:00 PM",
      "Sun": "10:00 AM – 5:00 PM"
    },
    "depositPercent": 25,
    "whatsappEnabled": true,
    "smsEnabled": true,
    "boothRentalEnabled": true,
    "rating": 4.9,
    "reviewsCount": 287
  }'::jsonb
);

-- ── Services catalog
insert into public.services_catalog (tenant_id, slug, name_es, name_en, description_es, description_en, duration_min, base_price_cents, sort_order) values
  ('11111111-1111-1111-1111-111111111111', 'corte',          'Corte clásico',     'Classic cut',       'Corte tradicional con tijera y máquina',           'Traditional cut with scissors and clippers',         30, 2500, 1),
  ('11111111-1111-1111-1111-111111111111', 'fade',           'Fade',              'Fade',              'Degradado limpio (low, mid o high fade)',          'Clean fade (low, mid, or high)',                     30, 3000, 2),
  ('11111111-1111-1111-1111-111111111111', 'corte-barba',    'Corte + Barba',     'Cut + Beard',       'Corte completo más arreglo de barba',              'Full cut plus beard trim',                           45, 4000, 3),
  ('11111111-1111-1111-1111-111111111111', 'diseno',         'Diseño / Líneas',   'Design / Lines',    'Corte con diseño personalizado',                   'Cut with custom design',                             60, 5000, 4),
  ('11111111-1111-1111-1111-111111111111', 'barba-premium',  'Barba premium',     'Premium beard',     'Arreglo de barba con toalla caliente y aceites',   'Hot towel beard with oils',                          30, 2500, 5),
  ('11111111-1111-1111-1111-111111111111', 'kids',           'Corte niño',        'Kids cut',          'Corte para menores de 12 años',                    'Cut for under-12 kids',                              30, 2000, 6);

-- ── Barbers (4)
insert into public.barbers (id, tenant_id, slug, full_name, alias, role_label, bio, color_hex, instagram, rating, reviews_count, booth_rent_amount_cents, booth_rent_period) values
  ('a0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'jose',    'José Ramírez',   'El Maestro', 'Senior · 15 años', 'Especialista en fades clásicos, diseños y barba con toalla caliente.', '#C9A961', '@jose_thecuts',     4.95, 124, 25000, 'weekly'),
  ('a0000001-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'carlos',  'Carlos Mendoza', 'Carlito',    'Senior · 8 años',  'Cortes modernos, diseños creativos y enchape perfecto.',                '#8B6F47', '@carlito_barber',   4.88,  89, 20000, 'weekly'),
  ('a0000001-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'miguel',  'Miguel Santos',  'Miguelito',  'Mid · 4 años',     'Especialista en cortes infantiles y kids cuts.',                        '#5D4E37', '@miguel_styles',    4.82,  56, 18000, 'weekly'),
  ('a0000001-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'luis',    'Luis Pérez',     'Junior',     'Junior · 2 años',  'Fades, líneas limpias y precios accesibles.',                           '#A0826D', '@luis_thebarber',   4.75,  32, 15000, 'weekly');

-- ── Pricing overrides per barber
-- José (senior): premium prices
insert into public.barber_services (barber_id, service_id, price_cents, duration_min)
select 'a0000001-0000-0000-0000-000000000001', s.id,
  case s.slug when 'corte' then 3500 when 'fade' then 4500 when 'corte-barba' then 5500 when 'diseno' then 6500 when 'barba-premium' then 3500 else s.base_price_cents end,
  s.duration_min
from public.services_catalog s where s.tenant_id = '11111111-1111-1111-1111-111111111111' and s.slug != 'kids';

-- Carlos
insert into public.barber_services (barber_id, service_id, price_cents, duration_min)
select 'a0000001-0000-0000-0000-000000000002', s.id,
  case s.slug when 'corte' then 3000 when 'fade' then 3500 when 'corte-barba' then 4500 when 'diseno' then 5500 when 'barba-premium' then 3000 else s.base_price_cents end,
  s.duration_min
from public.services_catalog s where s.tenant_id = '11111111-1111-1111-1111-111111111111' and s.slug != 'kids';

-- Miguel (kids specialist)
insert into public.barber_services (barber_id, service_id, price_cents, duration_min)
select 'a0000001-0000-0000-0000-000000000003', s.id,
  case s.slug when 'corte' then 2500 when 'fade' then 3000 when 'corte-barba' then 4000 when 'diseno' then 5000 when 'kids' then 2000 when 'barba-premium' then 2500 else s.base_price_cents end,
  s.duration_min
from public.services_catalog s where s.tenant_id = '11111111-1111-1111-1111-111111111111';

-- Luis (junior, accessible prices, no barba premium)
insert into public.barber_services (barber_id, service_id, price_cents, duration_min)
select 'a0000001-0000-0000-0000-000000000004', s.id,
  case s.slug when 'corte' then 2000 when 'fade' then 2500 when 'corte-barba' then 3500 when 'diseno' then 4500 when 'kids' then 1800 else s.base_price_cents end,
  s.duration_min
from public.services_catalog s where s.tenant_id = '11111111-1111-1111-1111-111111111111' and s.slug != 'barba-premium';

-- ── Sample reviews
insert into public.reviews (tenant_id, barber_id, rating, text, author_name, created_at) values
  ('11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000001', 5, 'José es un maestro. El fade quedó perfecto y la barba con la toalla caliente es otro nivel. 100% recomendado.', 'Roberto N.', now() - interval '2 days'),
  ('11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000001', 5, 'Llevo 3 años yendo. Siempre puntual, siempre limpio. El mejor de Newark.', 'Andrés V.', now() - interval '5 days'),
  ('11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000002', 5, 'Carlito hizo un diseño en la nuca brutal. Muy creativo y trabaja rápido.', 'Eduardo R.', now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000003', 5, 'Llevo a mi hijo con Miguel. Tiene paciencia y los niños lo aman.', 'Sebastián M.', now() - interval '3 days'),
  ('11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000004', 5, 'Luis está empezando pero tiene mano. Buen precio, buen corte.', 'Iván F.', now() - interval '7 days');
