"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { salon } from "@/lib/data";

const OWNER_IMAGE = {
  src: "/images/owner-barber.webp",
  alt: "Inhaber von Yunes Barber im Barber-Salon",
  width: 680,
  height: 1020,
} as const;

const highlights = [
  "Präzise Fades & Konturen",
  "Persönliche Beratung",
  "Sauberes Finish",
];

export function OwnerSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="inhaber"
      aria-labelledby="owner-heading"
      className="relative overflow-hidden border-y border-white/8 bg-[#0b0b0a] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(185,136,74,0.12),transparent_28rem),radial-gradient(circle_at_88%_78%,rgba(211,174,115,0.08),transparent_24rem)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
        >
          <div className="absolute -inset-3 rounded-[1.35rem] border border-[#d3ae73]/22 bg-[#d3ae73]/5" />
          <div className="relative overflow-hidden rounded-2xl border border-[#d3ae73]/35 shadow-[0_28px_90px_rgba(0,0,0,0.45),0_0_0_1px_rgba(211,174,115,0.08)_inset]">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src={OWNER_IMAGE.src}
                alt={OWNER_IMAGE.alt}
                width={OWNER_IMAGE.width}
                height={OWNER_IMAGE.height}
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 100vw"
                className="h-full w-full object-cover object-[center_22%]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090907]/88 via-[#090907]/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d3ae73]">
                  Inhaber
                </p>
                <p className="mt-1 font-display text-2xl text-[#f7f1e7]">Yunes</p>
              </div>
              <span className="inline-flex size-11 shrink-0 items-center justify-center border border-[#d3ae73]/40 bg-[#151411]/88 p-1.5 backdrop-blur">
                <Image
                  src="/images/barber-logo.webp"
                  alt=""
                  width={1360}
                  height={907}
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-sm font-semibold text-[#d3ae73]"
          >
            Inhaber & Master Barber
          </motion.p>

          <motion.h2
            id="owner-heading"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.72, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl leading-tight text-[#f7f1e7] sm:text-5xl lg:text-6xl"
          >
            Der Barber hinter {salon.name}
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-lg leading-8 text-[#cbbfac]"
          >
            Bei {salon.name} trifft klassisches Barber-Handwerk auf modernes
            Herren-Styling. Jeder Schnitt, jeder Fade und jede Bartkontur wird
            mit Präzision, Ruhe und einem klaren Blick für den persönlichen Stil
            umgesetzt.
          </motion.p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.72, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base leading-8 text-[#aFA493]"
          >
            Der Salon steht für Qualität, Sauberkeit und einen Auftritt, der
            sitzt — ob im Büro, am Wochenende oder für einen besonderen Anlass.
          </motion.p>

          <motion.ul
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.68, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Schwerpunkte"
          >
            {highlights.map((item) => (
              <li
                key={item}
                className="border border-[#d3ae73]/28 bg-[#151411]/70 px-4 py-2 text-sm text-[#e7dccb]"
              >
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.68, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <motion.a
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="#buchung"
              className="inline-flex items-center justify-center gap-3 bg-[#d3ae73] px-7 py-4 font-semibold text-[#12110f] transition hover:bg-[#f0d49e]"
            >
              <CalendarDays className="size-5" aria-hidden="true" />
              Termin buchen
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
