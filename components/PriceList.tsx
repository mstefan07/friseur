"use client";

import { motion } from "motion/react";
import { CalendarPlus, Clock, Scissors } from "lucide-react";
import { barberServices, type BarberService } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";

const categoryLabels: Record<BarberService["category"], string> = {
  Cut: "Schnitt",
  Beard: "Bart & Rasur",
  Package: "Pakete",
  Finish: "Details & Pflege",
};

function selectService(serviceId: string) {
  window.dispatchEvent(new CustomEvent("barber:select-service", { detail: serviceId }));
  document.getElementById("buchung")?.scrollIntoView({ behavior: "smooth" });
}

export function PriceList() {
  const categories = Object.keys(categoryLabels) as BarberService["category"][];

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

        <div className="mt-8 space-y-7">
          {categories.map((category) => {
            const services = barberServices.filter((service) => service.category === category);

            return (
              <div key={category}>
                <div className="mb-3 flex items-center gap-2 border-b border-[#d3ae73]/18 pb-2">
                  <Scissors className="size-4 text-[#d3ae73]" aria-hidden="true" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e7dccb]">
                    {categoryLabels[category]}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service, index) => (
                    <motion.article
                      key={service.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group flex h-full flex-col border border-white/10 bg-[#12110f]/88 p-4 transition hover:border-[#d3ae73]/40 hover:bg-[#171512]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base font-semibold leading-snug text-[#f7f1e7]">
                          {service.name}
                        </h4>
                        <span className="shrink-0 text-sm font-semibold text-[#d3ae73]">
                          {service.price}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#aFA493]">
                        {service.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/8 pt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#b9ad9d]">
                          <Clock className="size-3.5" aria-hidden="true" />
                          ca. {service.durationMinutes} Min.
                        </span>
                        <button
                          type="button"
                          onClick={() => selectService(service.id)}
                          className="inline-flex items-center gap-1.5 border border-[#d3ae73]/35 bg-[#d3ae73]/10 px-2.5 py-1.5 text-xs font-semibold text-[#f3ead9] transition hover:border-[#d3ae73] hover:bg-[#d3ae73]/20"
                        >
                          <CalendarPlus className="size-3.5" aria-hidden="true" />
                          Buchen
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
