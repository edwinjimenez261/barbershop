// Portal del Dueño — Desktop view (vista global del negocio)

function PortalDueno({ theme }) {
  const { BARBEROS, SHOP } = window.SBData;
  const [tab, setTab] = React.useState('dashboard');
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
        width: 230, background: theme.bgElev,
        borderRight: `1px solid ${theme.border}`,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        <div style={{ padding: '20px 18px 18px', borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: '#000',
              border: `1px solid ${theme.primary}`, overflow: 'hidden',
            }}>
              <img src="assets/styles-logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, fontFamily: theme.fontDisplay }}>STYLES BS2</div>
              <div style={{ fontSize: 10, color: theme.primary, fontWeight: 600 }}>Portal Dueño</div>
            </div>
          </div>
        </div>

        <nav style={{ padding: 12, flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'calendario', label: 'Calendario global', icon: '🗓' },
            { id: 'barberos', label: 'Barberos', icon: '✂' },
            { id: 'rentas', label: 'Renta de sillas', icon: '💼', badge: '2' },
            { id: 'servicios', label: 'Catálogo servicios', icon: '📋' },
            { id: 'clientes', label: 'Clientes', icon: '👥' },
            { id: 'mensajes', label: 'Templates SMS/WA', icon: '💬' },
            { id: 'config', label: 'Configuración', icon: '⚙' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '10px 12px', marginBottom: 2,
              background: tab === t.id ? (isLight ? theme.surfaceLight : theme.surface) : 'transparent',
              color: tab === t.id ? theme.primary : theme.textMuted,
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13,
              fontWeight: tab === t.id ? 600 : 500, textAlign: 'left',
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              <span style={{ flex: 1 }}>{t.label}</span>
              {t.badge && <span style={{
                fontSize: 10, padding: '2px 7px', borderRadius: 100,
                background: theme.danger, color: '#fff', fontWeight: 700,
              }}>{t.badge}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: 12, borderTop: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 10, background: theme.surface }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0a0a0a', fontWeight: 700, fontSize: 12,
            }}>JS</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Juan Soto</div>
              <div style={{ fontSize: 10, color: theme.textMuted }}>Owner</div>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {tab === 'dashboard' && <DashHome theme={theme} />}
        {tab === 'rentas' && <DashRentas theme={theme} />}
        {tab === 'barberos' && <DashBarberos theme={theme} />}
        {tab === 'calendario' && <DashCalendario theme={theme} />}
        {tab === 'servicios' && <DashServicios theme={theme} />}
        {tab === 'clientes' && <DashClientes theme={theme} />}
        {tab === 'mensajes' && <DashMensajes theme={theme} />}
        {tab === 'config' && <DashConfig theme={theme} />}
      </main>
    </div>
  );
}

function DashHome({ theme }) {
  const { BARBEROS } = window.SBData;
  return (
    <div>
      <DPageHeader theme={theme} title="Dashboard" subtitle="Viernes, 1 de mayo de 2026 · Vista general del negocio" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <DStat theme={theme} label="Citas hoy" value="22" sub="↑ 3 vs ayer" accent={theme.primary} />
        <DStat theme={theme} label="Ocupación" value="78%" sub="Hora pico: 5pm" />
        <DStat theme={theme} label="Renta cobrada" value="$680" sub="2 pendientes" warn />
        <DStat theme={theme} label="Reseñas mes" value="34 ★" sub="4.91 promedio" accent={theme.success} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 12, padding: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, fontWeight: 700, margin: 0 }}>Ocupación esta semana</h3>
            <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
              <Pill theme={theme} active>7 días</Pill>
              <Pill theme={theme}>30 días</Pill>
              <Pill theme={theme}>3 meses</Pill>
            </div>
          </div>
          <BarChart theme={theme} />
        </div>

        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 12, padding: 20,
        }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Hora pico</h3>
          <HeatMap theme={theme} />
        </div>
      </div>

      {/* Barbers stats */}
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, fontWeight: 700, margin: 0 }}>Rendimiento por barbero</h3>
          <div style={{ fontSize: 11, color: theme.textMuted, fontStyle: 'italic' }}>* Solo agregados — no ves dinero exacto de cada barbero</div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
          padding: '10px 14px', borderBottom: `1px solid ${theme.border}`,
          fontSize: 10, color: theme.textMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          <div>Barbero</div><div>Citas hoy</div><div>Esta semana</div><div>Ocupación</div><div>Rating</div><div>Renta silla</div>
        </div>
        {BARBEROS.map((b, i) => (
          <div key={b.id} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
            padding: '14px', borderBottom: i < BARBEROS.length - 1 ? `1px solid ${theme.border}` : 'none',
            fontSize: 13, alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `linear-gradient(135deg, ${b.color}, ${b.color}99)`,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 11,
              }}>{b.foto}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{b.nombre}</div>
                <div style={{ fontSize: 10, color: theme.textMuted }}>{b.rol}</div>
              </div>
            </div>
            <div style={{ fontFamily: theme.fontMono, color: theme.primary, fontWeight: 700 }}>{b.citasHoy}</div>
            <div style={{ fontFamily: theme.fontMono, fontWeight: 600 }}>{b.citasHoy * 5}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, height: 6, background: theme.border, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${60 + i*8}%`, height: '100%', background: theme.primary }} />
                </div>
                <div style={{ fontSize: 11, fontFamily: theme.fontMono }}>{60+i*8}%</div>
              </div>
            </div>
            <div style={{ fontSize: 12 }}>★ {b.rating}</div>
            <div>
              <span style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 100,
                background: i === 3 ? `${theme.danger}20` : `${theme.success}20`,
                color: i === 3 ? theme.danger : theme.success,
                fontWeight: 700,
              }}>${b.rentaSilla} {i === 3 ? 'pend.' : '✓'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// BOOTH RENTAL — feature estrella
function DashRentas({ theme }) {
  const { BARBEROS } = window.SBData;
  return (
    <div>
      <DPageHeader theme={theme}
        title="Renta de sillas"
        subtitle="Cobro automático de booth rental · El sistema cobra a cada barbero el día configurado"
      />

      <div style={{
        background: `linear-gradient(135deg, ${theme.primary}25, ${theme.primary}08)`,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 12, padding: 20, marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{ fontSize: 36 }}>⚡</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: theme.primary, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>Feature Premium</div>
          <h2 style={{ fontFamily: theme.fontDisplay, fontSize: 22, margin: '4px 0 6px', fontWeight: 700 }}>Olvídate de perseguir la renta</h2>
          <div style={{ fontSize: 13, color: theme.textMuted }}>El sistema cobra cada lunes automáticamente. Si falla la tarjeta, te avisa por WhatsApp.</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 30, fontFamily: theme.fontDisplay, fontWeight: 800, color: theme.primary }}>$780</div>
          <div style={{ fontSize: 11, color: theme.textMuted }}>Próximo cobro Lun 4 May</div>
        </div>
      </div>

      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 20px', borderBottom: `1px solid ${theme.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: 0, fontWeight: 700 }}>Configuración por barbero</h3>
          <button style={{
            padding: '8px 14px', background: theme.primary, color: '#0a0a0a',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
          }}>+ Asignar silla</button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr 0.8fr',
          padding: '12px 20px', borderBottom: `1px solid ${theme.border}`,
          fontSize: 10, color: theme.textMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          <div>Barbero</div><div>Renta</div><div>Frecuencia</div><div>Próximo cobro</div><div>Estado</div><div></div>
        </div>

        {BARBEROS.map((b, i) => {
          const estado = i === 3 ? 'pendiente' : 'activo';
          return (
            <div key={b.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr 0.8fr',
              padding: '14px 20px', borderBottom: i < BARBEROS.length - 1 ? `1px solid ${theme.border}` : 'none',
              fontSize: 13, alignItems: 'center',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${b.color}, ${b.color}99)`,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 11,
                }}>{b.foto}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{b.nombre}</div>
                  <div style={{ fontSize: 10, color: theme.textMuted }}>{b.rol.split('·')[0].trim()}</div>
                </div>
              </div>
              <div style={{ fontFamily: theme.fontMono, fontWeight: 700, color: theme.primary }}>${b.rentaSilla}</div>
              <div style={{ fontSize: 12 }}>Semanal</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{b.proxPago}</div>
              <div>
                {estado === 'activo' ? (
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: `${theme.success}20`, color: theme.success, fontWeight: 700 }}>● Activo</span>
                ) : (
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: `${theme.danger}20`, color: theme.danger, fontWeight: 700 }}>⚠ Pendiente</span>
                )}
              </div>
              <div>
                <button style={{
                  fontSize: 11, padding: '6px 10px',
                  background: 'transparent', color: theme.textMuted,
                  border: `1px solid ${theme.border}`, borderRadius: 6,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>Editar</button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 16, background: theme.surface,
        border: `1px solid ${theme.border}`, borderRadius: 12, padding: 20,
      }}>
        <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: '0 0 14px', fontWeight: 700 }}>Historial de cobros</h3>
        {[
          { barbero: 'José Ramírez', monto: 250, fecha: 'Lun 28 Abr', status: 'cobrado' },
          { barbero: 'Carlos Mendoza', monto: 200, fecha: 'Lun 28 Abr', status: 'cobrado' },
          { barbero: 'Miguel Santos', monto: 180, fecha: 'Lun 28 Abr', status: 'cobrado' },
          { barbero: 'Luis Pérez', monto: 150, fecha: 'Lun 28 Abr', status: 'reintentando' },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none',
            fontSize: 13,
          }}>
            <div>
              <div style={{ fontWeight: 600 }}>{m.barbero}</div>
              <div style={{ fontSize: 11, color: theme.textMuted }}>{m.fecha}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 100,
                background: m.status === 'cobrado' ? `${theme.success}20` : `${theme.danger}20`,
                color: m.status === 'cobrado' ? theme.success : theme.danger,
                fontWeight: 700,
              }}>
                {m.status === 'cobrado' ? '✓ Cobrado' : '↻ Reintentando'}
              </span>
              <span style={{ fontFamily: theme.fontMono, fontWeight: 700, fontSize: 14, color: theme.primary, minWidth: 50, textAlign: 'right' }}>${m.monto}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashBarberos({ theme }) {
  const { BARBEROS } = window.SBData;
  return (
    <div>
      <DPageHeader theme={theme} title="Barberos" subtitle={`${BARBEROS.length} barberos activos`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {BARBEROS.map(b => (
          <div key={b.id} style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: 12, padding: 20,
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${b.color}, ${b.color}99)`,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 18, fontFamily: theme.fontDisplay,
              }}>{b.foto}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{b.nombre}</div>
                <div style={{ fontSize: 11, color: theme.primary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{b.rol}</div>
              </div>
              <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 100, background: `${theme.success}20`, color: theme.success, fontWeight: 700 }}>● Stripe ✓</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <DBStat theme={theme} l="Citas hoy" v={b.citasHoy} />
              <DBStat theme={theme} l="Rating" v={`★ ${b.rating}`} />
              <DBStat theme={theme} l="Renta" v={`$${b.rentaSilla}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashCalendario({ theme }) {
  const { BARBEROS, CITAS_HOY, SERVICIOS } = window.SBData;
  const horas = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  return (
    <div>
      <DPageHeader theme={theme} title="Calendario global" subtitle="Vie 1 May · Todos los barberos" />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: `60px repeat(${BARBEROS.length}, 1fr)`,
          borderBottom: `1px solid ${theme.border}`,
        }}>
          <div></div>
          {BARBEROS.map(b => (
            <div key={b.id} style={{ padding: 12, borderLeft: `1px solid ${theme.border}`, textAlign: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', margin: '0 auto 4px',
                background: `linear-gradient(135deg, ${b.color}, ${b.color}99)`,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 11,
              }}>{b.foto}</div>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{b.nombre.split(' ')[0]}</div>
            </div>
          ))}
        </div>
        {horas.map((h, hi) => (
          <div key={h} style={{
            display: 'grid', gridTemplateColumns: `60px repeat(${BARBEROS.length}, 1fr)`,
            borderBottom: hi < horas.length - 1 ? `1px solid ${theme.border}` : 'none',
            minHeight: 60,
          }}>
            <div style={{ padding: 8, fontSize: 10, color: theme.textMuted, fontFamily: theme.fontMono, textAlign: 'right' }}>{h}</div>
            {BARBEROS.map(b => {
              const dayCitas = CITAS_HOY.filter(c => c.barbero === b.id && parseInt(c.hora.split(':')[0]) === parseInt(h.split(':')[0]) && c.estado !== 'libre');
              return (
                <div key={b.id} style={{ borderLeft: `1px solid ${theme.border}`, padding: 4 }}>
                  {dayCitas.map(c => {
                    const s = SERVICIOS.find(sv => sv.id === c.servicio);
                    return (
                      <div key={c.id} style={{
                        background: c.estado === 'en_curso' ? theme.success : b.color,
                        color: '#fff', borderRadius: 5, padding: '4px 6px',
                        fontSize: 10, fontWeight: 600, lineHeight: 1.2, marginBottom: 2,
                      }}>
                        <div style={{ fontWeight: 700 }}>{c.cliente}</div>
                        <div style={{ fontSize: 9, opacity: 0.85 }}>{s?.nombre}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashServicios({ theme }) {
  const { SERVICIOS } = window.SBData;
  return (
    <div>
      <DPageHeader theme={theme} title="Catálogo de servicios" subtitle="Servicios base · Cada barbero puede ajustar precios" />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 0.8fr',
          padding: '12px 18px', borderBottom: `1px solid ${theme.border}`,
          fontSize: 10, color: theme.textMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          <div>Servicio</div><div>Duración</div><div>Precio base</div><div>Descripción</div><div></div>
        </div>
        {SERVICIOS.map((s, i) => (
          <div key={s.id} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 0.8fr',
            padding: '14px 18px', borderBottom: i < SERVICIOS.length - 1 ? `1px solid ${theme.border}` : 'none',
            fontSize: 13, alignItems: 'center',
          }}>
            <div style={{ fontWeight: 600 }}>{s.nombre}</div>
            <div style={{ fontFamily: theme.fontMono }}>{s.duracion} min</div>
            <div style={{ fontFamily: theme.fontMono, fontWeight: 700, color: theme.primary }}>${s.precioBase}</div>
            <div style={{ color: theme.textMuted, fontSize: 12 }}>{s.descripcion}</div>
            <button style={{
              fontSize: 11, padding: '6px 10px',
              background: 'transparent', color: theme.textMuted,
              border: `1px solid ${theme.border}`, borderRadius: 6,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashClientes({ theme }) {
  return (
    <div>
      <DPageHeader theme={theme} title="Clientes" subtitle="487 clientes registrados · 312 activos último mes" />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: 20, fontSize: 13, color: theme.textMuted,
      }}>
        Vista de CRM agregado. Cada barbero ve sus propios clientes en su portal.
      </div>
    </div>
  );
}

function DashMensajes({ theme }) {
  const templates = [
    { id: 'confirm_es', nombre: 'Confirmación cita · ES', preview: '¡Hola {nombre}! Tu cita en Styles Barbershop 2 con {barbero} está confirmada para el {fecha} a las {hora}. ✂', estado: 'aprobado' },
    { id: 'confirm_en', nombre: 'Appointment confirmed · EN', preview: 'Hi {name}! Your appointment at Styles Barbershop 2 with {barber} is confirmed for {date} at {time}. ✂', estado: 'aprobado' },
    { id: 'rec24_es', nombre: 'Recordatorio 24h · ES', preview: 'Recordatorio: mañana a las {hora} tienes tu cita con {barbero}. Responde CANCELAR si no puedes.', estado: 'aprobado' },
    { id: 'rec24_en', nombre: 'Reminder 24h · EN', preview: 'Reminder: you have an appointment tomorrow at {time} with {barber}. Reply CANCEL if you can\'t make it.', estado: 'aprobado' },
    { id: 'rev_es', nombre: 'Pedir reseña · ES', preview: '¡Gracias por venir! ¿Te gustó tu corte con {barbero}? Déjanos una reseña ⭐: {link}', estado: 'aprobado' },
    { id: 're30_es', nombre: 'Re-engagement 30d · ES', preview: 'Hola {nombre}, hace un mes que no te vemos. ¿Reservamos tu próximo corte? {link}', estado: 'pendiente' },
  ];
  return (
    <div>
      <DPageHeader theme={theme} title="Templates de mensajes" subtitle="14 templates · WhatsApp Business + SMS · ES + EN" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {templates.map(t => (
          <div key={t.id} style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: 12, padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.nombre}</div>
              <span style={{
                fontSize: 10, padding: '3px 8px', borderRadius: 100,
                background: t.estado === 'aprobado' ? `${theme.success}20` : `${theme.primary}20`,
                color: t.estado === 'aprobado' ? theme.success : theme.primary,
                fontWeight: 700,
              }}>{t.estado === 'aprobado' ? '✓ Meta aprobado' : '⏳ Pendiente'}</span>
            </div>
            <div style={{
              fontSize: 12, color: theme.textMuted, lineHeight: 1.5,
              padding: 10, background: theme.bg, borderRadius: 8,
              fontFamily: theme.fontMono,
            }}>{t.preview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashConfig({ theme }) {
  return (
    <div>
      <DPageHeader theme={theme} title="Configuración" subtitle="Información de la barbería · Horarios · Branding" />
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: 20, marginBottom: 16,
      }}>
        <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: '0 0 14px', fontWeight: 700 }}>Información del negocio</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field3 theme={theme} l="Nombre" v="Styles Barbershop 2" />
          <Field3 theme={theme} l="Teléfono" v="(973) 555-0142" />
          <Field3 theme={theme} l="Dirección" v="49 Warwick St" />
          <Field3 theme={theme} l="Ciudad" v="Newark, NJ 07105" />
        </div>
      </div>
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: 20,
      }}>
        <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: '0 0 14px', fontWeight: 700 }}>Horarios</h3>
        {Object.entries(window.SBData.SHOP.hours).map(([d, h]) => (
          <div key={d} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: `1px solid ${theme.border}`, fontSize: 13,
          }}>
            <div style={{ fontWeight: 600 }}>{d}</div>
            <div style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>{h}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────
function DPageHeader({ theme, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontFamily: theme.fontDisplay, fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{title}</h1>
      {subtitle && <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

function DStat({ theme, label, value, sub, accent, warn }) {
  return (
    <div style={{
      padding: 18, background: theme.surface,
      border: `1px solid ${warn ? theme.danger : theme.border}`, borderRadius: 12,
      borderTop: `3px solid ${accent || theme.primary}`,
    }}>
      <div style={{ fontSize: 10, color: theme.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 28, fontFamily: theme.fontDisplay, fontWeight: 800, marginTop: 6, color: accent || theme.text }}>{value}</div>
      <div style={{ fontSize: 11, color: warn ? theme.danger : theme.textMuted, marginTop: 4, fontWeight: warn ? 600 : 400 }}>{sub}</div>
    </div>
  );
}

function DBStat({ theme, l, v }) {
  return (
    <div style={{ padding: 10, background: theme.bg, borderRadius: 8, textAlign: 'center' }}>
      <div style={{ fontSize: 9, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>{l}</div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 3, color: theme.primary, fontFamily: theme.fontMono }}>{v}</div>
    </div>
  );
}

function Pill({ theme, active, children }) {
  return (
    <div style={{
      padding: '4px 10px', borderRadius: 100,
      background: active ? theme.primary : 'transparent',
      color: active ? (theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a') : theme.textMuted,
      fontSize: 11, fontWeight: 600, cursor: 'pointer',
      border: `1px solid ${active ? theme.primary : theme.border}`,
    }}>{children}</div>
  );
}

function Field3({ theme, l, v }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</div>
      <input defaultValue={v} style={{
        width: '100%', padding: '10px 12px', boxSizing: 'border-box',
        background: theme.bg, color: theme.text,
        border: `1px solid ${theme.border}`, borderRadius: 8,
        fontSize: 13, fontFamily: 'inherit', outline: 'none',
      }} />
    </div>
  );
}

function BarChart({ theme }) {
  const data = [
    { d: 'L', v: 62 }, { d: 'M', v: 58 }, { d: 'M', v: 71 },
    { d: 'J', v: 75 }, { d: 'V', v: 92 }, { d: 'S', v: 95 }, { d: 'D', v: 48 },
  ];
  const max = 100;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 10, fontFamily: theme.fontMono, color: theme.textMuted }}>{d.v}%</div>
          <div style={{
            width: '100%', height: `${(d.v/max)*140}px`,
            background: i === 4 ? theme.primary : `${theme.primary}55`,
            borderRadius: '4px 4px 0 0',
          }} />
          <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>{d.d}</div>
        </div>
      ))}
    </div>
  );
}

function HeatMap({ theme }) {
  const heat = [0.2, 0.4, 0.7, 0.85, 0.6, 0.5, 0.4, 0.6, 0.85, 0.95, 0.7];
  const horas = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {horas.map((h, i) => (
        <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 10, color: theme.textMuted, width: 20, fontFamily: theme.fontMono }}>{h}h</div>
          <div style={{
            flex: 1, height: 14,
            background: theme.border, borderRadius: 3, overflow: 'hidden',
          }}>
            <div style={{
              width: `${heat[i]*100}%`, height: '100%',
              background: `linear-gradient(90deg, ${theme.primary}55, ${theme.primary})`,
            }} />
          </div>
          <div style={{ fontSize: 10, color: theme.textMuted, width: 32, fontFamily: theme.fontMono, textAlign: 'right' }}>{Math.round(heat[i]*100)}%</div>
        </div>
      ))}
    </div>
  );
}

window.PortalDueno = PortalDueno;
