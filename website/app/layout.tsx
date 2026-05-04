import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SHOP } from "@/lib/shop";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-var",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SHOP.name} · ${SHOP.tagline}`,
    template: `%s · ${SHOP.name}`,
  },
  description: `${SHOP.name} — Barbería premium en Newark, NJ. ${SHOP.tagline}. ${SHOP.rating}★ con ${SHOP.reviews} reseñas. Reserva tu cita en 60 segundos.`,
  keywords: [
    "barbería Newark",
    "barber shop Newark NJ",
    "fade Newark",
    "Stylos Barbershop",
    "barbero hispano Newark",
    "corte de pelo Newark",
  ],
  authors: [{ name: SHOP.name }],
  metadataBase: new URL("https://stylosbarbershop2.com"),
  openGraph: {
    type: "website",
    locale: "es_US",
    url: "https://stylosbarbershop2.com",
    title: `${SHOP.name} · ${SHOP.tagline}`,
    description: `Barbería premium en Newark, NJ. Reserva online en 60 segundos.`,
    siteName: SHOP.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SHOP.name} · ${SHOP.tagline}`,
    description: `Barbería premium en Newark, NJ.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
