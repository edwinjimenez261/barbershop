"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { REVIEWS, BARBERS } from "@/lib/shop";

export function Reviews() {
  return (
    <section id="resenas" className="py-24 lg:py-32 bg-ink-elev/30 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="Reseñas"
          title={<>Lo que dicen nuestros <span className="gold-text italic">clientes</span></>}
          subtitle="4.9 estrellas en Google · 287 reseñas verificadas."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => {
            const barber = BARBERS.find((b) => b.id === r.barberId);
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card card-hover p-7 relative group"
              >
                <Quote
                  size={48}
                  className="absolute top-5 right-5 text-gold/10 group-hover:text-gold/20 transition-colors"
                />

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="text-gold" fill="currentColor" />
                  ))}
                </div>

                <p className="text-bone leading-relaxed mb-6">"{r.text}"</p>

                <footer className="flex items-center justify-between pt-5 border-t border-gold/10">
                  <div>
                    <div className="text-sm text-bone font-medium">{r.author}</div>
                    <div className="text-xs text-bone-dim">{r.date}</div>
                  </div>
                  {barber && (
                    <div className="text-xs text-gold/80">
                      con <span className="text-gold">{barber.alias}</span>
                    </div>
                  )}
                </footer>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
