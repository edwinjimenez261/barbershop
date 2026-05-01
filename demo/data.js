// Datos compartidos para Styles Barbershop 2 demo

const SHOP = {
  name: 'Styles Barbershop 2',
  tagline: 'Calidad, estilo y confianza',
  address: '49 Warwick St, Newark, NJ 07105',
  phone: '(973) 555-0142',
  hours: {
    'Lun': '10:00 AM – 8:00 PM',
    'Mar': '10:00 AM – 8:00 PM',
    'Mié': '10:00 AM – 8:00 PM',
    'Jue': '10:00 AM – 8:00 PM',
    'Vie': '10:00 AM – 9:00 PM',
    'Sáb': '9:00 AM – 9:00 PM',
    'Dom': '10:00 AM – 5:00 PM',
  },
  rating: 4.9,
  reviews: 287,
};

const BARBEROS = [
  {
    id: 'jose',
    nombre: 'José Ramírez',
    alias: 'El Maestro',
    rol: 'Senior · 15 años',
    bio: 'Especialista en fades clásicos, diseños y barba con toalla caliente.',
    foto: 'JR',
    color: '#C9A961',
    rating: 4.95,
    reviews: 124,
    citasHoy: 7,
    ingresosSemana: 1840,
    rentaSilla: 250,
    proxPago: 'Lun 4 May',
    instagram: '@jose_thecuts',
  },
  {
    id: 'carlos',
    nombre: 'Carlos Mendoza',
    alias: 'Carlito',
    rol: 'Senior · 8 años',
    bio: 'Cortes modernos, diseños creativos y enchape perfecto.',
    foto: 'CM',
    color: '#8B6F47',
    rating: 4.88,
    reviews: 89,
    citasHoy: 5,
    ingresosSemana: 1320,
    rentaSilla: 200,
    proxPago: 'Lun 4 May',
    instagram: '@carlito_barber',
  },
  {
    id: 'miguel',
    nombre: 'Miguel Santos',
    alias: 'Miguelito',
    rol: 'Mid · 4 años',
    bio: 'Especialista en cortes infantiles y kids cuts.',
    foto: 'MS',
    color: '#5D4E37',
    rating: 4.82,
    reviews: 56,
    citasHoy: 6,
    ingresosSemana: 980,
    rentaSilla: 180,
    proxPago: 'Lun 4 May',
    instagram: '@miguel_styles',
  },
  {
    id: 'luis',
    nombre: 'Luis Pérez',
    alias: 'Junior',
    rol: 'Junior · 2 años',
    bio: 'Fades, líneas limpias y precios accesibles.',
    foto: 'LP',
    color: '#A0826D',
    rating: 4.75,
    reviews: 32,
    citasHoy: 4,
    ingresosSemana: 720,
    rentaSilla: 150,
    proxPago: 'Mar 5 May',
    instagram: '@luis_thebarber',
  },
];

const SERVICIOS = [
  { id: 'corte', nombre: 'Corte clásico', duracion: 30, precioBase: 25, descripcion: 'Corte tradicional con tijera y máquina' },
  { id: 'fade', nombre: 'Fade', duracion: 30, precioBase: 30, descripcion: 'Degradado limpio (low, mid o high fade)' },
  { id: 'corte_barba', nombre: 'Corte + Barba', duracion: 45, precioBase: 40, descripcion: 'Corte completo más arreglo de barba' },
  { id: 'diseno', nombre: 'Diseño / Líneas', duracion: 60, precioBase: 50, descripcion: 'Corte con diseño personalizado' },
  { id: 'barba_premium', nombre: 'Barba premium', duracion: 30, precioBase: 25, descripcion: 'Arreglo de barba con toalla caliente y aceites' },
  { id: 'kids', nombre: 'Corte niño', duracion: 30, precioBase: 20, descripcion: 'Corte para menores de 12 años' },
];

// Override de precios por barbero
const PRECIOS = {
  jose: { corte: 35, fade: 45, corte_barba: 55, diseno: 65, barba_premium: 35 },
  carlos: { corte: 30, fade: 35, corte_barba: 45, diseno: 55, barba_premium: 30 },
  miguel: { corte: 25, fade: 30, corte_barba: 40, diseno: 50, kids: 20, barba_premium: 25 },
  luis: { corte: 20, fade: 25, corte_barba: 35, diseno: 45, kids: 18 },
};

// Citas del día actual para el calendario
const CITAS_HOY = [
  { id: 1, barbero: 'jose', cliente: 'Roberto Núñez', servicio: 'corte_barba', hora: '10:00', estado: 'confirmada', deposito: 15 },
  { id: 2, barbero: 'jose', cliente: 'Andrés Vega', servicio: 'fade', hora: '11:00', estado: 'confirmada', deposito: 10 },
  { id: 3, barbero: 'jose', cliente: 'Manuel López', servicio: 'diseno', hora: '12:30', estado: 'en_curso', deposito: 20 },
  { id: 4, barbero: 'jose', cliente: 'Pedro Cruz', servicio: 'corte', hora: '14:00', estado: 'confirmada', deposito: 10 },
  { id: 5, barbero: 'jose', cliente: 'Diego Morales', servicio: 'corte_barba', hora: '15:30', estado: 'confirmada', deposito: 15 },
  { id: 6, barbero: 'jose', cliente: 'Walk-in', servicio: 'fade', hora: '17:00', estado: 'libre', deposito: 0 },
  { id: 7, barbero: 'jose', cliente: 'Javier Ortiz', servicio: 'corte', hora: '18:30', estado: 'confirmada', deposito: 10 },
  { id: 8, barbero: 'carlos', cliente: 'Eduardo Rivas', servicio: 'fade', hora: '11:00', estado: 'confirmada', deposito: 10 },
  { id: 9, barbero: 'carlos', cliente: 'Tomás Herrera', servicio: 'corte', hora: '12:00', estado: 'confirmada', deposito: 0 },
  { id: 10, barbero: 'carlos', cliente: 'Ricardo Soto', servicio: 'corte_barba', hora: '14:30', estado: 'en_curso', deposito: 15 },
  { id: 11, barbero: 'carlos', cliente: 'Antonio Gil', servicio: 'fade', hora: '16:00', estado: 'confirmada', deposito: 10 },
  { id: 12, barbero: 'miguel', cliente: 'Sebastián M.', servicio: 'kids', hora: '10:30', estado: 'confirmada', deposito: 0 },
  { id: 13, barbero: 'miguel', cliente: 'Joaquín R.', servicio: 'kids', hora: '11:30', estado: 'confirmada', deposito: 0 },
  { id: 14, barbero: 'miguel', cliente: 'David Castillo', servicio: 'fade', hora: '13:00', estado: 'confirmada', deposito: 10 },
  { id: 15, barbero: 'miguel', cliente: 'Jorge Mejía', servicio: 'corte', hora: '15:00', estado: 'confirmada', deposito: 10 },
  { id: 16, barbero: 'luis', cliente: 'Iván Flores', servicio: 'fade', hora: '12:00', estado: 'confirmada', deposito: 10 },
  { id: 17, barbero: 'luis', cliente: 'Raúl Bautista', servicio: 'corte', hora: '14:00', estado: 'confirmada', deposito: 0 },
  { id: 18, barbero: 'luis', cliente: 'Camilo Ruiz', servicio: 'fade', hora: '16:30', estado: 'confirmada', deposito: 10 },
];

const RESENAS = [
  { autor: 'Roberto N.', barbero: 'jose', rating: 5, fecha: 'hace 2 días', texto: 'José es un maestro. El fade quedó perfecto y la barba con la toalla caliente es otro nivel. 100% recomendado.' },
  { autor: 'Andrés V.', barbero: 'jose', rating: 5, fecha: 'hace 5 días', texto: 'Llevo 3 años yendo. Siempre puntual, siempre limpio. El mejor de Newark.' },
  { autor: 'Eduardo R.', barbero: 'carlos', rating: 5, fecha: 'hace 1 día', texto: 'Carlito hizo un diseño en la nuca brutal. Muy creativo y trabaja rápido.' },
  { autor: 'Sebastián M.', barbero: 'miguel', rating: 5, fecha: 'hace 3 días', texto: 'Llevo a mi hijo con Miguel. Tiene paciencia y los niños lo aman.' },
  { autor: 'Iván F.', barbero: 'luis', rating: 5, fecha: 'hace 1 semana', texto: 'Luis está empezando pero tiene mano. Buen precio, buen corte.' },
];

window.SBData = { SHOP, BARBEROS, SERVICIOS, PRECIOS, CITAS_HOY, RESENAS };
