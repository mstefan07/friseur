"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarPlus, ChevronDown, Clock } from "lucide-react";
import { barberServices, type BarberService } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";

const categoryLabels: Record<BarberService["category"], string> = {
  Cut: "Haarschnitte",
  Beard: "Bart & Rasur",
  Package: "Pakete",
  Finish: "Styling & Pflege",
};

const categories = Object.keys(categoryLabels) as BarberService["category"][];

function scrollToBooking() {
  document.getElementById("buchung")?.scrollIntoView({ behavior: "smooth" });
}

export function PriceList() {
  const [openCategory, setOpenCategory] = useState<BarberService["category"] | null>("Cut");

  function toggleCategory(category: BarberService["category"]) {
    setOpenCategory((current) => (current === category ? null : category));
  }

  return (
    <SectionReveal id="leistungen" className="barber-gradient py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-[#d3ae73]">
            Leistungen & Preise
          </p>
          <h2 className="font-display text-3xl leading-tight text-[#f7f1e7] sm:text-4xl">
            Schnitt, Fade, Bart und Finish.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#b9ad9d] sm:text-base">
            Kompakte Übersicht der Barber-Services — Preise als Orientierung,
            Buchung direkt im Anschluss möglich.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {categories.map((category) => {
            const services = barberServices.filter((service) => service.category === category);
            const isOpen = openCategory === category;

            return (
              <div
                key={category}
                className="overflow-hidden border border-white/10 bg-[#12110f]/88"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.03] sm:px-5"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f7f1e7] sm:text-base">
                    {categoryLabels[category]}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-[#d3ae73] sm:text-sm">
                    {services.length} Leistungen
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 border-t border-white/10 px-4 py-4 sm:px-5">
                        {services.map((service) => (
                          <article
                            key={service.id}
                            className="flex flex-col gap-3 border border-white/10 bg-[#0f0e0c]/90 p-4 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <h4 className="text-base font-semibold text-[#f7f1e7]">
                                  {service.name}
                                </h4>
                                <span className="shrink-0 text-sm font-semibold text-[#d3ae73]">
                                  {service.price}
                                </span>
                              </div>
                              <p className="mt-2 text-sm leading-6 text-[#b9ad9d]">
                                {service.description}
                              </p>
                              <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#aFA493]">
                                <Clock className="size-3.5" aria-hidden="true" />
                                ca. {service.durationMinutes} Min.
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={scrollToBooking}
                              className="inline-flex shrink-0 items-center justify-center gap-2 border border-[#d3ae73]/40 bg-[#d3ae73] px-4 py-2.5 text-sm font-semibold text-[#12110f] transition hover:bg-[#f0d49e]"
                            >
                              <CalendarPlus className="size-4" aria-hidden="true" />
                              Termin buchen
                            </button>
                          </article>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
