"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, Star } from "lucide-react";
import { salon, trustItems } from "@/lib/data";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[88svh] overflow-hidden pt-18">
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 1.04, opacity: 0.84 }}
        animate={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-barber.png"
          alt="Premium Barber-Salon in Langen mit Herrenhaarschnitt"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#080807] via-[#080807]/86 to-[#080807]/22" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090907] via-transparent to-[#090907]/30" />

      <div className="relative mx-auto flex min-h-[calc(88svh-4.5rem)] max-w-7xl items-center px-5 py-16 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 border border-[#d3ae73]/35 bg-black/24 px-4 py-2 text-sm text-[#d3ae73] backdrop-blur">
            <Star className="size-4 fill-[#d3ae73]" aria-hidden="true" />
            {salon.name} · Herrenfriseur in {salon.city}
          </div>
          <h1 className="font-display text-5xl leading-[0.98] text-[#f7f1e7] sm:text-7xl lg:text-8xl">
            Premium Barber Experience in Langen
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d8ccbb] sm:text-xl">
            Präzise Schnitte, saubere Fades, Bartpflege und Styling für Männer,
            die einen klaren Auftritt wollen.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="#buchung"
              className="inline-flex items-center justify-center gap-3 bg-[#d3ae73] px-7 py-4 font-semibold text-[#12110f] transition hover:bg-[#f0d49e]"
            >
              <CalendarDays className="size-5" aria-hidden="true" />
              Termin buchen
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="#leistungen"
              className="inline-flex items-center justify-center gap-3 border border-[#f3ead9]/24 bg-[#f3ead9]/8 px-7 py-4 font-semibold text-[#f7f1e7] backdrop-blur transition hover:border-[#d3ae73]/60 hover:text-[#d3ae73]"
            >
              Leistungen ansehen
              <ArrowRight className="size-5" aria-hidden="true" />
            </motion.a>
          </div>

          <div className="mt-11 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {trustItems.map((item, index) => (
              <motion.div
                key={item}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.35 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border border-white/12 bg-black/22 px-4 py-3 text-sm text-[#e7dccb] backdrop-blur"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
