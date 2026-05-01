// App principal — Design Canvas con todas las vistas

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "black_gold",
  "showTweaks": true
}/*EDITMODE-END*/;

function App() {
  const { setTweak, ...t } = useTweaks(TWEAK_DEFAULTS);
  const theme = window.SBThemes[t.theme] || window.SBThemes.black_gold;

  // Estado del booking flow (compartido entre 2 iPhones para mostrar el flow)
  const [step1, setStep1] = React.useState('home');
  const [sel1, setSel1] = React.useState({ barbero: 'jose', servicio: 'corte_barba', precio: 55, dia: 0, fecha: '2026-05-01', fechaTexto: 'Vie 1 May', hora: '10:00', nombre: 'Roberto Núñez', tel: '(973) 555-0142' });

  const [step2, setStep2] = React.useState('servicios');
  const [sel2, setSel2] = React.useState({ barbero: 'jose', servicio: 'corte_barba', precio: 55, dia: 0, fecha: '2026-05-01', fechaTexto: 'Vie 1 May', hora: '10:00', nombre: 'Roberto Núñez', tel: '(973) 555-0142' });

  const [step3, setStep3] = React.useState('pago');
  const [sel3, setSel3] = React.useState({ barbero: 'jose', servicio: 'corte_barba', precio: 55, dia: 0, fecha: '2026-05-01', fechaTexto: 'Vie 1 May', hora: '10:00', nombre: 'Roberto Núñez', tel: '(973) 555-0142' });

  const [step4, setStep4] = React.useState('confirmada');
  const [sel4, setSel4] = React.useState({ barbero: 'jose', servicio: 'corte_barba', precio: 55, dia: 0, fecha: '2026-05-01', fechaTexto: 'Vie 1 May', hora: '10:00', nombre: 'Roberto Núñez', tel: '(973) 555-0142' });

  return (
    <>
      <DesignCanvas>
        {/* Sección 0: Landing pública (la web que el cliente ve primero) */}
        <DCSection id="landing" title="Landing pública — stylesbarbershop2.com" subtitle="La página que ven al googlear el shop · scroll para ver completa">
          {Object.entries(window.SBThemes).map(([key, th]) => (
            <DCArtboard key={`land-${key}`} id={`landing-${key}`} label={`Landing · ${th.name}`} width={402} height={874}>
              <IOSDevice width={402} height={874} dark={!th.bg.startsWith('#f')}>
                <PhoneInner>
                  <LandingPublica theme={th} setStep={() => {}} setSelection={() => {}} />
                </PhoneInner>
              </IOSDevice>
            </DCArtboard>
          ))}
        </DCSection>

        {/* Sección 1: Variantes de branding (web pública mobile, home corta) */}
        <DCSection id="branding" title="Home compacta — 3 variantes de branding" subtitle="Cliente decide cuál usamos como base · todas con el mismo logo">
          {Object.entries(window.SBThemes).map(([key, th]) => (
            <DCArtboard key={key} id={`brand-${key}`} label={th.name} width={402} height={874}>
              <IOSDevice width={402} height={874} dark={!th.bg.startsWith('#f')}>
                <PhoneInner>
                  <WebPublica theme={th} step="home" setStep={() => {}} selection={{}} setSelection={() => {}} />
                </PhoneInner>
              </IOSDevice>
            </DCArtboard>
          ))}
        </DCSection>

        {/* Sección 2: Flujo de reserva (4 pantallas) */}
        <DCSection id="reserva" title="Web pública — Flujo de reserva" subtitle="El cliente reserva desde su celular · con depósito por Stripe">
          <DCArtboard id="r1" label="1 · Elige barbero" width={402} height={874}>
            <IOSDevice width={402} height={874} dark={!theme.bg.startsWith('#f')}>
              <PhoneInner>
                <WebPublica theme={theme} step="barberos" setStep={setStep1} selection={sel1} setSelection={setSel1} />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
          <DCArtboard id="r2" label="2 · Servicio + precio" width={402} height={874}>
            <IOSDevice width={402} height={874} dark={!theme.bg.startsWith('#f')}>
              <PhoneInner>
                <WebPublica theme={theme} step="servicios" setStep={setStep2} selection={sel2} setSelection={setSel2} />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
          <DCArtboard id="r3" label="3 · Día y hora" width={402} height={874}>
            <IOSDevice width={402} height={874} dark={!theme.bg.startsWith('#f')}>
              <PhoneInner>
                <WebPublica theme={theme} step="horario" setStep={() => {}} selection={sel2} setSelection={setSel2} />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
          <DCArtboard id="r4" label="4 · Pago Stripe" width={402} height={874}>
            <IOSDevice width={402} height={874} dark={!theme.bg.startsWith('#f')}>
              <PhoneInner>
                <WebPublica theme={theme} step="pago" setStep={setStep3} selection={sel3} setSelection={setSel3} />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
          <DCArtboard id="r5" label="5 · Confirmada" width={402} height={874}>
            <IOSDevice width={402} height={874} dark={!theme.bg.startsWith('#f')}>
              <PhoneInner>
                <WebPublica theme={theme} step="confirmada" setStep={setStep4} selection={sel4} setSelection={setSel4} />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
        </DCSection>

        {/* Sección 3: Notificaciones */}
        <DCSection id="notif" title="Notificaciones automáticas" subtitle="WhatsApp + SMS bilingüe · Confirmación + recordatorios">
          <DCArtboard id="wa" label="WhatsApp Business" width={402} height={874}>
            <IOSDevice width={402} height={874} dark>
              <PhoneInner>
                <MessagingMock theme={theme} channel="whatsapp" />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
          <DCArtboard id="sms" label="SMS" width={402} height={874}>
            <IOSDevice width={402} height={874} dark>
              <PhoneInner>
                <MessagingMock theme={theme} channel="sms" />
              </PhoneInner>
            </IOSDevice>
          </DCArtboard>
        </DCSection>

        {/* Sección 4: Portal del Barbero */}
        <DCSection id="barbero" title="Portal del Barbero — José Ramírez" subtitle="Cada barbero ve solo lo suyo · Stripe Connect Express + payouts directos">
          <DCArtboard id="b-hoy" label="Hoy · Agenda" width={1280} height={820}>
            <BrowserChrome theme={theme} url="jose.stylesbarbershop2.com">
              <PortalBarberoTab tab="hoy" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="b-cal" label="Calendario · Drag & drop" width={1280} height={820}>
            <BrowserChrome theme={theme} url="jose.stylesbarbershop2.com/calendario">
              <PortalBarberoTab tab="calendario" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="b-ing" label="Ingresos · Stripe" width={1280} height={820}>
            <BrowserChrome theme={theme} url="jose.stylesbarbershop2.com/ingresos">
              <PortalBarberoTab tab="ingresos" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="b-gal" label="Galería" width={1280} height={820}>
            <BrowserChrome theme={theme} url="jose.stylesbarbershop2.com/galeria">
              <PortalBarberoTab tab="galeria" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="b-res" label="Reseñas" width={1280} height={820}>
            <BrowserChrome theme={theme} url="jose.stylesbarbershop2.com/resenas">
              <PortalBarberoTab tab="resenas" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
        </DCSection>

        {/* Sección 5: Portal del Dueño */}
        <DCSection id="dueno" title="Portal del Dueño — Vista global" subtitle="Métricas agregadas · Sin ver dinero exacto de cada barbero · Booth rental automatizado">
          <DCArtboard id="d-dash" label="Dashboard" width={1280} height={820}>
            <BrowserChrome theme={theme} url="admin.stylesbarbershop2.com">
              <PortalDuenoTab tab="dashboard" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="d-ren" label="⚡ Booth rental" width={1280} height={820}>
            <BrowserChrome theme={theme} url="admin.stylesbarbershop2.com/rentas">
              <PortalDuenoTab tab="rentas" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="d-cal" label="Calendario global" width={1280} height={820}>
            <BrowserChrome theme={theme} url="admin.stylesbarbershop2.com/calendario">
              <PortalDuenoTab tab="calendario" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="d-bar" label="Barberos" width={1280} height={820}>
            <BrowserChrome theme={theme} url="admin.stylesbarbershop2.com/barberos">
              <PortalDuenoTab tab="barberos" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
          <DCArtboard id="d-msg" label="Templates SMS/WA" width={1280} height={820}>
            <BrowserChrome theme={theme} url="admin.stylesbarbershop2.com/mensajes">
              <PortalDuenoTab tab="mensajes" theme={theme} />
            </BrowserChrome>
          </DCArtboard>
        </DCSection>

        <DCPostIt top={48} right={42} rotate={-3} width={210}>
          <strong>Demo Styles Barbershop 2</strong><br/>
          Newark, NJ · Bilingüe ES/EN<br/>
          3 variantes de branding ↑ · Cambia desde el panel "Tweaks"
        </DCPostIt>
      </DesignCanvas>
    </>
  );
}

// Phone inner = remove iOS frame's nav bar / scroll area → use full body
function PhoneInner({ children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, paddingBottom: 0 }}>
      {children}
    </div>
  );
}

// Browser chrome wrapper for desktop portals
function BrowserChrome({ theme, url, children }) {
  const isLight = theme.bg.startsWith('#f');
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      background: isLight ? '#e8e6e0' : '#1a1815',
      borderRadius: 0,
    }}>
      <div style={{
        height: 38, padding: '0 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        background: isLight ? '#dad8d2' : '#0e0c0a',
        borderBottom: `1px solid ${isLight ? '#c5c2bc' : '#000'}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ED6A5E' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#F5BD4F' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#62C554' }} />
        </div>
        <div style={{
          flex: 1, maxWidth: 480, margin: '0 auto',
          padding: '5px 12px', borderRadius: 6,
          background: isLight ? '#f3f1eb' : '#2a2823',
          color: isLight ? '#3a3733' : '#bdb8ad',
          fontSize: 11, fontFamily: 'ui-monospace, monospace',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
          {url}
        </div>
        <div style={{ width: 50 }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function PortalBarberoTab({ tab, theme }) {
  // Force-render specific tab
  return <ForceTab tab={tab}><PortalBarbero theme={theme} /></ForceTab>;
}

function PortalDuenoTab({ tab, theme }) {
  return <ForceTab tab={tab}><PortalDueno theme={theme} /></ForceTab>;
}

// Helper to set initial tab via key prop (re-mount)
function ForceTab({ tab, children }) {
  return <div key={tab} data-force-tab={tab} style={{ width: '100%', height: '100%' }}>{children}</div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
