import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Route,
  type LucideIcon,
} from "lucide-react";
import { openingHours, salon, socialLinks } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";
import { SocialLinks } from "@/components/SocialLinks";

export function ContactSection() {
  return (
    <SectionReveal id="kontakt" className="cream-section py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-4 text-sm font-semibold text-[#8a6234]">
            Kontakt & Standort
          </p>
          <h2 className="font-display text-4xl leading-tight text-[#171511] sm:text-6xl">
            Herrenfriseur in Langen. Klar erreichbar, online buchbar.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5b5147]">
            Die folgenden Angaben sind Platzhalter und muessen vor dem Launch mit
            echten Saloninformationen ersetzt werden.
          </p>

          <div className="mt-9 grid gap-4">
            <ContactRow icon={MapPin} label="Adresse" value={salon.address} />
            <ContactRow icon={Phone} label="Telefon" value={salon.phone} href={`tel:${salon.phone.replace(/\s/g, "")}`} />
            <ContactRow icon={Mail} label="E-Mail" value={salon.email} href={`mailto:${salon.email}`} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${salon.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 bg-[#171511] px-5 py-3 text-sm font-semibold text-[#f3ead9] transition hover:bg-[#8a6234]"
            >
              <Phone className="size-4" aria-hidden="true" />
              Anrufen
            </a>
            <a
              href={`mailto:${salon.email}`}
              className="inline-flex items-center justify-center gap-2 border border-[#171511]/18 px-5 py-3 text-sm font-semibold text-[#171511] transition hover:border-[#8a6234] hover:text-[#8a6234]"
            >
              <Mail className="size-4" aria-hidden="true" />
              E-Mail
            </a>
            <a
              href={salon.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#171511]/18 px-5 py-3 text-sm font-semibold text-[#171511] transition hover:border-[#8a6234] hover:text-[#8a6234]"
            >
              <Route className="size-4" aria-hidden="true" />
              Route
            </a>
          </div>

          <div className="mt-9">
            <p className="mb-3 text-sm font-semibold text-[#8a6234]">Social Media</p>
            <SocialLinks links={socialLinks} variant="light" />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="overflow-hidden border border-[#171511]/12 bg-[#171511] shadow-[0_18px_48px_rgba(23,21,17,0.12)]">
            <iframe
              title="Google Maps Platzhalter für Yunes Barber in Langen"
              src="https://www.google.com/maps?q=Langen%20Hessen&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="border border-[#171511]/12 bg-white/58 p-6 shadow-[0_18px_48px_rgba(23,21,17,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-[#171511]">Öffnungszeiten</h3>
              <ExternalLink className="size-5 text-[#8a6234]" aria-hidden="true" />
            </div>
            <div className="grid gap-3">
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between gap-5 border-b border-[#171511]/10 pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="font-medium text-[#171511]">{item.day}</span>
                  <span className="text-[#5b5147]">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center bg-[#171511] text-[#d3ae73]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm text-[#6d6257]">{label}</span>
        <span className="block font-semibold text-[#171511]">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-4 border border-[#171511]/10 bg-white/48 p-4 transition hover:border-[#8a6234]/50"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-4 border border-[#171511]/10 bg-white/48 p-4">
      {content}
    </div>
  );
}
