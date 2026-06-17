import Link from "next/link";
import Image from "next/image";
import { navigation, openingHours, salon, socialLinks } from "@/lib/data";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090907] py-14 text-[#cbbfac]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/barber-logo.webp"
                alt={`${salon.name} Logo`}
                width={1360}
                height={907}
                className="h-10 w-auto max-w-[130px] object-contain"
              />
              <span className="font-display text-2xl text-[#f7f1e7]">{salon.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#9f9384]">
              Premium-Barber für Herrenhaarschnitt, Skin Fade, Bartpflege und Styling in Langen.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-[#d3ae73]">Folge uns</p>
            <SocialLinks links={socialLinks} variant="dark" />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr]">
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
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between gap-3">
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#f7f1e7]">Rechtliches</h3>
            <div className="grid gap-3 text-sm">
              <Link href="/impressum" className="transition hover:text-[#d3ae73]">
                Impressum
              </Link>
              <Link href="/datenschutz" className="transition hover:text-[#d3ae73]">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-5 pt-2 text-sm text-[#81786d] sm:px-8">
        <p>© {new Date().getFullYear()} {salon.name}</p>
      </div>
    </footer>
  );
}
