"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, AtSign, Clock } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SHOP } from "@/lib/shop";

export function Contact() {
  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Visítanos"
          title={
            <>
              <span className="block text-2xl md:text-3xl text-gold mb-2">49 Warwick St</span>
              Newark, <span className="gold-text italic">New Jersey</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Stylized map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card relative overflow-hidden min-h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ink-light/40 to-ink-elev" />

            {/* Grid lines for "map" feel */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A961" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Decorative roads */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <line x1="0" y1="40%" x2="100%" y2="55%" stroke="#C9A961" strokeWidth="2" />
              <line x1="20%" y1="0" x2="35%" y2="100%" stroke="#C9A961" strokeWidth="1.5" />
              <line x1="60%" y1="0" x2="75%" y2="100%" stroke="#C9A961" strokeWidth="1.5" />
              <line x1="0" y1="75%" x2="100%" y2="65%" stroke="#C9A961" strokeWidth="1" />
            </svg>

            {/* Pin */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-gold/20 blur-xl animate-pulse" />
                <div className="relative h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-lg">
                  <MapPin size={28} className="text-ink" strokeWidth={2.5} />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold" />
              </div>

              <div className="mt-6 text-center">
                <div className="font-display text-xl text-bone">Stylos Barbershop 2</div>
                <div className="text-xs text-bone-muted">{SHOP.address}</div>
              </div>
            </motion.div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(SHOP.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 right-5 btn btn-primary btn-sm"
            >
              Cómo llegar →
            </a>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8 space-y-7"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gold" />
                <h3 className="display text-xl">Horario</h3>
              </div>
              <ul className="space-y-2.5">
                {SHOP.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between items-center text-sm py-1.5 border-b border-gold/5 last:border-0"
                  >
                    <span className="text-bone-muted">{h.day}</span>
                    <span className="text-bone font-medium">
                      {h.open} – {h.close}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="divider-gold" />

            <div className="space-y-3">
              <ContactRow
                icon={<Phone size={16} />}
                label="Teléfono"
                value={SHOP.phone}
                href={`tel:${SHOP.phoneRaw}`}
              />
              <ContactRow
                icon={<MessageCircle size={16} />}
                label="WhatsApp"
                value={SHOP.phone}
                href={SHOP.whatsapp}
              />
              <ContactRow
                icon={<AtSign size={16} />}
                label="Instagram"
                value={SHOP.instagramHandle}
                href={SHOP.instagram}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-gold/5 transition-colors group"
    >
      <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-bone-dim uppercase tracking-wider">{label}</div>
        <div className="text-sm text-bone font-medium truncate">{value}</div>
      </div>
    </a>
  );
}
