// Web pública mobile — Booking flow para Styles Barbershop 2
// Renderiza dentro de un iPhone frame.

function WebPublica({ theme, step, setStep, selection, setSelection }) {
  const { BARBEROS, SERVICIOS, PRECIOS, SHOP, RESENAS } = window.SBData;

  const screens = {
    home: <ScreenHome theme={theme} setStep={setStep} setSelection={setSelection} />,
    barberos: <ScreenBarberos theme={theme} setStep={setStep} selection={selection} setSelection={setSelection} />,
    servicios: <ScreenServicios theme={theme} setStep={setStep} selection={selection} setSelection={setSelection} />,
    horario: <ScreenHorario theme={theme} setStep={setStep} selection={selection} setSelection={setSelection} />,
    datos: <ScreenDatos theme={theme} setStep={setStep} selection={selection} setSelection={setSelection} />,
    pago: <ScreenPago theme={theme} setStep={setStep} selection={selection} setSelection={setSelection} />,
    confirmada: <ScreenConfirmada theme={theme} setStep={setStep} selection={selection} />,
  };

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: theme.bg, color: theme.text,
      fontFamily: theme.fontBody,
      WebkitFontSmoothing: 'antialiased',
    }}>
      {screens[step] || screens.home}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// HOME — landing con hero, info shop, cta principal
// ─────────────────────────────────────────────────────────
function ScreenHome({ theme, setStep, setSelection }) {
  const { SHOP, BARBEROS, SERVICIOS, PRECIOS, RESENAS } = window.SBData;
  const isLight = theme.bg.startsWith('#f') || theme.bg.startsWith('#e');

  return (
    <div>
      {/* Hero */}
      <div style={{
        position: 'relative',
        padding: '70px 20px 32px',
        background: isLight
          ? `linear-gradient(180deg, ${theme.surfaceLight}, ${theme.bg})`
          : `radial-gradient(ellipse at top, ${theme.surfaceLight} 0%, ${theme.bg} 70%)`,
        textAlign: 'center',
        borderBottom: `1px solid ${theme.border}`,
      }}>
        {/* lang toggle */}
        <div style={{ position: 'absolute', top: 60, right: 16, display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: theme.textMuted }}>
          <span style={{ color: theme.primary, fontWeight: 600 }}>ES</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>EN</span>
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <div style={{
            width: 116, height: 116, borderRadius: '50%',
            background: '#000',
            border: `2px solid ${theme.primary}`,
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${theme.primary}33`,
          }}>
            <img src="assets/styles-logo.png" alt="Styles Barbershop 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{
          fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
          color: theme.primary, marginBottom: 6, fontWeight: 600,
        }}>EST. 2018 · NEWARK</div>

        <h1 style={{
          fontFamily: theme.fontDisplay,
          fontSize: 38, fontWeight: 700, lineHeight: 1.05,
          margin: '0 0 6px', letterSpacing: '-0.01em',
        }}>Styles<br/>Barbershop 2</h1>

        <div style={{
          fontStyle: 'italic', fontSize: 13, color: theme.textMuted,
          marginBottom: 18, fontFamily: theme.fontDisplay,
        }}>· Calidad, estilo y confianza ·</div>

        {/* Rating */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 100,
          border: `1px solid ${theme.border}`, fontSize: 12,
        }}>
          <Stars rating={SHOP.rating} color={theme.primary} size={12} />
          <span style={{ fontWeight: 600 }}>{SHOP.rating}</span>
          <span style={{ color: theme.textMuted }}>· {SHOP.reviews} reseñas</span>
        </div>
      </div>

      {/* CTA principal */}
      <div style={{ padding: '24px 20px 8px' }}>
        <button onClick={() => setStep('barberos')} style={{
          width: '100%', padding: '18px',
          background: theme.primary, color: isLight ? '#fff' : '#0a0a0a',
          border: 'none', borderRadius: 12,
          fontSize: 16, fontWeight: 700, letterSpacing: 0.3,
          cursor: 'pointer', textTransform: 'uppercase',
          fontFamily: theme.fontBody,
          boxShadow: `0 4px 20px ${theme.primary}40`,
        }}>Reservar cita</button>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: theme.textMuted }}>
          Sin registro · Confirmación inmediata por SMS
        </div>
      </div>

      {/* Info quick */}
      <div style={{ padding: '20px 20px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <InfoCard theme={theme} icon="📍" label="Dirección" value="49 Warwick St" sub="Newark, NJ 07105" />
        <InfoCard theme={theme} icon="🕐" label="Hoy abierto" value="10am – 8pm" sub="Lunes" />
      </div>

      {/* Barberos */}
      <SectionTitle theme={theme} kicker="Nuestros" title="Barberos" />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BARBEROS.map(b => (
          <button key={b.id} onClick={() => { setSelection(s => ({...s, barbero: b.id})); setStep('servicios'); }}
            style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: 14, background: theme.surface,
              border: `1px solid ${theme.border}`, borderRadius: 14,
              cursor: 'pointer', textAlign: 'left', width: '100%',
              fontFamily: 'inherit', color: 'inherit',
            }}>
            <BarberAvatar barbero={b} size={56} theme={theme} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{b.nombre}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>{b.rol}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                <Stars rating={b.rating} color={theme.primary} size={10} />
                <span style={{ color: theme.textMuted }}>{b.rating} · {b.reviews}</span>
              </div>
            </div>
            <div style={{ color: theme.primary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Reservar →
            </div>
          </button>
        ))}
      </div>

      {/* Servicios preview */}
      <SectionTitle theme={theme} kicker="Nuestros" title="Servicios" />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SERVICIOS.slice(0, 4).map((s, i) => (
          <div key={s.id} style={{
            padding: '14px 0',
            borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: theme.fontDisplay, fontSize: 18, fontWeight: 600 }}>{s.nombre}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>{s.duracion} min · {s.descripcion}</div>
            </div>
            <div style={{ fontSize: 14, color: theme.primary, fontWeight: 700, fontFamily: theme.fontMono }}>
              ${s.precioBase}+
            </div>
          </div>
        ))}
      </div>

      {/* Galería */}
      <SectionTitle theme={theme} kicker="Galería" title="Trabajo reciente" />
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            aspectRatio: '1', borderRadius: 6,
            background: `linear-gradient(135deg, hsl(${i*40 + 20}, 25%, ${isLight ? 70 : 25}%), hsl(${i*40}, 25%, ${isLight ? 60 : 15}%))`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: theme.primary, fontSize: 22,
          }}>✂</div>
        ))}
      </div>

      {/* Reseñas */}
      <SectionTitle theme={theme} kicker="Lo que dicen" title="Reseñas" />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {RESENAS.slice(0, 2).map((r, i) => (
          <div key={i} style={{
            padding: 14, background: theme.surface,
            border: `1px solid ${theme.border}`, borderRadius: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{r.autor}</div>
              <Stars rating={r.rating} color={theme.primary} size={11} />
            </div>
            <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.45 }}>"{r.texto}"</div>
            <div style={{ fontSize: 10, color: theme.textDim, marginTop: 6 }}>
              Con {BARBEROS.find(b => b.id === r.barbero).nombre.split(' ')[0]} · {r.fecha}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '32px 20px 40px', textAlign: 'center', borderTop: `1px solid ${theme.border}`, marginTop: 24 }}>
        <div style={{ fontFamily: theme.fontDisplay, fontSize: 18, fontWeight: 700, color: theme.primary }}>STYLES BARBERSHOP 2</div>
        <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 6 }}>
          49 Warwick St · Newark, NJ 07105<br/>
          (973) 555-0142
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// PASO 1 · Elige barbero
// ─────────────────────────────────────────────────────────
function ScreenBarberos({ theme, setStep, selection, setSelection }) {
  const { BARBEROS } = window.SBData;
  return (
    <div>
      <BookingHeader theme={theme} step={1} totalSteps={4} title="Elige tu barbero" onBack={() => setStep('home')} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {BARBEROS.map(b => {
          const sel = selection.barbero === b.id;
          return (
            <button key={b.id} onClick={() => { setSelection(s => ({...s, barbero: b.id})); setTimeout(() => setStep('servicios'), 180); }}
              style={{
                display: 'flex', gap: 14, alignItems: 'center', padding: 16,
                background: sel ? theme.surfaceLight : theme.surface,
                border: `2px solid ${sel ? theme.primary : theme.border}`,
                borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                width: '100%', fontFamily: 'inherit', color: 'inherit',
                transition: 'all 0.18s',
              }}>
              <BarberAvatar barbero={b} size={64} theme={theme} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{b.nombre}</div>
                <div style={{ fontSize: 11, color: theme.primary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>{b.rol}</div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 6, lineHeight: 1.35 }}>{b.bio}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11 }}>
                  <Stars rating={b.rating} color={theme.primary} size={10} />
                  <span style={{ color: theme.textMuted }}>{b.rating} · {b.reviews} reseñas</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// PASO 2 · Elige servicio
// ─────────────────────────────────────────────────────────
function ScreenServicios({ theme, setStep, selection, setSelection }) {
  const { BARBEROS, SERVICIOS, PRECIOS } = window.SBData;
  const barbero = BARBEROS.find(b => b.id === selection.barbero);
  const precios = PRECIOS[selection.barbero] || {};
  const serviciosBarbero = SERVICIOS.filter(s => precios[s.id] !== undefined);

  return (
    <div>
      <BookingHeader theme={theme} step={2} totalSteps={4} title="Elige el servicio" onBack={() => setStep('barberos')} />
      {/* Barbero pill */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
          padding: '8px 12px', background: theme.surface,
          border: `1px solid ${theme.border}`, borderRadius: 100,
        }}>
          <BarberAvatar barbero={barbero} size={28} theme={theme} />
          <div style={{ fontSize: 13, fontWeight: 600 }}>{barbero.nombre}</div>
          <div style={{ fontSize: 11, color: theme.textMuted }}>· {barbero.rol.split('·')[0].trim()}</div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {serviciosBarbero.map(s => {
          const sel = selection.servicio === s.id;
          const precio = precios[s.id];
          return (
            <button key={s.id} onClick={() => { setSelection(sel2 => ({...sel2, servicio: s.id, precio})); setTimeout(() => setStep('horario'), 180); }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 18px',
                background: sel ? theme.surfaceLight : theme.surface,
                border: `2px solid ${sel ? theme.primary : theme.border}`,
                borderRadius: 14, cursor: 'pointer', width: '100%',
                fontFamily: 'inherit', color: 'inherit', textAlign: 'left',
                transition: 'all 0.18s',
              }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: theme.fontDisplay, fontSize: 19, fontWeight: 700, marginBottom: 3 }}>{s.nombre}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{s.duracion} min · {s.descripcion}</div>
              </div>
              <div style={{
                fontSize: 22, fontWeight: 700, color: theme.primary,
                fontFamily: theme.fontMono, marginLeft: 12,
              }}>${precio}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// PASO 3 · Elige horario
// ─────────────────────────────────────────────────────────
function ScreenHorario({ theme, setStep, selection, setSelection }) {
  const { BARBEROS, SERVICIOS } = window.SBData;
  const barbero = BARBEROS.find(b => b.id === selection.barbero);
  const servicio = SERVICIOS.find(s => s.id === selection.servicio);

  // Horarios disponibles mock
  const slots = ['10:00', '10:30', '11:00', '11:30', '12:30', '13:00', '14:00', '15:30', '16:00', '17:00', '17:30', '18:30'];
  const ocupados = ['11:00', '14:00', '17:00'];

  // Días
  const hoy = new Date(2026, 4, 1); // 1 May 2026 (viernes)
  const dias = Array.from({length: 7}, (_, i) => {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + i);
    return d;
  });
  const diasNombre = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div>
      <BookingHeader theme={theme} step={3} totalSteps={4} title="Elige día y hora" onBack={() => setStep('servicios')} />

      {/* Resumen pill */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: theme.surface,
          border: `1px solid ${theme.border}`, borderRadius: 12,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', minWidth: 0 }}>
            <BarberAvatar barbero={barbero} size={32} theme={theme} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{barbero.nombre.split(' ')[0]} · {servicio.nombre}</div>
              <div style={{ fontSize: 11, color: theme.textMuted }}>{servicio.duracion} min · ${selection.precio}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Días horizontales */}
      <div style={{ padding: '0 20px 8px', overflowX: 'auto', display: 'flex', gap: 8, scrollbarWidth: 'none' }}>
        {dias.map((d, i) => {
          const sel = selection.dia === i;
          return (
            <button key={i} onClick={() => setSelection(s => ({...s, dia: i, fecha: d.toISOString().split('T')[0], fechaTexto: `${diasNombre[d.getDay()]} ${d.getDate()} May`}))}
              style={{
                flexShrink: 0, padding: '10px 4px', minWidth: 56,
                background: sel ? theme.primary : theme.surface,
                border: `1px solid ${sel ? theme.primary : theme.border}`,
                borderRadius: 10, cursor: 'pointer',
                color: sel ? (theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a') : 'inherit',
                fontFamily: 'inherit',
              }}>
              <div style={{ fontSize: 10, opacity: sel ? 0.85 : 0.6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{diasNombre[d.getDay()]}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      {/* Slots */}
      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {slots.map(t => {
          const ocupado = ocupados.includes(t);
          const sel = selection.hora === t;
          return (
            <button key={t} disabled={ocupado} onClick={() => { setSelection(s => ({...s, hora: t})); setTimeout(() => setStep('datos'), 180); }}
              style={{
                padding: '12px 0', borderRadius: 10,
                background: sel ? theme.primary : (ocupado ? 'transparent' : theme.surface),
                border: `1px solid ${sel ? theme.primary : (ocupado ? theme.border : theme.border)}`,
                cursor: ocupado ? 'not-allowed' : 'pointer',
                color: sel ? (theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a') : (ocupado ? theme.textDim : theme.text),
                fontSize: 14, fontWeight: 600, fontFamily: theme.fontMono,
                opacity: ocupado ? 0.5 : 1,
                textDecoration: ocupado ? 'line-through' : 'none',
              }}>{t}</button>
          );
        })}
      </div>
      <div style={{ padding: '0 20px 24px', fontSize: 11, color: theme.textMuted, textAlign: 'center' }}>
        Hora local de Newark, NJ · Selecciona un horario disponible
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// PASO 4 · Tus datos
// ─────────────────────────────────────────────────────────
function ScreenDatos({ theme, setStep, selection, setSelection }) {
  const [nombre, setNombre] = React.useState(selection.nombre || '');
  const [tel, setTel] = React.useState(selection.tel || '');
  const [notas, setNotas] = React.useState(selection.notas || '');

  const submit = () => {
    setSelection(s => ({...s, nombre, tel, notas}));
    setStep('pago');
  };

  const valid = nombre.length > 1 && tel.length >= 10;

  return (
    <div>
      <BookingHeader theme={theme} step={4} totalSteps={4} title="Tus datos" onBack={() => setStep('horario')} />
      <div style={{ padding: '0 20px 20px' }}>
        <Field theme={theme} label="Nombre completo" value={nombre} onChange={setNombre} placeholder="Roberto Núñez" />
        <Field theme={theme} label="Teléfono" value={tel} onChange={setTel} placeholder="(973) 555-0142" type="tel" />
        <Field theme={theme} label="Notas para el barbero (opcional)" value={notas} onChange={setNotas} placeholder='Ej: "Igual que la última vez, fade bajo"' multiline />

        <div style={{ display: 'flex', gap: 8, padding: '12px 0', alignItems: 'flex-start' }}>
          <input type="checkbox" defaultChecked id="recordar" style={{ marginTop: 3 }} />
          <label htmlFor="recordar" style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}>
            Recibir confirmación y recordatorios por <strong style={{color: theme.text}}>SMS</strong> y <strong style={{color: '#25D366'}}>WhatsApp</strong>
          </label>
        </div>

        <button onClick={submit} disabled={!valid} style={{
          width: '100%', padding: 16, marginTop: 16,
          background: valid ? theme.primary : theme.surface,
          color: valid ? (theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a') : theme.textDim,
          border: 'none', borderRadius: 12,
          fontSize: 15, fontWeight: 700, letterSpacing: 0.3,
          textTransform: 'uppercase', fontFamily: theme.fontBody,
          cursor: valid ? 'pointer' : 'not-allowed',
        }}>Continuar al pago →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// PASO 5 · Pago (Stripe-style)
// ─────────────────────────────────────────────────────────
function ScreenPago({ theme, setStep, selection, setSelection }) {
  const { BARBEROS, SERVICIOS } = window.SBData;
  const barbero = BARBEROS.find(b => b.id === selection.barbero);
  const servicio = SERVICIOS.find(s => s.id === selection.servicio);
  const deposito = Math.round(selection.precio * 0.25);
  const restante = selection.precio - deposito;

  const [card, setCard] = React.useState('4242 4242 4242 4242');
  const [exp, setExp] = React.useState('12/27');
  const [cvc, setCvc] = React.useState('123');
  const [zip, setZip] = React.useState('07105');
  const [proc, setProc] = React.useState(false);

  const pagar = () => {
    setProc(true);
    setTimeout(() => { setStep('confirmada'); setProc(false); }, 1400);
  };

  return (
    <div>
      <BookingHeader theme={theme} step={4} totalSteps={4} title="Pago de depósito" onBack={() => setStep('datos')} />

      {/* Resumen */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 14, padding: 16, marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 1, color: theme.textMuted, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>Resumen de tu cita</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <BarberAvatar barbero={barbero} size={42} theme={theme} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{barbero.nombre}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{servicio.nombre} · {servicio.duracion} min</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 10, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: theme.textMuted }}>{selection.fechaTexto || 'Vie 1 May'} · {selection.hora}</span>
            <span style={{ fontWeight: 600, color: theme.primary }}>${selection.precio}.00</span>
          </div>
        </div>

        {/* Desglose */}
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 14, padding: 16, marginBottom: 16,
        }}>
          <Row theme={theme} l={`Servicio: ${servicio.nombre}`} r={`$${selection.precio}.00`} />
          <Row theme={theme} l="Depósito ahora (25%)" r={`$${deposito}.00`} bold primary />
          <div style={{ height: 1, background: theme.border, margin: '10px 0' }} />
          <Row theme={theme} l="Resto en la barbería" r={`$${restante}.00`} muted />
        </div>

        {/* Stripe form */}
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 14, padding: 16, marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Tarjeta de débito o crédito</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <CardLogo type="visa" />
              <CardLogo type="mc" />
              <CardLogo type="amex" />
            </div>
          </div>
          <StripeField theme={theme} value={card} onChange={setCard} placeholder="1234 1234 1234 1234" mono />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
            <StripeField theme={theme} value={exp} onChange={setExp} placeholder="MM/AA" mono />
            <StripeField theme={theme} value={cvc} onChange={setCvc} placeholder="CVC" mono />
            <StripeField theme={theme} value={zip} onChange={setZip} placeholder="ZIP" mono />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 10, color: theme.textMuted }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Procesado de forma segura por <strong style={{ color: theme.text }}>Stripe</strong> · Pago directo a {barbero.nombre.split(' ')[0]}
          </div>
        </div>

        <button onClick={pagar} disabled={proc} style={{
          width: '100%', padding: 17,
          background: proc ? theme.primaryDark : theme.primary,
          color: theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a',
          border: 'none', borderRadius: 12,
          fontSize: 15, fontWeight: 700, letterSpacing: 0.3,
          textTransform: 'uppercase', fontFamily: theme.fontBody,
          cursor: proc ? 'wait' : 'pointer',
          marginBottom: 8,
        }}>
          {proc ? 'Procesando...' : `Pagar $${deposito}.00 y reservar`}
        </button>
        <div style={{ textAlign: 'center', fontSize: 10, color: theme.textMuted, paddingBottom: 24 }}>
          Si cancelas con menos de 2h, el depósito no se reembolsa
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CONFIRMADA
// ─────────────────────────────────────────────────────────
function ScreenConfirmada({ theme, setStep, selection }) {
  const { BARBEROS, SERVICIOS } = window.SBData;
  const barbero = BARBEROS.find(b => b.id === selection.barbero);
  const servicio = SERVICIOS.find(s => s.id === selection.servicio);
  const deposito = Math.round(selection.precio * 0.25);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '70px 20px 24px', textAlign: 'center' }}>
        <div style={{
          width: 76, height: 76, margin: '0 auto 20px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryHover})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 40px ${theme.primary}66`,
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={theme.bg.startsWith('#f') ? '#fff' : '#0a0a0a'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: theme.primary, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Cita Confirmada</div>
        <h1 style={{ fontFamily: theme.fontDisplay, fontSize: 28, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
          ¡Listo, {selection.nombre?.split(' ')[0] || 'Roberto'}!
        </h1>
        <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 6 }}>Tu reserva está confirmada</div>
      </div>

      {/* Tarjeta */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.surface}, ${theme.surfaceLight})`,
          border: `1px solid ${theme.borderStrong}`,
          borderRadius: 16, padding: 18,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingBottom: 14, borderBottom: `1px solid ${theme.border}` }}>
            <BarberAvatar barbero={barbero} size={52} theme={theme} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{barbero.nombre}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{servicio.nombre}</div>
            </div>
          </div>
          <div style={{ paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Cell theme={theme} l="FECHA" r={selection.fechaTexto || 'Vie 1 May'} />
            <Cell theme={theme} l="HORA" r={selection.hora} />
            <Cell theme={theme} l="DURACIÓN" r={`${servicio.duracion} min`} />
            <Cell theme={theme} l="DEPÓSITO" r={`$${deposito} pagado`} primary />
          </div>
          <div style={{ marginTop: 14, padding: '10px 12px', background: theme.bg, borderRadius: 8, fontSize: 11, color: theme.textMuted }}>
            📍 <strong style={{color: theme.text}}>49 Warwick St</strong>, Newark, NJ 07105
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <ActionBtn theme={theme} icon="📅" label="Añadir al calendario" />
        <ActionBtn theme={theme} icon="🗺️" label="Cómo llegar" />
      </div>

      {/* Notificación */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{
          padding: 14, borderRadius: 12,
          background: theme.surface, border: `1px dashed ${theme.borderStrong}`,
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: 18 }}>💬</div>
          <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}>
            Te enviamos la confirmación por <strong style={{color: theme.text}}>SMS</strong> y <strong style={{color: '#25D366'}}>WhatsApp</strong>. Recibirás recordatorios <strong style={{color: theme.text}}>24h</strong> y <strong style={{color: theme.text}}>2h</strong> antes.
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '0 20px 30px' }}>
        <button onClick={() => setStep('home')} style={{
          width: '100%', padding: 14,
          background: 'transparent',
          color: theme.text,
          border: `1px solid ${theme.border}`, borderRadius: 12,
          fontSize: 13, fontWeight: 600, fontFamily: theme.fontBody,
          cursor: 'pointer',
        }}>Volver al inicio</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Componentes auxiliares
// ─────────────────────────────────────────────────────────
function BookingHeader({ theme, step, totalSteps, title, onBack }) {
  return (
    <div style={{
      padding: '60px 16px 16px',
      background: theme.bgElev,
      borderBottom: `1px solid ${theme.border}`,
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <button onClick={onBack} style={{
          width: 32, height: 32, borderRadius: '50%',
          background: theme.surface, border: `1px solid ${theme.border}`,
          color: theme.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ fontSize: 11, color: theme.textMuted, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
          Paso {step} de {totalSteps}
        </div>
        {/* progress dots */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {Array.from({length: totalSteps}, (_, i) => (
            <div key={i} style={{
              width: i + 1 <= step ? 18 : 6, height: 4, borderRadius: 2,
              background: i + 1 <= step ? theme.primary : theme.border,
              transition: 'all .25s',
            }} />
          ))}
        </div>
      </div>
      <h1 style={{ fontFamily: theme.fontDisplay, fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{title}</h1>
    </div>
  );
}

function BarberAvatar({ barbero, size = 48, theme }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${barbero.color}, ${barbero.color}99)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700,
      fontSize: size * 0.36,
      fontFamily: theme.fontDisplay,
      letterSpacing: 0.5,
      border: `1.5px solid ${theme.borderStrong}`,
    }}>{barbero.foto}</div>
  );
}

function Stars({ rating, color, size = 12 }) {
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.floor(rating) ? color : 'transparent'} stroke={color} strokeWidth="1.5">
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z"/>
        </svg>
      ))}
    </div>
  );
}

function InfoCard({ theme, icon, label, value, sub }) {
  return (
    <div style={{
      padding: 12, background: theme.surface,
      border: `1px solid ${theme.border}`, borderRadius: 12,
    }}>
      <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 9, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 1 }}>{sub}</div>
    </div>
  );
}

function SectionTitle({ theme, kicker, title }) {
  return (
    <div style={{ padding: '32px 20px 14px' }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: theme.primary, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>{kicker}</div>
      <h2 style={{ fontFamily: theme.fontDisplay, fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
    </div>
  );
}

function Field({ theme, label, value, onChange, placeholder, type = 'text', multiline }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{
            width: '100%', padding: '12px 14px', boxSizing: 'border-box',
            background: theme.surface, color: theme.text,
            border: `1px solid ${theme.border}`, borderRadius: 10,
            fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'none',
          }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            width: '100%', padding: '12px 14px', boxSizing: 'border-box',
            background: theme.surface, color: theme.text,
            border: `1px solid ${theme.border}`, borderRadius: 10,
            fontSize: 14, fontFamily: 'inherit', outline: 'none',
          }} />
      )}
    </div>
  );
}

function StripeField({ theme, value, onChange, placeholder, mono }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: '100%', padding: '12px 12px', boxSizing: 'border-box',
        background: theme.bg, color: theme.text,
        border: `1px solid ${theme.border}`, borderRadius: 8,
        fontSize: 14, fontFamily: mono ? theme.fontMono : 'inherit', outline: 'none',
        letterSpacing: mono ? 0.5 : 0,
      }} />
  );
}

function CardLogo({ type }) {
  const styles = {
    visa: { bg: '#1A1F71', text: 'VISA', color: '#fff', font: 'Arial', italic: true },
    mc: { bg: '#fff', text: 'MC', color: '#EB001B', font: 'Arial' },
    amex: { bg: '#006FCF', text: 'AMEX', color: '#fff', font: 'Arial' },
  };
  const s = styles[type];
  return (
    <div style={{
      width: 28, height: 18, borderRadius: 3,
      background: s.bg, color: s.color,
      fontSize: 9, fontWeight: 800, fontFamily: s.font,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontStyle: s.italic ? 'italic' : 'normal',
      border: '1px solid rgba(0,0,0,.1)',
    }}>{s.text}</div>
  );
}

function Row({ theme, l, r, bold, primary, muted }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13,
      color: muted ? theme.textMuted : theme.text,
    }}>
      <span style={{ fontWeight: bold ? 600 : 400 }}>{l}</span>
      <span style={{ fontWeight: bold ? 700 : 500, color: primary ? theme.primary : 'inherit', fontFamily: theme.fontMono }}>{r}</span>
    </div>
  );
}

function Cell({ theme, l, r, primary }) {
  return (
    <div>
      <div style={{ fontSize: 9, letterSpacing: 1, color: theme.textMuted, fontWeight: 600 }}>{l}</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3, color: primary ? theme.primary : theme.text }}>{r}</div>
    </div>
  );
}

function ActionBtn({ theme, icon, label }) {
  return (
    <button style={{
      padding: '12px 8px', background: theme.surface,
      border: `1px solid ${theme.border}`, borderRadius: 12,
      color: theme.text, cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

window.WebPublica = WebPublica;
