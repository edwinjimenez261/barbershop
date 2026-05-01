"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

const ITEMS = [
  { caption: "Fade alto · José", barber: "JR", gradient: "from-gold-400 to-gold-700", span: "lg:row-span-2" },
  { caption: "Corte + Barba · Carlos", barber: "CM", gradient: "from-amber-700 to-stone-900", span: "" },
  { caption: "Kids cut · Miguel", barber: "MS", gradient: "from-stone-600 to-stone-900", span: "" },
  { caption: "Diseño en nuca · Carlos", barber: "CM", gradient: "from-amber-600 to-stone-800", span: "lg:col-span-2" },
  { caption: "Mid fade · Luis", barber: "LP", gradient: "from-amber-500 to-stone-700", span: "" },
  { caption: "Barba premium · José", barber: "JR", gradient: "from-gold-500 to-gold-800", span: "" },
];

export function Gallery() {
  return (
    <section id="galeria" className="py-24 lg:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Galería"
          title={<>Trabajos <span className="gold-text italic">recientes</span></>}
          subtitle="Una pequeña muestra del trabajo del equipo esta semana."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                "relative rounded-2xl overflow-hidden border border-gold/10 group cursor-pointer",
                item.span
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", item.gradient)} />
              <div className="absolute inset-0 bg-noise opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Big initials backdrop */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-7xl lg:text-8xl font-bold text-bone/10 group-hover:scale-110 transition-transform duration-700">
                  {item.barber}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-bone font-medium">{item.caption}</span>
                  <Camera size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/stylosbarbershop2"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-md inline-flex"
          >
            Ver más en Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
