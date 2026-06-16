"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";

const itemClasses = [
  "md:row-span-2",
  "",
  "",
  "md:row-span-2",
  "",
  "",
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : galleryImages[selectedIndex];

  return (
    <SectionReveal id="galerie" className="cream-section py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold text-[#8a6234]">Galerie</p>
            <h2 className="font-display text-4xl leading-tight text-[#171511] sm:text-6xl">
              Fades, Bartpflege, Rasur und moderne Barber-Details.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#5b5147]">
            Platzhalterbilder für Salon, Arbeiten und Styling. Echte Bilder können
            direkt im Ordner <span className="font-semibold">public/images</span>{" "}
            ersetzt werden.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.button
              key={`${image.src}-${image.title}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden border border-[#171511]/12 bg-[#171511] text-left ${itemClasses[index] ?? ""}`}
              aria-label={`${image.title} vergroessern`}
            >
              <Image
                src={image.src}
                alt={`${image.title} - ${image.category}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/8 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="text-sm text-[#d3ae73]">{image.category}</p>
                  <h3 className="mt-1 text-xl font-semibold text-[#f7f1e7]">
                    {image.title}
                  </h3>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center border border-white/20 bg-white/10 text-[#f7f1e7] backdrop-blur">
                  <ZoomIn className="size-4" aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/84 p-4 backdrop-blur"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[78vh] w-full max-w-5xl border border-white/14 bg-[#11100e]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selected.src}
                alt={`${selected.title} gross`}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="absolute right-4 top-4 flex size-11 items-center justify-center bg-[#f3ead9] text-[#171511] transition hover:bg-[#d3ae73]"
                aria-label="Lightbox schließen"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionReveal>
  );
}
