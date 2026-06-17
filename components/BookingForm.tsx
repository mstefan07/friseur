"use client";

import { motion } from "motion/react";
import { salon } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";

export function BookingForm() {
  const schedulingUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL ??
    salon.googleCalendarSchedulingUrl;

  return (
    <SectionReveal id="buchung" className="cream-section overflow-x-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-[#8a6234]">Online-Termin</p>
          <h2 className="font-display text-3xl leading-tight text-[#171511] sm:text-4xl">
            Termin buchen
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#5b5147] sm:text-base">
            Wähle einen freien Termin. Bereits gebuchte Zeiten werden automatisch
            ausgeblendet.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="booking-calendar-shell mx-auto mt-8 box-border w-full max-w-3xl min-w-0 overflow-hidden border border-[#8a6234]/28 bg-white p-2 shadow-[0_20px_60px_rgba(23,21,17,0.12)] sm:p-3"
        >
          <iframe
            src={schedulingUrl}
            title={`Terminbuchung bei ${salon.name}`}
            className="block h-[620px] w-full min-w-0 max-w-full border-0 bg-white sm:h-[650px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </SectionReveal>
  );
}
