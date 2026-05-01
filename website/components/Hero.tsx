"use client";

import { motion } from "framer-motion";
import { Phone, Star, Clock, Sparkles } from "lucide-react";
import { SHOP } from "@/lib/shop";

const SLOTS = [
  { day: "Hoy", time: "3:30 PM" },
  { day: "Hoy", time: "5:00 PM" },
  { day: "Hoy", time: "7:00 PM" },
  { day: "Mañana", time: "10:30 AM" },
  { day: "Mañana", time: "12:00 PM" },
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-dark/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <div className="container-x grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center w-full">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="eyebrow"
          >
            Newark, NJ · Desde {SHOP.foundedYear}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="display text-6xl md:text-7xl lg:text-8xl mt-6 text-balance"
          >
            Calidad, estilo
            <br />
            y <span className="shine-text italic">confianza</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-bone-muted max-w-xl leading-relaxed"
          >
            Cuatro barberos. Una sola obsesión: el corte perfecto. Reserva en
            menos de 60 segundos y recibe tu confirmación por WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#reservar" className="btn btn-primary btn-lg group">
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              Reservar cita
            </a>
            <a href={`tel:${SHOP.phoneRaw}`} className="btn btn-ghost btn-lg">
              <Phone size={18} />
              {SHOP.phone}
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-lg"
          >
            <li className="text-center sm:text-left">
              <div className="flex items-center gap-1 text-gold">
                <span className="font-display text-3xl font-bold">{SHOP.rating}</span>
                <Star size={18} fill="currentColor" />
              </div>
              <span className="text-xs text-bone-dim mt-1 block">{SHOP.reviews} reseñas</span>
            </li>
            <li className="text-center sm:text-left">
              <span className="font-display text-3xl font-bold text-gold">{SHOP.yearsOpen}+</span>
              <span className="text-xs text-bone-dim mt-1 block">años abiertos</span>
            </li>
            <li className="text-center sm:text-left">
              <span className="font-display text-3xl font-bold text-gold">7</span>
              <span className="text-xs text-bone-dim mt-1 block">días a la semana</span>
            </li>
          </motion.ul>
        </div>

        {/* Booking card */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative gold ring */}
          <div className="absolute -inset-px rounded-3xl bg-gold-gradient opacity-50 blur-md -z-10" />

          <div className="card p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10" />

            <div className="flex items-center gap-2 text-xs text-bone-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span>Abierto ahora · cierra a las 8:00 PM</span>
            </div>

            <h3 className="display text-2xl mt-4 mb-2">Próximas horas disponibles</h3>
            <p className="text-sm text-bone-muted mb-6">
              <Clock size={14} className="inline mr-1" />
              Confirmación instantánea por WhatsApp
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {SLOTS.map((s, i) => (
                <motion.button
                  key={`${s.day}-${s.time}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="rounded-xl border border-gold/15 bg-ink-light/40 p-3 text-left hover:border-gold/50 hover:bg-gold/5 transition-all group"
                >
                  <div className="text-xs text-bone-dim group-hover:text-gold/70">{s.day}</div>
                  <div className="text-sm font-medium text-bone group-hover:text-gold">{s.time}</div>
                </motion.button>
              ))}
              <button className="rounded-xl border border-dashed border-gold/30 p-3 text-center text-sm text-gold hover:bg-gold/5 transition-colors">
                + 24 más
              </button>
            </div>

            <a href="#reservar" className="btn btn-primary btn-md w-full">
              Ver todos los horarios
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
