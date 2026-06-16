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
    <SectionReveal id="leistungen" className="cream-section py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold text-[#8a6234]">
            Leistungen & Preise
          </p>
          <h2 className="font-display text-4xl leading-tight text-[#171511] sm:text-6xl">
            Barber-Services für Schnitt, Fade, Bart und Finish.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5b5147]">
            Platzhalterpreise als Orientierung. Echte Preise, Dauer und
            Leistungsbeschreibungen können später zentral in{" "}
            <span className="font-semibold text-[#171511]">lib/data.ts</span>{" "}
            ersetzt werden.
          </p>
        </div>

        <div className="mt-14 grid gap-8">
          {categories.map((category) => {
            const services = barberServices.filter((service) => service.category === category);

            return (
              <div key={category}>
                <div className="mb-5 flex items-center gap-3">
                  <Scissors className="size-5 text-[#8a6234]" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-[#171511]">
                    {categoryLabels[category]}
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {services.map((service, index) => (
                    <motion.article
                      key={service.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-70px" }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -4 }}
                      className="group border border-[#171511]/12 bg-white/58 p-5 shadow-[0_18px_48px_rgba(23,21,17,0.08)] backdrop-blur transition hover:border-[#8a6234]/45"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-xl font-semibold text-[#171511]">
                            {service.name}
                          </h4>
                          <p className="mt-3 max-w-xl text-sm leading-6 text-[#5b5147]">
                            {service.description}
                          </p>
                        </div>
                        <span className="shrink-0 text-lg font-semibold text-[#8a6234]">
                          {service.price}
                        </span>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="inline-flex items-center gap-2 text-sm text-[#6d6257]">
                          <Clock className="size-4" aria-hidden="true" />
                          ca. {service.durationMinutes} Min.
                        </span>
                        <button
                          type="button"
                          onClick={() => selectService(service.id)}
                          className="inline-flex items-center justify-center gap-2 border border-[#171511]/18 bg-[#171511] px-4 py-3 text-sm font-semibold text-[#f3ead9] transition group-hover:bg-[#8a6234]"
                        >
                          <CalendarPlus className="size-4" aria-hidden="true" />
                          Diese Leistung buchen
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
