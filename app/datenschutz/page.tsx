import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { salon } from "@/lib/data";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutz-Platzhalter für Yunes Barber in Langen. Muss vor Veröffentlichung rechtlich geprüft und ersetzt werden.",
  alternates: {
    canonical: "/datenschutz",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="barber-gradient min-h-screen px-5 pb-20 pt-32 sm:px-8">
        <section className="mx-auto max-w-4xl border border-white/10 bg-white/[0.035] p-6 sm:p-10">
          <p className="mb-4 text-sm font-semibold text-[#d3ae73]">Rechtliches</p>
          <h1 className="font-display text-5xl text-[#f7f1e7]">Datenschutz</h1>
          <p className="mt-6 leading-8 text-[#cbbfac]">
            Diese Datenschutzerklärung ist ein Platzhalter und muss vor dem
            Livegang rechtlich geprüft, vervollständigt und an die echten
            Dienste angepasst werden.
          </p>

          <div className="mt-10 grid gap-6 text-[#e7dccb]">
            <div>
              <h2 className="font-semibold text-[#f7f1e7]">Verantwortlicher</h2>
              <p className="mt-3 leading-7">
                {salon.name}
                <br />
                {salon.address}
                <br />
                {salon.email}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-[#f7f1e7]">Terminbuchung</h2>
              <p className="mt-3 leading-7">
                Die Online-Terminbuchung erfolgt über Google Calendar Appointment
                Scheduling. Beim Öffnen des Buchungsbereichs oder beim Klick auf
                den externen Buchungslink werden Inhalte von Google geladen. Dabei
                können personenbezogene Daten wie Name, E-Mail-Adresse und
                Terminwahl direkt an Google übermittelt werden. Es wird kein
                eigenes Buchungsformular auf dieser Website verarbeitet.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-[#f7f1e7]">Externe Dienste</h2>
              <p className="mt-3 leading-7">
                Google Calendar Appointment Scheduling wird für die Terminbuchung
                eingebunden. Google Maps wird nicht automatisch geladen, sondern
                erst nach Klick auf den Route-Button im Kontaktbereich geöffnet.
                Beide Dienste müssen in der finalen Datenschutzerklärung mit
                Anbieter, Zweck, Rechtsgrundlage und Speicherdauer beschrieben
                werden.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex bg-[#d3ae73] px-5 py-3 font-semibold text-[#12110f] transition hover:bg-[#f0d49e]"
          >
            Zurück zur Startseite
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
