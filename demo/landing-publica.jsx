// Landing Pública — versión cinematográfica para mostrar en el sitio web
// Es la página que el cliente ve cuando entra a stylesbarbershop2.com desde el cel.
// Más espacio, hero a pantalla completa, sticky nav. CTA siempre visible.

function LandingPublica({ theme, setStep, setSelection }) {
  const { SHOP, BARBEROS, SERVICIOS, RESENAS } = window.SBData;
  const isLight = theme.bg.startsWith('#f') || theme.bg.startsWith('#e');
  const scrollRef = React.useRef(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const goReservar = () => { setStep && setStep('barberos'); };

  return (
    <div ref={scrollRef} className="ph-scroll" style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: theme.bg, color: theme.text,
      fontFamily: theme.fontBody,
      WebkitFontSmoothing: 'antialiased', position: 'relative',
    }}>
      {/* Sticky top nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '50px 16px 12px',
        background: scrolled
          ? (isLight ? `${theme.bg}f5` : `${theme.bg}f5`)
          : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
        transition: 'all 0.25s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#000', overflow: 'hidden',
            border: `1px solid ${theme.primary}`,
          }}>
            <img src="assets/styles-logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {scrolled && (
            <div style={{
              fontFamily: theme.fontDisplay, fontSize: 14, fontWeight: 700,
              letterSpacing: 0.3,
            }}>Styles Barbershop 2</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            display: 'flex', gap: 2, alignItems: 'center', fontSize: 11,
            padding: '4px 8px', borderRadius: 100,
            border: `1px solid ${theme.border}`,
            color: theme.textMuted,
          }}>
            <span style={{ color: theme.primary, fontWeight: 700 }}>ES</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>EN</span>
          </div>
          {scrolled && (
            <button onClick={goReservar} style={{
              padding: '7px 14px', background: theme.primary,
              color: isLight ? '#fff' : '#0a0a0a',
              border: 'none', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: 0.4,
              textTransform: 'uppercase', fontFamily: theme.fontBody,
              cursor: 'pointer',
            }}>Reservar</button>
          )}
        </div>
      </div>

      {/* HERO ─ casi pantalla completa */}
      <div style={{
        position: 'relative', marginTop: -68, paddingTop: 68,
        background: isLight
          ? `linear-gradient(180deg, ${theme.bg} 0%, ${theme.surfaceLight} 100%)`
          : `linear-gradient(180deg, #0c0a08 0%, ${theme.bg} 100%)`,
        color: theme.text,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Decorative bg pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 0%, ${theme.primary}26 0%, transparent 50%), radial-gradient(circle at 80% 100%, ${theme.primary}1a 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />
        {/* Texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: `repeating-linear-gradient(45deg, transparent 0 2px, rgba(255,255,255,0.015) 2px 4px)`,
          pointerEvents: 'none',
        }} />

        <div style={{ flex: 1, padding: '32px 24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
            color: theme.primary, marginBottom: 18, fontWeight: 600,
          }}>· EST. 2018 · NEWARK, NJ ·</div>

          <h1 style={{
            fontFamily: theme.fontDisplay,
            fontSize: 56, fontWeight: 700, lineHeight: 0.98,
            margin: '0 0 16px', letterSpacing: '-0.02em',
            color: theme.text,
          }}>El arte del<br/><em style={{ color: isLight ? theme.accent : theme.primary, fontStyle: 'italic' }}>buen corte</em></h1>

          <div style={{
            fontSize: 16, color: theme.textMuted,
            lineHeight: 1.55, maxWidth: 320, marginBottom: 36,
          }}>
            Cuatro maestros barberos. Cortes clásicos, fades modernos
            y la mejor barba de Newark.
          </div>

          {/* Hero CTA */}
          <button onClick={goReservar} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '20px 22px',
            background: theme.primary, color: isLight ? '#fff' : '#0a0a0a',
            border: 'none', borderRadius: 14,
            fontSize: 15, fontWeight: 700, letterSpacing: 0.5,
            cursor: 'pointer', textTransform: 'uppercase',
            fontFamily: theme.fontBody,
            boxShadow: `0 12px 40px ${theme.primary}50`,
          }}>
            <span>Reservar mi cita</span>
            <span style={{ fontSize: 18 }}>→</span>
          </button>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 14, fontSize: 12, color: theme.textDim }}>
            <span style={{ color: '#27AE60' }}>●</span>
            <span>Abierto ahora · cierra 8:00 PM</span>
            <span style={{ opacity: 0.4, margin: '0 4px' }}>·</span>
            <span>{SHOP.rating} ★ ({SHOP.reviews})</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          textAlign: 'center', paddingBottom: 24,
          fontSize: 10, color: theme.textDim,
          letterSpacing: 2, textTransform: 'uppercase',
          position: 'relative', zIndex: 1,
        }}>
          ↓ Conoce el shop
        </div>
      </div>

      {/* SECCIÓN: Stats / trust */}
      <div style={{
        padding: '40px 24px',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <Stat theme={theme} num="4.9" label="★ Rating" />
        <Stat theme={theme} num="287" label="Reseñas" />
        <Stat theme={theme} num="7" label="Días/sem" />
      </div>

      {/* SECCIÓN: Barberos */}
      <div style={{ padding: '48px 24px 8px' }}>
        <SectionKicker theme={theme}>· El equipo ·</SectionKicker>
        <h2 style={{
          fontFamily: theme.fontDisplay, fontSize: 36, fontWeight: 700,
          margin: '4px 0 8px', lineHeight: 1, letterSpacing: '-0.01em',
        }}>Maestros<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>barberos</em></h2>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 28, maxWidth: 280 }}>
          Cada uno con su estilo. Escoge tu favorito o déjanos asignarte uno.
        </div>
      </div>

      <div style={{ padding: '0 24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {BARBEROS.map((b, i) => (
          <button key={b.id} onClick={() => { setSelection && setSelection(s => ({...s, barbero: b.id})); goReservar(); }}
            style={{
              position: 'relative', overflow: 'hidden',
              padding: 0, background: theme.surface,
              border: `1px solid ${theme.border}`, borderRadius: 18,
              cursor: 'pointer', textAlign: 'left', width: '100%',
              fontFamily: 'inherit', color: 'inherit',
            }}>
            {/* Cover bg */}
            <div style={{
              height: 140, position: 'relative',
              background: `linear-gradient(135deg, ${b.color}66, ${b.color}22)`,
              borderBottom: `1px solid ${theme.border}`,
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(${i*30+45}deg, transparent 0 8px, rgba(0,0,0,0.08) 8px 9px)`,
              }} />
              <div style={{
                position: 'absolute', bottom: -32, left: 20,
                width: 72, height: 72, borderRadius: '50%',
                background: theme.surface,
                border: `3px solid ${theme.surface}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: theme.fontDisplay, fontSize: 26, fontWeight: 700,
                color: theme.primary,
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              }}>{b.foto}</div>
              <div style={{
                position: 'absolute', top: 12, right: 12,
                padding: '4px 10px', background: 'rgba(0,0,0,.5)',
                color: '#fff', borderRadius: 100,
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                textTransform: 'uppercase', backdropFilter: 'blur(4px)',
              }}>{b.rol.split('·')[0].trim()}</div>
            </div>
            <div style={{ padding: '40px 20px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <div style={{ fontFamily: theme.fontDisplay, fontWeight: 700, fontSize: 20, lineHeight: 1.1 }}>{b.nombre}</div>
                  <div style={{ fontSize: 11, color: theme.primary, fontWeight: 600, letterSpacing: 1, marginTop: 4, fontStyle: 'italic', fontFamily: theme.fontDisplay }}>"{b.alias}"</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}>
                  <span style={{ color: theme.primary }}>★</span>
                  <span style={{ fontWeight: 600 }}>{b.rating}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.45, marginTop: 10 }}>
                {b.bio}
              </div>
              <div style={{
                marginTop: 14, paddingTop: 14, borderTop: `1px solid ${theme.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ fontSize: 11, color: theme.textDim }}>
                  {b.instagram}
                </div>
                <div style={{
                  color: theme.primary, fontSize: 11, fontWeight: 700,
                  letterSpacing: 1, textTransform: 'uppercase',
                }}>Reservar →</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* SECCIÓN: Servicios */}
      <div style={{ padding: '48px 24px 8px', borderTop: `1px solid ${theme.border}`, marginTop: 40 }}>
        <SectionKicker theme={theme}>· Carta ·</SectionKicker>
        <h2 style={{
          fontFamily: theme.fontDisplay, fontSize: 36, fontWeight: 700,
          margin: '4px 0 8px', lineHeight: 1, letterSpacing: '-0.01em',
        }}>Servicios &<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>precios</em></h2>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 24, maxWidth: 280 }}>
          Precios "desde" — varían según el barbero.
        </div>
      </div>

      <div style={{ padding: '0 24px 8px' }}>
        {SERVICIOS.map((s, i) => (
          <div key={s.id} style={{
            padding: '18px 0',
            borderBottom: i < SERVICIOS.length - 1 ? `1px solid ${theme.border}` : 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: theme.fontDisplay, fontSize: 19, fontWeight: 600, lineHeight: 1.2 }}>{s.nombre}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4, lineHeight: 1.4 }}>{s.descripcion}</div>
              <div style={{ fontSize: 11, color: theme.textDim, marginTop: 6, letterSpacing: 0.5 }}>{s.duracion} MIN</div>
            </div>
            <div style={{
              fontFamily: theme.fontDisplay, fontSize: 24, fontWeight: 700,
              color: theme.primary, lineHeight: 1, whiteSpace: 'nowrap',
            }}>${s.precioBase}<span style={{ fontSize: 13, opacity: 0.6 }}>+</span></div>
          </div>
        ))}
      </div>

      {/* SECCIÓN: Galería */}
      <div style={{ padding: '48px 24px 16px', borderTop: `1px solid ${theme.border}`, marginTop: 40 }}>
        <SectionKicker theme={theme}>· Trabajo reciente ·</SectionKicker>
        <h2 style={{
          fontFamily: theme.fontDisplay, fontSize: 36, fontWeight: 700,
          margin: '4px 0 24px', lineHeight: 1, letterSpacing: '-0.01em',
        }}>Galería</h2>
      </div>
      <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[
          { h: 230, hue: 25 }, { h: 180, hue: 35 },
          { h: 180, hue: 45 }, { h: 230, hue: 28 },
          { h: 200, hue: 20 }, { h: 200, hue: 40 },
        ].map((g, i) => (
          <div key={i} style={{
            height: g.h, borderRadius: 10,
            background: `linear-gradient(${135 + i*30}deg, hsl(${g.hue}, 22%, ${isLight ? 65 : 22}%) 0%, hsl(${g.hue + 10}, 28%, ${isLight ? 50 : 12}%) 100%)`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(${45 + i*30}deg, transparent 0 4px, rgba(255,255,255,0.03) 4px 5px)`,
            }} />
            <div style={{
              position: 'absolute', bottom: 8, left: 8,
              fontSize: 9, color: 'rgba(255,255,255,.6)',
              letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600,
            }}>#{String(i+1).padStart(2,'0')}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', padding: '20px 24px 0' }}>
        <div style={{ fontSize: 12, color: theme.textMuted }}>
          Ver más en Instagram <span style={{ color: theme.primary, fontWeight: 600 }}>@stylesbarbershop2</span>
        </div>
      </div>

      {/* SECCIÓN: Reseñas */}
      <div style={{ padding: '48px 24px 16px', borderTop: `1px solid ${theme.border}`, marginTop: 40 }}>
        <SectionKicker theme={theme}>· Lo que dicen ·</SectionKicker>
        <h2 style={{
          fontFamily: theme.fontDisplay, fontSize: 36, fontWeight: 700,
          margin: '4px 0 8px', lineHeight: 1, letterSpacing: '-0.01em',
        }}>Reseñas<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>reales</em></h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: theme.primary, fontSize: 16 }}>★</span>)}
          </div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{SHOP.rating}</span>
          <span style={{ fontSize: 12, color: theme.textMuted }}>· {SHOP.reviews} reseñas en Google</span>
        </div>
      </div>
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {RESENAS.slice(0, 3).map((r, i) => {
          const b = BARBEROS.find(x => x.id === r.barbero);
          return (
            <div key={i} style={{
              padding: 18, background: theme.surface,
              border: `1px solid ${theme.border}`, borderRadius: 14,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: theme.primary, fontSize: 12 }}>★</span>)}
                </div>
                <div style={{ fontSize: 10, color: theme.textDim, letterSpacing: 0.5 }}>{r.fecha.toUpperCase()}</div>
              </div>
              <div style={{ fontSize: 13, color: theme.text, lineHeight: 1.55, fontStyle: 'italic', fontFamily: theme.fontDisplay, marginBottom: 12 }}>"{r.texto}"</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                paddingTop: 12, borderTop: `1px solid ${theme.border}`,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: theme.surfaceLight, color: theme.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, fontFamily: theme.fontDisplay,
                }}>{r.autor.split(' ').map(x => x[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{r.autor}</div>
                  <div style={{ fontSize: 10, color: theme.textMuted }}>Atendido por {b.nombre.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECCIÓN: Visítanos */}
      <div style={{ padding: '48px 24px 16px', borderTop: `1px solid ${theme.border}`, marginTop: 40 }}>
        <SectionKicker theme={theme}>· Visítanos ·</SectionKicker>
        <h2 style={{
          fontFamily: theme.fontDisplay, fontSize: 36, fontWeight: 700,
          margin: '4px 0 16px', lineHeight: 1, letterSpacing: '-0.01em',
        }}>Estamos en<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>Newark</em></h2>
      </div>

      {/* Mapa fake */}
      <div style={{ padding: '0 24px' }}>
        <div style={{
          height: 200, borderRadius: 14, overflow: 'hidden',
          background: isLight ? '#dde6ed' : '#1a1f25',
          position: 'relative', border: `1px solid ${theme.border}`,
        }}>
          {/* fake roads */}
          <svg viewBox="0 0 300 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <rect width="300" height="200" fill={isLight ? '#e6ece8' : '#181c20'} />
            {/* parks */}
            <rect x="20" y="20" width="60" height="40" fill={isLight ? '#c8d6c0' : '#1f2820'} />
            <rect x="220" y="130" width="70" height="50" fill={isLight ? '#c8d6c0' : '#1f2820'} />
            {/* roads */}
            <line x1="0" y1="100" x2="300" y2="100" stroke={isLight ? '#fff' : '#2a3038'} strokeWidth="6" />
            <line x1="150" y1="0" x2="150" y2="200" stroke={isLight ? '#fff' : '#2a3038'} strokeWidth="6" />
            <line x1="0" y1="50" x2="300" y2="50" stroke={isLight ? '#fff' : '#262b32'} strokeWidth="3" />
            <line x1="0" y1="160" x2="300" y2="160" stroke={isLight ? '#fff' : '#262b32'} strokeWidth="3" />
            <line x1="60" y1="0" x2="60" y2="200" stroke={isLight ? '#fff' : '#262b32'} strokeWidth="3" />
            <line x1="240" y1="0" x2="240" y2="200" stroke={isLight ? '#fff' : '#262b32'} strokeWidth="3" />
            {/* labels */}
            <text x="160" y="46" fill={isLight ? '#888' : '#555'} fontSize="8" fontFamily="sans-serif">Warwick St</text>
            <text x="6" y="98" fill={isLight ? '#888' : '#555'} fontSize="8" fontFamily="sans-serif">Ferry St</text>
          </svg>
          {/* pin */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <div style={{
              padding: '4px 10px', background: theme.primary,
              color: isLight ? '#fff' : '#0a0a0a',
              borderRadius: 8, fontSize: 11, fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
            }}>Styles Barbershop 2</div>
            <div style={{
              width: 0, height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `8px solid ${theme.primary}`,
            }} />
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: theme.primary,
              boxShadow: `0 0 0 6px ${theme.primary}33`,
              marginTop: -4,
            }} />
          </div>
        </div>

        <div style={{ marginTop: 16, padding: 16, background: theme.surface, borderRadius: 14, border: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 18, color: theme.primary }}>📍</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>49 Warwick St</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>Newark, NJ 07105</div>
            </div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}`,
          }}>
            <a style={{ padding: 10, background: theme.surfaceLight, borderRadius: 8, textAlign: 'center', fontSize: 12, fontWeight: 600, color: theme.text, textDecoration: 'none' }}>📞 Llamar</a>
            <a style={{ padding: 10, background: theme.surfaceLight, borderRadius: 8, textAlign: 'center', fontSize: 12, fontWeight: 600, color: theme.text, textDecoration: 'none' }}>🧭 Cómo llegar</a>
          </div>
        </div>

        {/* Hours */}
        <div style={{ marginTop: 16, padding: 16, background: theme.surface, borderRadius: 14, border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 11, color: theme.primary, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Horario</div>
          {Object.entries(SHOP.hours).map(([day, hrs], i) => (
            <div key={day} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '6px 0', fontSize: 13,
              borderBottom: i < 6 ? `1px solid ${theme.border}` : 'none',
              color: i === 0 ? theme.primary : theme.text,
              fontWeight: i === 0 ? 600 : 400,
            }}>
              <span>{day}</span>
              <span style={{ color: i === 0 ? theme.primary : theme.textMuted, fontFamily: theme.fontMono, fontSize: 12 }}>{hrs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div style={{ padding: '48px 24px 16px', textAlign: 'center' }}>
        <div style={{
          fontFamily: theme.fontDisplay, fontSize: 32, fontWeight: 700,
          lineHeight: 1.05, marginBottom: 8, letterSpacing: '-0.01em',
        }}>¿Listo para tu<br/><em style={{ color: theme.primary, fontStyle: 'italic' }}>próximo corte?</em></div>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 24, maxWidth: 280, margin: '0 auto 24px' }}>
          Reserva online en menos de un minuto. Confirmación al instante por SMS.
        </div>
        <button onClick={goReservar} style={{
          width: '100%', padding: '20px 22px',
          background: theme.primary, color: isLight ? '#fff' : '#0a0a0a',
          border: 'none', borderRadius: 14,
          fontSize: 15, fontWeight: 700, letterSpacing: 0.5,
          cursor: 'pointer', textTransform: 'uppercase',
          fontFamily: theme.fontBody,
          boxShadow: `0 12px 40px ${theme.primary}40`,
        }}>Reservar mi cita →</button>
      </div>

      {/* Footer */}
      <div style={{ padding: '40px 24px 50px', textAlign: 'center', borderTop: `1px solid ${theme.border}`, marginTop: 32 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#000', overflow: 'hidden',
          border: `1px solid ${theme.primary}`, margin: '0 auto 14px',
        }}>
          <img src="assets/styles-logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontFamily: theme.fontDisplay, fontSize: 18, fontWeight: 700, color: theme.primary, letterSpacing: 1 }}>STYLES BARBERSHOP 2</div>
        <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 8, letterSpacing: 0.5, lineHeight: 1.6 }}>
          49 Warwick St · Newark, NJ 07105<br/>
          (973) 555-0142
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 16, fontSize: 18 }}>
          <span style={{ color: theme.primary }}>📷</span>
          <span style={{ color: theme.primary }}>👍</span>
          <span style={{ color: theme.primary }}>🌐</span>
        </div>
        <div style={{ fontSize: 9, color: theme.textDim, marginTop: 20, letterSpacing: 1 }}>
          © 2026 STYLES BARBERSHOP 2 · NEWARK, NJ
        </div>
      </div>
    </div>
  );
}

function Stat({ theme, num, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: theme.fontDisplay, fontSize: 32, fontWeight: 700,
        color: theme.primary, lineHeight: 1, letterSpacing: '-0.02em',
      }}>{num}</div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 6, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function SectionKicker({ theme, children }) {
  return (
    <div style={{
      fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
      color: theme.primary, fontWeight: 700, marginBottom: 4,
    }}>{children}</div>
  );
}

window.LandingPublica = LandingPublica;
