"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { BARBERS, SERVICES, SHOP } from "@/lib/shop";

const BENEFITS = [
  "Confirmación instantánea por WhatsApp",
  "Recordatorios automáticos 24h y 2h antes",
  "Cancela o reagenda con un click",
  "Sin tarjeta requerida para reservar",
];

export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [barber, setBarber] = useState("any");
  const [service, setService] = useState(SERVICES[0]?.id ?? "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const svc = SERVICES.find((s) => s.id === service);
    const brb = barber === "any" ? "primero disponible" : BARBERS.find((b) => b.id === barber)?.name;
    const text = encodeURIComponent(
      `Hola Stylos! Quiero reservar:\n` +
        `• Nombre: ${name}\n` +
        `• Servicio: ${svc?.name} ($${svc?.price})\n` +
        `• Barbero: ${brb}\n` +
        `• Tel: ${phone}`
    );
    window.open(`${SHOP.whatsapp}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="reservar" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background flair */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-x grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            ¿Listo?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="display text-4xl md:text-5xl lg:text-6xl mt-4 text-balance"
          >
            Reserva en <span className="gold-text italic">60 segundos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-bone-muted text-lg leading-relaxed"
          >
            Elige barbero, servicio y horario. Recibirás confirmación por
            WhatsApp y un recordatorio antes de tu cita.
          </motion.p>

          <ul className="mt-10 space-y-4">
            {BENEFITS.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-bone-muted"
              >
                <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <Check size={12} strokeWidth={3} />
                </span>
                {b}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card p-8 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute -inset-px rounded-2xl bg-gold-gradient opacity-20 blur -z-10" />

          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <Sparkles size={18} />
            </div>
            <h3 className="display text-2xl">Reserva rápida</h3>
          </div>

          <div className="space-y-5">
            <Field label="Nombre">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="input"
              />
            </Field>

            <Field label="WhatsApp">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(973) 555-0123"
                required
                className="input"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Barbero">
                <select value={barber} onChange={(e) => setBarber(e.target.value)} className="input">
                  <option value="any">Primero disponible</option>
                  {BARBERS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Servicio">
                <select value={service} onChange={(e) => setService(e.target.value)} className="input">
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — ${s.price}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full mt-8 group"
          >
            <MessageCircle size={18} />
            {submitted ? "Reabrir WhatsApp" : "Reservar por WhatsApp"}
          </button>

          <p className="text-xs text-bone-dim text-center mt-4">
            Sin tarjeta para reservar · Pagas en el local
          </p>
        </motion.form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(28, 24, 20, 0.6);
          border: 1px solid rgba(201, 169, 97, 0.15);
          border-radius: 0.75rem;
          color: #f5f0e6;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: rgba(201, 169, 97, 0.6);
          background: rgba(28, 24, 20, 0.9);
          box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.1);
        }
        .input::placeholder {
          color: rgba(245, 240, 230, 0.3);
        }
        select.input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%23C9A961' stroke-width='2'%3E%3Cpath d='M3 5l3 3 3-3'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-bone-muted mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );
}
