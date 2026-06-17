"use client";

import { motion } from "motion/react";
import { beforeAfterItems } from "@/lib/data";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { SectionReveal } from "@/components/SectionReveal";

export function BeforeAfterGallery() {
  return (
    <SectionReveal id="transformationen" className="barber-gradient pt-10 pb-16 sm:pt-12 sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold text-[#d3ae73]">
            Vorher / Nachher
          </p>
          <h2 className="font-display text-3xl leading-tight text-[#f7f1e7] sm:text-5xl">
            Transformationen für Fade, Bart und Styling.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#cbbfac] sm:text-lg">
            Ziehe den Griff nach links oder rechts, um den Unterschied zu sehen.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {beforeAfterItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border border-white/10 bg-white/[0.035] p-3"
            >
              <BeforeAfterSlider
                before={item.before}
                after={item.after}
                title={item.title}
              />
              <div className="px-2 py-5">
                <h3 className="text-xl font-semibold text-[#f7f1e7]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#b9ad9d]">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
