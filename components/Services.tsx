import Image from "next/image";
import { CheckCircle2, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Präzision",
    text: "Fades, Konturen und Bartlinien werden sauber aufgebaut und kontrolliert abgeschlossen.",
  },
  {
    icon: Timer,
    title: "Effizienz",
    text: "Klare Abläufe, pünktliche Termine und Services, die in den Alltag passen.",
  },
  {
    icon: Sparkles,
    title: "Finish",
    text: "Produkte, Styling und Pflege werden passend zu Haarstruktur und Look gewählt.",
  },
];

export function Services() {
  return (
    <SectionReveal id="salon" className="barber-gradient py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold text-[#d3ae73]">
            Über den Salon
          </p>
          <h2 className="font-display text-4xl leading-tight text-[#f7f1e7] sm:text-6xl">
            Herrenpflege mit Ruhe, Handwerk und klarem Stil.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#cbbfac]">
            Yunes Barber steht als Platzhalterkonzept für einen modernen
            Herrenfriseur in Langen: präzise Schnitte, saubere Fades, gepflegte
            Baerte und Beratung ohne Hektik. Jeder Termin soll sich kontrolliert,
            hochwertig und persönlich anfühlen.
          </p>
          <p className="mt-5 text-base leading-8 text-[#aFA493]">
            Die Texte und Bilder sind bewusst austauschbar angelegt. Echte
            Teamfotos, Salonbilder und Marken können später direkt in den
            Daten und im Ordner <span className="text-[#d3ae73]">public/images</span>{" "}
            ersetzt werden.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.title}
                  className="border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#d3ae73]/45 hover:bg-white/[0.055]"
                >
                  <Icon className="mb-4 size-6 text-[#d3ae73]" aria-hidden="true" />
                  <h3 className="font-semibold text-[#f7f1e7]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#b9ad9d]">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-5">
          <div className="relative min-h-[420px] overflow-hidden border border-white/10 sm:col-span-3">
            <Image
              src="/images/gallery-station.png"
              alt="Premium Barber Station als Platzhalterbild"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover transition duration-700 hover:scale-[1.025]"
            />
          </div>
          <div className="grid gap-5 sm:col-span-2">
            <div className="relative min-h-[205px] overflow-hidden border border-white/10">
              <Image
                src="/images/gallery-razor.png"
                alt="Rasur und Konturen als Platzhalterbild"
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="border border-[#d3ae73]/30 bg-[#d3ae73]/10 p-6">
              <CheckCircle2 className="mb-5 size-7 text-[#d3ae73]" aria-hidden="true" />
              <p className="text-sm text-[#d3ae73]">Qualitaetsversprechen</p>
              <p className="mt-3 text-2xl font-semibold leading-tight text-[#f7f1e7]">
                Beratung, Sauberkeit und ein Finish, das zum Typ passt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
