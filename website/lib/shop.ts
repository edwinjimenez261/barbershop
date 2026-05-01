export const SHOP = {
  name: "Stylos Barbershop 2",
  tagline: "Calidad, estilo y confianza",
  address: "49 Warwick St, Newark, NJ 07105",
  phone: "(973) 555-0142",
  phoneRaw: "+19735550142",
  whatsapp: "https://wa.me/19735550142",
  instagram: "https://instagram.com/stylosbarbershop2",
  instagramHandle: "@stylosbarbershop2",
  rating: 4.9,
  reviews: 287,
  yearsOpen: 11,
  foundedYear: 2014,
  hours: [
    { day: "Lunes", open: "10:00 AM", close: "8:00 PM" },
    { day: "Martes", open: "10:00 AM", close: "8:00 PM" },
    { day: "Miércoles", open: "10:00 AM", close: "8:00 PM" },
    { day: "Jueves", open: "10:00 AM", close: "8:00 PM" },
    { day: "Viernes", open: "10:00 AM", close: "9:00 PM" },
    { day: "Sábado", open: "9:00 AM", close: "9:00 PM" },
    { day: "Domingo", open: "10:00 AM", close: "5:00 PM" },
  ],
} as const;

export type Barber = {
  id: string;
  name: string;
  alias: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
  rating: number;
  reviews: number;
  instagram: string;
  specialty: string;
};

export const BARBERS: Barber[] = [
  {
    id: "jose",
    name: "José Ramírez",
    alias: "El Maestro",
    role: "Senior · 15 años",
    bio: "Especialista en fades clásicos, diseños y barba con toalla caliente.",
    initials: "JR",
    gradient: "from-gold-300 via-gold-500 to-gold-700",
    rating: 4.95,
    reviews: 124,
    instagram: "@jose_thecuts",
    specialty: "Fades & Barba",
  },
  {
    id: "carlos",
    name: "Carlos Mendoza",
    alias: "Carlito",
    role: "Senior · 8 años",
    bio: "Cortes modernos, diseños creativos y enchape perfecto.",
    initials: "CM",
    gradient: "from-amber-400 via-amber-700 to-stone-800",
    rating: 4.88,
    reviews: 89,
    instagram: "@carlito_barber",
    specialty: "Diseños & Modernos",
  },
  {
    id: "miguel",
    name: "Miguel Santos",
    alias: "Miguelito",
    role: "Mid · 4 años",
    bio: "Especialista en cortes infantiles y kids cuts.",
    initials: "MS",
    gradient: "from-stone-500 via-stone-700 to-stone-900",
    rating: 4.82,
    reviews: 56,
    instagram: "@miguel_styles",
    specialty: "Niños & Familia",
  },
  {
    id: "luis",
    name: "Luis Pérez",
    alias: "Junior",
    role: "Junior · 2 años",
    bio: "Fades, líneas limpias y precios accesibles.",
    initials: "LP",
    gradient: "from-amber-300 via-amber-600 to-stone-700",
    rating: 4.75,
    reviews: 32,
    instagram: "@luis_thebarber",
    specialty: "Fades accesibles",
  },
];

export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  icon: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte clásico",
    duration: 30,
    price: 25,
    description: "Tijera y máquina, técnica tradicional con acabado perfecto.",
    icon: "scissors",
  },
  {
    id: "fade",
    name: "Fade",
    duration: 30,
    price: 30,
    description: "Degradado limpio — low, mid o high. Líneas marcadas y simetría.",
    icon: "zap",
    featured: true,
  },
  {
    id: "corte_barba",
    name: "Corte + Barba",
    duration: 45,
    price: 40,
    description: "Corte completo con arreglo y perfilado de barba.",
    icon: "star",
  },
  {
    id: "diseno",
    name: "Diseño / Líneas",
    duration: 60,
    price: 50,
    description: "Corte personalizado con diseños y trazos a navaja.",
    icon: "sparkles",
  },
  {
    id: "barba",
    name: "Barba premium",
    duration: 30,
    price: 25,
    description: "Toalla caliente, aceites premium y perfilado a navaja.",
    icon: "flame",
  },
  {
    id: "kids",
    name: "Corte niño",
    duration: 30,
    price: 18,
    description: "Especial para menores de 12 años. Paciencia y diversión.",
    icon: "heart",
  },
];

export type Review = {
  author: string;
  barberId: string;
  rating: number;
  date: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    author: "Roberto N.",
    barberId: "jose",
    rating: 5,
    date: "hace 2 días",
    text: "José es un maestro. El fade quedó perfecto y la barba con la toalla caliente es otro nivel. 100% recomendado.",
  },
  {
    author: "Andrés V.",
    barberId: "jose",
    rating: 5,
    date: "hace 5 días",
    text: "Llevo 3 años yendo. Siempre puntual, siempre limpio. El mejor de Newark sin duda.",
  },
  {
    author: "Eduardo R.",
    barberId: "carlos",
    rating: 5,
    date: "hace 1 día",
    text: "Carlito hizo un diseño en la nuca brutal. Muy creativo y trabaja rápido.",
  },
  {
    author: "Sebastián M.",
    barberId: "miguel",
    rating: 5,
    date: "hace 3 días",
    text: "Llevo a mi hijo con Miguel. Tiene paciencia y los niños lo aman.",
  },
  {
    author: "Iván F.",
    barberId: "luis",
    rating: 5,
    date: "hace 1 semana",
    text: "Luis está empezando pero tiene mano. Buen precio, buen corte.",
  },
  {
    author: "Diego M.",
    barberId: "jose",
    rating: 5,
    date: "hace 2 semanas",
    text: "El sistema de reservas por WhatsApp es lo mejor. Ya no pierdo el turno.",
  },
];
