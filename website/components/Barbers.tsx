"use client";

import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { BARBERS } from "@/lib/shop";
import { cn } from "@/lib/cn";

export function Barbers() {
  return (
    <section id="barberos" className="py-24 lg:py-32 relative bg-ink-elev/30">
      <div className="container-x">
        <SectionHeader
          eyebrow="El equipo"
          title={<>Cuatro manos, <span className="gold-text italic">cuatro estilos</span></>}
          subtitle="Elige a tu barbero o deja que el sistema te asigne el primero disponible."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BARBERS.map((b, i) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card card-hover p-6 group relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative">
                <div
                  className={cn(
                    "aspect-square rounded-2xl mb-5 flex items-center justify-center font-display text-5xl font-bold text-ink relative overflow-hidden bg-gradient-to-br",
                    b.gradient
                  )}
                >
                  <span className="relative z-10">{b.initials}</span>
                  <div className="absolute inset-0 bg-noise opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-bone z-10">
                    <span className="px-2 py-1 rounded-full bg-ink/60 backdrop-blur-sm">
                      {b.specialty}
                    </span>
                  </div>
                </div>

                <h3 className="display text-xl">{b.name}</h3>
                <p className="text-xs text-gold mb-3">"{b.alias}" · {b.role}</p>
                <p className="text-sm text-bone-muted leading-relaxed mb-4 min-h-[60px]">
                  {b.bio}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-gold" fill="currentColor" />
                    <span className="text-bone font-medium">{b.rating}</span>
                    <span className="text-bone-dim text-xs">({b.reviews})</span>
                  </div>
                  <a
                    href="#reservar"
                    className="text-xs text-gold hover:text-gold-light flex items-center gap-1 group/cta"
                  >
                    Reservar
                    <ArrowUpRight size={12} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
