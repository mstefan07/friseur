"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Menu, X } from "lucide-react";
import { navigation, salon, socialLinks } from "@/lib/data";
import { SocialLinks } from "@/components/SocialLinks";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090907]/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            if (window.location.pathname === "/") {
              window.location.reload();
              return;
            }
            window.location.href = "/";
          }}
          className="group flex items-center gap-3"
          aria-label="Zur Startseite"
        >
          <Image
            src="/images/barber-logo.webp"
            alt={`${salon.name} Logo`}
            width={1360}
            height={907}
            priority
            className="h-10 w-auto max-w-[120px] object-contain sm:h-12 sm:max-w-[150px] lg:max-w-[170px]"
          />
          <span>
            <span className="block font-display text-2xl leading-none text-[#f7f1e7]">
              {salon.name}
            </span>
            <span className="block text-xs text-[#b9ad9d]">Langen</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#d8ccbb] transition hover:text-[#d3ae73]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <SocialLinks links={socialLinks} variant="dark" size="sm" />
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#buchung"
            className="inline-flex items-center gap-2 bg-[#d3ae73] px-5 py-3 text-sm font-semibold text-[#12110f] transition hover:bg-[#f0d49e]"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            Termin buchen
          </motion.a>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-white/15 text-[#f7f1e7] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#11100e] lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2 px-5 py-5">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-1 py-3 text-base text-[#f7f1e7] transition hover:text-[#d3ae73]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4">
                <SocialLinks links={socialLinks} variant="dark" size="sm" />
              </div>
              <a
                href="#buchung"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#d3ae73] px-5 py-3 text-sm font-semibold text-[#12110f]"
              >
                <CalendarDays className="size-4" aria-hidden="true" />
                Termin buchen
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
