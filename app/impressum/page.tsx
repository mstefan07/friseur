import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { salon } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum-Platzhalter für Yunes Barber in Langen. Muss vor Veröffentlichung rechtlich geprüft und ersetzt werden.",
  alternates: {
    canonical: "/impressum",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="barber-gradient min-h-screen px-5 pb-20 pt-32 sm:px-8">
        <section className="mx-auto max-w-4xl border border-white/10 bg-white/[0.035] p-6 sm:p-10">
          <p className="mb-4 text-sm font-semibold text-[#d3ae73]">Rechtliches</p>
          <h1 className="font-display text-5xl text-[#f7f1e7]">Impressum</h1>
          <p className="mt-6 leading-8 text-[#cbbfac]">
            Diese Seite ist ein Platzhalter und muss vor dem Livegang durch ein
            rechtlich geprüftes Impressum ersetzt werden.
          </p>

          <div className="mt-10 grid gap-6 text-[#e7dccb]">
            <div>
              <h2 className="font-semibold text-[#f7f1e7]">Angaben gemäß § 5 DDG</h2>
              <p className="mt-3 leading-7">
                {salon.name}
                <br />
                Inhaber: [Vor Livegang ergänzen]
                <br />
                {salon.address}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-[#f7f1e7]">Kontakt</h2>
              <p className="mt-3 leading-7">
                Telefon: {salon.phone}
                <br />
                E-Mail: {salon.email}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-[#f7f1e7]">Hinweis</h2>
              <p className="mt-3 leading-7">
                USt-ID, Registerangaben, Verantwortliche und weitere Pflichtangaben
                müssen individuell ergänzt werden.
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
