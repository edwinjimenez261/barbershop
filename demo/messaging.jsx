// SMS / WhatsApp mockup — visual de notificaciones (mobile)

function MessagingMock({ theme, channel = 'whatsapp' }) {
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: channel === 'whatsapp' ? '#0B141B' : '#000',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      display: 'flex', flexDirection: 'column',
    }}>
      {channel === 'whatsapp' ? <WhatsAppView /> : <SMSView />}
    </div>
  );
}

function WhatsAppView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        paddingTop: 56, paddingBottom: 10, paddingLeft: 12, paddingRight: 16,
        background: '#1F2C34', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '0.5px solid rgba(255,255,255,.08)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#00A884"><path d="M15 18l-6-6 6-6" stroke="#00A884" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: '#000', overflow: 'hidden',
          border: '1px solid #C9A961',
        }}>
          <img src="assets/styles-logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Styles Barbershop 2</div>
          <div style={{ fontSize: 11, color: '#8696A0' }}>Cuenta de empresa · en línea</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#8696A0"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14z"/></svg>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.02) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}>
        <DateBadge>HOY</DateBadge>
        <WAMsg>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#C9A961' }}>✂ Styles Barbershop 2</span>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 6 }}>
            ¡Hola <strong>Roberto</strong>! 👋
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 8 }}>
            Tu cita está confirmada ✅
          </div>
          <div style={{
            background: 'rgba(0,0,0,.25)', borderRadius: 8, padding: '10px 12px',
            borderLeft: '3px solid #C9A961', marginBottom: 8, fontSize: 13,
          }}>
            <div style={{ marginBottom: 4 }}>📅 <strong>Vie 1 May, 10:00 AM</strong></div>
            <div style={{ marginBottom: 4 }}>✂ <strong>Corte + Barba</strong> · 45 min</div>
            <div style={{ marginBottom: 4 }}>👨 Con <strong>José Ramírez</strong></div>
            <div>📍 49 Warwick St, Newark NJ</div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#E9EDF0' }}>
            Depósito: <strong>$15.00</strong> ✓ pagado<br/>
            Resto en local: $40.00
          </div>
          <Time>10:23 AM ✓✓</Time>
        </WAMsg>
        <WAMsg>
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>
            ¿Necesitas modificar tu cita? Responde:<br/>
            • <strong>CANCELAR</strong> para cancelar<br/>
            • <strong>CAMBIAR</strong> para reagendar<br/>
            • <strong>ENGLISH</strong> for English
          </div>
          <Time>10:23 AM ✓✓</Time>
        </WAMsg>

        <DateBadge>JUE 30 ABR · RECORDATORIO 24H</DateBadge>
        <WAMsg>
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>
            🔔 Recordatorio: <strong>mañana a las 10:00 AM</strong> tienes tu cita con José en Styles Barbershop 2.
            <br/><br/>
            ¿Confirmas que vas a llegar?
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <button style={{ flex: 1, padding: '8px', background: 'rgba(0,168,132,.15)', color: '#00A884', border: '1px solid rgba(0,168,132,.3)', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>✓ Sí, voy</button>
            <button style={{ flex: 1, padding: '8px', background: 'transparent', color: '#8696A0', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Cambiar hora</button>
          </div>
          <Time>4:00 PM ✓✓</Time>
        </WAMsg>
      </div>
    </div>
  );
}

function WAMsg({ children }) {
  return (
    <div style={{
      alignSelf: 'flex-start', maxWidth: '88%',
      background: '#1F2C34', borderRadius: 8, borderTopLeftRadius: 0,
      padding: '8px 10px 6px 10px', position: 'relative',
      boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
    }}>{children}</div>
  );
}

function Time({ children }) {
  return <div style={{ fontSize: 10, color: '#8696A0', textAlign: 'right', marginTop: 4 }}>{children}</div>;
}

function DateBadge({ children }) {
  return (
    <div style={{ alignSelf: 'center', fontSize: 11, padding: '5px 10px', background: '#1F2C34', color: '#8696A0', borderRadius: 6, fontWeight: 600, letterSpacing: 0.5, margin: '8px 0' }}>{children}</div>
  );
}

function SMSView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        paddingTop: 56, paddingBottom: 14, textAlign: 'center',
        borderBottom: '0.5px solid rgba(255,255,255,.1)',
      }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#000', overflow: 'hidden', border: '1px solid #C9A961', margin: '0 auto 6px' }}>
          <img src="assets/styles-logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Styles Barbershop 2 ›</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>+1 (973) 555-0142</div>
      </div>
      <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: '#3B3B3D', color: '#fff', padding: '9px 13px', borderRadius: 18, fontSize: 14, lineHeight: 1.4 }}>
          ¡Hola Roberto! Tu cita en Styles Barbershop 2 con José está confirmada para el VIE 1 MAY a las 10:00 AM. Depósito $15 pagado ✓. Si necesitas cancelar responde CANCELAR. ✂
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textAlign: 'center', margin: '4px 0' }}>10:23 AM · Entregado</div>
      </div>
    </div>
  );
}

window.MessagingMock = MessagingMock;
