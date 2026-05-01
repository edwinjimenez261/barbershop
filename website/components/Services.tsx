"use client";

import { motion } from "framer-motion";
import { Scissors, Zap, Star, Sparkles, Flame, Heart, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SERVICES } from "@/lib/shop";
import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = {
  scissors: Scissors,
  zap: Zap,
  star: Star,
  sparkles: Sparkles,
  flame: Flame,
  heart: Heart,
};

export function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="Servicios"
          title={<>Cortes que cuentan tu <span className="gold-text italic">historia</span></>}
          subtitle="Precios desde. Cada barbero ajusta según experiencia y complejidad del trabajo."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Scissors;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={cn(
                  "card card-hover p-8 group relative overflow-hidden",
                  service.featured && "border-gold/40 bg-gradient-to-br from-ink-surface to-ink-light/40"
                )}
              >
                {service.featured && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-gold-gradient text-ink font-bold">
                    Más pedido
                  </div>
                )}

                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors" />

                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Icon size={24} />
                  </div>

                  <h3 className="display text-2xl mb-2">{service.name}</h3>
                  <p className="text-bone-muted text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="flex items-end justify-between pt-6 border-t border-gold/10">
                    <div>
                      <div className="text-xs text-bone-dim uppercase tracking-wider">desde</div>
                      <div className="font-display text-3xl gold-text font-semibold">
                        ${service.price}
                      </div>
                    </div>
                    <div className="text-xs text-bone-muted">{service.duration} min</div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
