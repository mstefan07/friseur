"use client";

import { motion } from "motion/react";
import { salon } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";

export function BookingForm() {
  const schedulingUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL ??
    salon.googleCalendarSchedulingUrl;

  return (
    <SectionReveal id="buchung" className="barber-gradient overflow-x-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl leading-tight text-[#f7f1e7] sm:text-4xl">
            Termin buchen
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#b9ad9d] sm:text-base">
            Wähle einen freien Termin. Bereits gebuchte Zeiten werden automatisch
            ausgeblendet.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 box-border w-full max-w-3xl min-w-0 overflow-hidden border border-[#d3ae73]/28 bg-[#12110f]/92 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-4"
        >
          <iframe
            src={schedulingUrl}
            title={`Terminbuchung bei ${salon.name}`}
            className="block h-[620px] w-full min-w-0 max-w-full border-0 sm:h-[650px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </SectionReveal>
  );
}
