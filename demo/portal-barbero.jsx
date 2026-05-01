// Portal del Barbero — Desktop view (José Ramírez perspective)

function PortalBarbero({ theme }) {
  const { BARBEROS, SERVICIOS, CITAS_HOY, RESENAS } = window.SBData;
  const barbero = BARBEROS.find(b => b.id === 'jose');
  const [tab, setTab] = React.useState('hoy');
  const [draggedCita, setDraggedCita] = React.useState(null);
  const [citas, setCitas] = React.useState(CITAS_HOY.filter(c => c.barbero === 'jose'));

  const isLight = theme.bg.startsWith('#f');

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: theme.bg, color: theme.text,
      fontFamily: theme.fontBody,
      WebkitFontSmoothing: 'antialiased',
      overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: theme.bgElev,
        borderRight: `1px solid ${theme.border}`,
        display: 'flex', flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{ padding: '20px 18px 18px', borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: '#000',
              border: `1px solid ${theme.primary}`, overflow: 'hidden',
            }}>
              <img src="assets/styles-logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, fontFamily: theme.fontDisplay }}>STYLES BS2</div>
              <div style={{ fontSize: 10, color: theme.textMuted }}>Portal Barbero</div>
            </div>
          </div>
        </div>

        <nav style={{ padding: 12, flex: 1 }}>
          {[
            { id: 'hoy', label: 'Hoy', icon: '📅' },
            { id: 'calendario', label: 'Calendario', icon: '🗓' },
            { id: 'clientes', label: 'Mis clientes', icon: '👥' },
            { id: 'ingresos', label: 'Ingresos', icon: '💰' },
            { id: 'galeria', label: 'Galería', icon: '✂' },
            { id: 'resenas', label: 'Reseñas', icon: '⭐' },
            { id: 'config', label: 'Mi perfil', icon: '⚙' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '10px 12px', marginBottom: 2,
              background: tab === t.id ? (isLight ? theme.surfaceLight : theme.surface) : 'transparent',
              color: tab === t.id ? theme.primary : theme.textMuted,
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13,
              fontWeight: tab === t.id ? 600 : 500,
              textAlign: 'left',
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        {/* User pill */}
        <div style={{ padding: 12, borderTop: `1px solid ${theme.border}` }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: 8, borderRadius: 10, background: theme.surface,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: `linear-gradient(135deg, ${barbero.color}, ${barbero.color}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 12,
            }}>{barbero.foto}</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{barbero.nombre}</div>
              <div style={{ fontSize: 10, color: theme.success, fontWeight: 600 }}>● Stripe activo</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {tab === 'hoy' && <TabHoy theme={theme} barbero={barbero} citas={citas} setCitas={setCitas} draggedCita={draggedCita} setDraggedCita={setDraggedCita} />}
        {tab === 'calendario' && <TabCalendario theme={theme} barbero={barbero} citas={citas} setCitas={setCitas} draggedCita={draggedCita} setDraggedCita={setDraggedCita} />}
        {tab === 'ingresos' && <TabIngresos theme={theme} barbero={barbero} />}
        {tab === 'galeria' && <TabGaleria theme={theme} barbero={barbero} />}
        {tab === 'resenas' && <TabResenas theme={theme} barbero={barbero} />}
        {tab === 'clientes' && <TabClientes theme={theme} citas={citas} />}
        {tab === 'config' && <TabConfig theme={theme} barbero={barbero} />}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// HOY — overview con métricas y agenda del día
// ─────────────────────────────────────────────────────────
function TabHoy({ theme, barbero, citas, setCitas, draggedCita, setDraggedCita }) {
  const { SERVICIOS } = window.SBData;
  const totalHoy = citas.reduce((sum, c) => {
    const s = SERVICIOS.find(srv => srv.id === c.servicio);
    return sum + (s?.precioBase || 0);
  }, 0);

  return (
    <div>
      <PageHeader theme={theme}
        title={`Hola, ${barbero.nombre.split(' ')[0]} 👋`}
        subtitle="Viernes, 1 de mayo · Buen día para cortar."
      />

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <StatCard theme={theme} label="Citas hoy" value={citas.length} sub={`${citas.filter(c => c.estado === 'en_curso').length} en curso`} accent={theme.primary} />
        <StatCard theme={theme} label="Ingresos hoy" value={`$${totalHoy}`} sub="+$320 vs ayer" accent={theme.success} />
        <StatCard theme={theme} label="Esta semana" value={`$${barbero.ingresosSemana}`} sub="6 días trabajados" />
        <StatCard theme={theme} label="Renta silla" value={`$${barbero.rentaSilla}`} sub={`Vence ${barbero.proxPago}`} warn />
      </div>

      {/* Agenda del día */}
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: theme.fontDisplay, fontSize: 22, fontWeight: 700, margin: 0 }}>Agenda de hoy</h2>
          <div style={{ fontSize: 12, color: theme.textMuted }}>Arrastra para reagendar</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {citas.map(c => (
            <CitaRow key={c.id} cita={c} theme={theme} onDragStart={() => setDraggedCita(c.id)} draggedCita={draggedCita} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CALENDARIO con drag-drop simulado
// ─────────────────────────────────────────────────────────
function TabCalendario({ theme, barbero, citas, setCitas, draggedCita, setDraggedCita }) {
  const horas = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div>
      <PageHeader theme={theme} title="Mi calendario" subtitle="Semana del 28 abr – 3 may · Drag & drop para reagendar" />

      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(6, 1fr)', borderBottom: `1px solid ${theme.border}` }}>
          <div></div>
          {dias.map((d, i) => (
            <div key={d} style={{
              padding: '12px 8px', borderLeft: `1px solid ${theme.border}`,
              textAlign: 'center', fontSize: 12,
              background: i === 4 ? `${theme.primary}15` : 'transparent',
            }}>
              <div style={{ fontSize: 10, color: theme.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>{d}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: i === 4 ? theme.primary : theme.text }}>{28 + i}</div>
            </div>
          ))}
        </div>

        {/* hour grid */}
        {horas.map((h, hi) => (
          <div key={h} style={{
            display: 'grid', gridTemplateColumns: '60px repeat(6, 1fr)',
            borderBottom: hi < horas.length - 1 ? `1px solid ${theme.border}` : 'none',
            minHeight: 56,
          }}>
            <div style={{ padding: 8, fontSize: 10, color: theme.textMuted, fontFamily: theme.fontMono, textAlign: 'right' }}>{h}</div>
            {dias.map((d, di) => {
              // Citas only on Friday (di=4) for demo
              const dayCitas = di === 4 ? citas.filter(c => parseInt(c.hora.split(':')[0]) === parseInt(h.split(':')[0])) : [];
              return (
                <div key={di} style={{
                  borderLeft: `1px solid ${theme.border}`,
                  padding: 4, position: 'relative',
                  background: di === 4 ? `${theme.primary}06` : 'transparent',
                }}>
                  {dayCitas.map(c => <CitaCard key={c.id} cita={c} theme={theme} compact />)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function CitaRow({ cita, theme, onDragStart }) {
  const { SERVICIOS, BARBEROS } = window.SBData;
  const servicio = SERVICIOS.find(s => s.id === cita.servicio);
  const estados = {
    confirmada: { bg: `${theme.primary}15`, color: theme.primary, label: 'Confirmada' },
    en_curso: { bg: `${theme.success}20`, color: theme.success, label: '● En curso' },
    libre: { bg: 'transparent', color: theme.textMuted, label: 'Disponible' },
  };
  const e = estados[cita.estado];

  return (
    <div draggable onDragStart={onDragStart} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: 12, borderRadius: 10,
      background: cita.estado === 'libre' ? 'transparent' : theme.bg,
      border: `1px solid ${cita.estado === 'libre' ? `${theme.border}` : theme.border}`,
      borderLeft: `3px solid ${cita.estado === 'libre' ? theme.borderStrong : theme.primary}`,
      cursor: 'grab',
      opacity: cita.estado === 'libre' ? 0.6 : 1,
    }}>
      <div style={{
        fontFamily: theme.fontMono, fontSize: 14, fontWeight: 700,
        width: 56, color: theme.text,
      }}>{cita.hora}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{cita.cliente}</div>
        <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>
          {servicio?.nombre} · {servicio?.duracion} min · ${servicio?.precioBase}
        </div>
      </div>
      {cita.deposito > 0 && (
        <div style={{
          fontSize: 10, padding: '4px 8px', borderRadius: 100,
          background: `${theme.primary}12`, color: theme.primary, fontWeight: 600,
        }}>${cita.deposito} dep.</div>
      )}
      <div style={{
        fontSize: 10, fontWeight: 600, padding: '4px 10px',
        borderRadius: 100, background: e.bg, color: e.color,
      }}>{e.label}</div>
      <div style={{ color: theme.textDim, fontSize: 16, cursor: 'grab' }}>⋮⋮</div>
    </div>
  );
}

function CitaCard({ cita, theme, compact }) {
  const { SERVICIOS } = window.SBData;
  const servicio = SERVICIOS.find(s => s.id === cita.servicio);
  if (cita.estado === 'libre') return null;
  return (
    <div draggable style={{
      background: theme.primary, color: theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a',
      borderRadius: 6, padding: '4px 6px', fontSize: 10, cursor: 'grab',
      fontWeight: 600, lineHeight: 1.2,
      boxShadow: '0 1px 3px rgba(0,0,0,.15)',
    }}>
      <div style={{ fontWeight: 700, fontSize: 10 }}>{cita.cliente}</div>
      <div style={{ fontSize: 9, opacity: 0.85 }}>{servicio?.nombre}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// INGRESOS — Stripe Connect view
// ─────────────────────────────────────────────────────────
function TabIngresos({ theme, barbero }) {
  return (
    <div>
      <PageHeader theme={theme} title="Mis ingresos" subtitle="Stripe Connect Express · Payouts directos a tu banco" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          borderRadius: 16, padding: 24,
          color: theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 11, letterSpacing: 1, opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Disponible para payout</div>
          <div style={{ fontSize: 44, fontWeight: 800, fontFamily: theme.fontDisplay, marginTop: 4, letterSpacing: '-0.02em' }}>$1,840.00</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Próximo payout: <strong>Lun 4 May</strong> · ●●●● 4521</div>
          <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 10, padding: '6px 10px', background: 'rgba(0,0,0,.2)', borderRadius: 100, fontWeight: 700 }}>STRIPE CONNECT</div>
          <button style={{
            marginTop: 16, padding: '10px 16px',
            background: 'rgba(0,0,0,.85)', color: theme.primary,
            border: 'none', borderRadius: 8, cursor: 'pointer',
            fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
          }}>Adelantar payout →</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MiniCard theme={theme} label="Esta semana" value="$1,840" trend="+12%" />
          <MiniCard theme={theme} label="Mes actual" value="$6,420" trend="+8%" />
          <MiniCard theme={theme} label="Propinas (mes)" value="$487" trend="+18%" />
        </div>
      </div>

      {/* Movimientos */}
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontFamily: theme.fontDisplay, fontSize: 20, fontWeight: 700, margin: 0 }}>Movimientos recientes</h2>
          <div style={{ fontSize: 11, color: theme.primary, fontWeight: 600, cursor: 'pointer' }}>Ver todo →</div>
        </div>
        {[
          { label: 'Cita Roberto Núñez · Corte+Barba', amount: 55, type: 'in', time: 'Hace 2h', dep: true },
          { label: 'Propina · Andrés Vega', amount: 8, type: 'in', time: 'Hace 4h', tip: true },
          { label: 'Cita Andrés Vega · Fade', amount: 45, type: 'in', time: 'Hace 4h', dep: true },
          { label: 'Renta silla · Semana 17', amount: 250, type: 'out', time: 'Lun 28 abr' },
          { label: 'Payout a Chase ●●●● 4521', amount: 1620, type: 'payout', time: 'Lun 28 abr' },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0', borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: m.type === 'in' ? `${theme.success}20` : m.type === 'payout' ? `${theme.primary}20` : `${theme.danger}15`,
              color: m.type === 'in' ? theme.success : m.type === 'payout' ? theme.primary : theme.danger,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 14,
            }}>{m.type === 'in' ? '↓' : m.type === 'payout' ? '🏦' : '↑'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>
                {m.time}
                {m.dep && <span style={{ marginLeft: 8, color: theme.primary, fontWeight: 600 }}>· vía Stripe</span>}
                {m.tip && <span style={{ marginLeft: 8, color: theme.success, fontWeight: 600 }}>· propina</span>}
              </div>
            </div>
            <div style={{
              fontFamily: theme.fontMono, fontSize: 14, fontWeight: 700,
              color: m.type === 'in' ? theme.success : m.type === 'payout' ? theme.primary : theme.danger,
            }}>{m.type === 'out' || m.type === 'payout' ? '−' : '+'}${m.amount}.00</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// GALERÍA
// ─────────────────────────────────────────────────────────
function TabGaleria({ theme, barbero }) {
  const isLight = theme.bg.startsWith('#f');
  return (
    <div>
      <PageHeader theme={theme} title="Mi galería" subtitle="Sube fotos de tus mejores cortes · Visibles en tu perfil público" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {Array.from({length: 12}).map((_, i) => (
          <div key={i} style={{
            aspectRatio: '1', borderRadius: 10, overflow: 'hidden',
            background: `linear-gradient(135deg, hsl(${i*37 + 20}, 25%, ${isLight ? 70 : 25}%), hsl(${i*37}, 25%, ${isLight ? 60 : 15}%))`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', cursor: 'pointer',
            border: `1px solid ${theme.border}`,
          }}>
            <span style={{ fontSize: 36, color: theme.primary, opacity: 0.4 }}>✂</span>
            {i === 0 && (
              <div style={{
                position: 'absolute', top: 8, right: 8,
                fontSize: 9, padding: '3px 7px', borderRadius: 100,
                background: theme.primary, color: '#0a0a0a', fontWeight: 700,
              }}>DESTACADA</div>
            )}
          </div>
        ))}
        <button style={{
          aspectRatio: '1', borderRadius: 10,
          background: 'transparent', color: theme.textMuted,
          border: `2px dashed ${theme.border}`, cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          fontFamily: 'inherit', fontSize: 11,
        }}>
          <span style={{ fontSize: 28 }}>+</span>
          Subir foto
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// RESEÑAS
// ─────────────────────────────────────────────────────────
function TabResenas({ theme, barbero }) {
  const { RESENAS } = window.SBData;
  const mias = RESENAS.filter(r => r.barbero === 'jose');
  const todas = [
    ...mias,
    { autor: 'Pedro Cruz', barbero: 'jose', rating: 5, fecha: 'hace 1 semana', texto: 'El mejor barbero de Newark, sin duda. Siempre puntual.' },
    { autor: 'Diego M.', barbero: 'jose', rating: 5, fecha: 'hace 2 semanas', texto: 'Atención impecable. La toalla caliente es lo máximo.' },
    { autor: 'Manuel L.', barbero: 'jose', rating: 4, fecha: 'hace 3 semanas', texto: 'Buen corte, esperé un poquito pero valió la pena.' },
  ];
  return (
    <div>
      <PageHeader theme={theme} title="Mis reseñas" subtitle={`${barbero.rating} ★ promedio · ${barbero.reviews} reseñas totales`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 24 }}>
        {[5,4,3,2,1].map(s => {
          const pct = s === 5 ? 88 : s === 4 ? 9 : s === 3 ? 2 : 1;
          return (
            <div key={s} style={{
              padding: 14, background: theme.surface,
              border: `1px solid ${theme.border}`, borderRadius: 10,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, color: theme.textMuted }}>{s} estrella{s>1?'s':''}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: theme.primary, fontFamily: theme.fontMono, margin: '4px 0' }}>{pct}%</div>
              <div style={{ height: 4, background: theme.border, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: theme.primary }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {todas.map((r, i) => (
          <div key={i} style={{
            padding: 18, background: theme.surface,
            border: `1px solid ${theme.border}`, borderRadius: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{r.autor}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{r.fecha}</div>
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= r.rating ? theme.primary : 'transparent'} stroke={theme.primary} strokeWidth="1.5">
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z"/>
                  </svg>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>"{r.texto}"</div>
            {i < 2 && (
              <button style={{
                marginTop: 10, padding: '6px 12px', fontSize: 11, fontWeight: 600,
                background: 'transparent', color: theme.primary,
                border: `1px solid ${theme.primary}`, borderRadius: 6,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>Responder</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TabClientes({ theme, citas }) {
  const clientes = [
    { nombre: 'Roberto Núñez', visitas: 24, ult: '2 días', fav: 'Corte + Barba', notas: 'Fade bajo · le gusta poco arriba' },
    { nombre: 'Andrés Vega', visitas: 18, ult: '5 días', fav: 'Fade', notas: 'Mid fade siempre · cuidado con las patillas' },
    { nombre: 'Manuel López', visitas: 12, ult: '1 sem', fav: 'Diseño', notas: 'Diseño en la nuca cada visita' },
    { nombre: 'Pedro Cruz', visitas: 9, ult: '2 sem', fav: 'Corte clásico', notas: '' },
    { nombre: 'Diego Morales', visitas: 7, ult: '3 sem', fav: 'Corte + Barba', notas: 'Alérgico al after-shave normal' },
  ];
  return (
    <div>
      <PageHeader theme={theme} title="Mis clientes" subtitle="Tu CRM personal · Notas privadas, historial, preferencias" />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr 2fr',
          padding: '12px 18px', borderBottom: `1px solid ${theme.border}`,
          fontSize: 10, color: theme.textMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          <div>Cliente</div><div>Visitas</div><div>Última</div><div>Servicio fav</div><div>Notas privadas</div>
        </div>
        {clientes.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr 2fr',
            padding: '14px 18px', borderBottom: i < clientes.length - 1 ? `1px solid ${theme.border}` : 'none',
            fontSize: 13, alignItems: 'center',
          }}>
            <div style={{ fontWeight: 600 }}>{c.nombre}</div>
            <div style={{ fontFamily: theme.fontMono, color: theme.primary, fontWeight: 600 }}>{c.visitas}</div>
            <div style={{ color: theme.textMuted }}>hace {c.ult}</div>
            <div style={{ color: theme.textMuted }}>{c.fav}</div>
            <div style={{ color: theme.textMuted, fontStyle: c.notas ? 'italic' : 'normal', fontSize: 12 }}>
              {c.notas || <span style={{ opacity: 0.4 }}>—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabConfig({ theme, barbero }) {
  return (
    <div>
      <PageHeader theme={theme} title="Mi perfil" subtitle="Configura tus servicios, precios, horarios" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 12, padding: 20,
        }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: '0 0 14px' }}>Información pública</h3>
          <Field2 theme={theme} label="Nombre" value={barbero.nombre} />
          <Field2 theme={theme} label="Alias" value={barbero.alias} />
          <Field2 theme={theme} label="Bio" value={barbero.bio} />
          <Field2 theme={theme} label="Instagram" value={barbero.instagram} />
        </div>

        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 12, padding: 20,
        }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: '0 0 14px' }}>Mis precios</h3>
          {[
            ['Corte clásico', 35, 25],
            ['Fade', 45, 30],
            ['Corte + Barba', 55, 40],
            ['Diseño / Líneas', 65, 50],
            ['Barba premium', 35, 25],
          ].map(([n, p, base], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{n}</div>
                <div style={{ fontSize: 10, color: theme.textMuted }}>Base: ${base}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: theme.fontMono, fontSize: 14, color: theme.primary, fontWeight: 700 }}>${p}</span>
                <button style={{
                  fontSize: 11, padding: '4px 10px',
                  background: 'transparent', color: theme.textMuted,
                  border: `1px solid ${theme.border}`, borderRadius: 6,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────
function PageHeader({ theme, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontFamily: theme.fontDisplay, fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{title}</h1>
      {subtitle && <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

function StatCard({ theme, label, value, sub, accent, warn }) {
  return (
    <div style={{
      padding: 18, background: theme.surface,
      border: `1px solid ${warn ? theme.danger : theme.border}`, borderRadius: 12,
      borderTop: `3px solid ${accent || theme.primary}`,
    }}>
      <div style={{ fontSize: 10, color: theme.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 28, fontFamily: theme.fontDisplay, fontWeight: 800, marginTop: 6, color: accent || theme.text, letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontSize: 11, color: warn ? theme.danger : theme.textMuted, marginTop: 4, fontWeight: warn ? 600 : 400 }}>{sub}</div>
    </div>
  );
}

function MiniCard({ theme, label, value, trend }) {
  return (
    <div style={{
      padding: 14, background: theme.surface,
      border: `1px solid ${theme.border}`, borderRadius: 12,
      flex: 1,
    }}>
      <div style={{ fontSize: 10, color: theme.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 800, fontFamily: theme.fontDisplay }}>{value}</div>
        <div style={{ fontSize: 11, color: theme.success, fontWeight: 600 }}>{trend}</div>
      </div>
    </div>
  );
}

function Field2({ theme, label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      <input defaultValue={value} style={{
        width: '100%', padding: '10px 12px', boxSizing: 'border-box',
        background: theme.bg, color: theme.text,
        border: `1px solid ${theme.border}`, borderRadius: 8,
        fontSize: 13, fontFamily: 'inherit', outline: 'none',
      }} />
    </div>
  );
}

window.PortalBarbero = PortalBarbero;
