import Link from "next/link";
import { Scissors } from "lucide-react";
import { navigation, openingHours, salon } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090907] py-14 text-[#cbbfac]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-10 items-center justify-center border border-[#d3ae73]/40 text-[#d3ae73]">
              <Scissors className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-2xl text-[#f7f1e7]">{salon.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#9f9384]">
            Premium-Barber-Konzept für Herrenhaarschnitt, Skin Fade, Bartpflege
            und Styling in Langen.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#f7f1e7]">Navigation</h3>
          <div className="grid gap-3 text-sm">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#d3ae73]">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#f7f1e7]">Kontakt</h3>
          <div className="grid gap-3 text-sm">
            <span>{salon.address}</span>
            <a href={`tel:${salon.phone.replace(/\s/g, "")}`} className="transition hover:text-[#d3ae73]">
              {salon.phone}
            </a>
            <a href={`mailto:${salon.email}`} className="transition hover:text-[#d3ae73]">
              {salon.email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#f7f1e7]">Zeiten</h3>
          <div className="grid gap-2 text-sm">
            {openingHours.slice(0, 6).map((item) => (
              <div key={item.day} className="flex justify-between gap-3">
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 px-5 pt-6 text-sm text-[#81786d] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {salon.name}. Platzhalterprojekt.</p>
        <div className="flex gap-5">
          <Link href="/impressum" className="transition hover:text-[#d3ae73]">
            Impressum
          </Link>
          <Link href="/datenschutz" className="transition hover:text-[#d3ae73]">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
