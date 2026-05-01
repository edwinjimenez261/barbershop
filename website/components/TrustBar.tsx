"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Languages, ShieldCheck } from "lucide-react";

const ITEMS = [
  { Icon: Star, label: "4.9 ★", sub: "Google Reviews" },
  { Icon: MessageCircle, label: "WhatsApp", sub: "Confirmación en segundos" },
  { Icon: Languages, label: "Bilingüe", sub: "Español · English" },
  { Icon: ShieldCheck, label: "Pago seguro", sub: "Tarjeta o efectivo" },
];

export function TrustBar() {
  return (
    <section className="border-y border-gold/10 bg-ink-elev/40">
      <div className="container-x py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map(({ Icon, label, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="shrink-0 h-10 w-10 rounded-full border border-gold/20 flex items-center justify-center text-gold">
              <Icon size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-bone">{label}</div>
              <div className="text-xs text-bone-dim">{sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
