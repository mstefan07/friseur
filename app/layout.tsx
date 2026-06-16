import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yunes-barber-langen.de"),
  title: {
    default: "Yunes Barber | Premium Herrenfriseur in Langen",
    template: "%s | Yunes Barber Langen",
  },
  description:
    "Premium Barber in Langen für Herrenhaarschnitt, Skin Fade, Bart trimmen, Rasur, Konturen und Styling mit Online-Terminbuchung.",
  keywords: [
    "Herrenfriseur Langen",
    "Barber Langen",
    "Skin Fade Langen",
    "Bart trimmen Langen",
    "Friseur Herren Langen",
    "Yunes Barber",
  ],
  openGraph: {
    title: "Yunes Barber | Premium Barber Experience in Langen",
    description:
      "Präzise Schnitte, saubere Fades, Bartpflege und Online-Termine für moderne Herren in Langen.",
    url: "https://example.com",
    siteName: "Yunes Barber",
    images: [
      {
        url: "/images/hero-barber.png",
        width: 1600,
        height: 1000,
        alt: "Premium Barber-Salon mit Herrenhaarschnitt in Langen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
