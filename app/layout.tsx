import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { getSiteUrl, locale, ogImage, siteDescription, siteName } from "@/lib/site";
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

const siteUrl = getSiteUrl();
const defaultTitle = "Yunes Barber | Herrenfriseur & Barber in Langen";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Yunes Barber",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: defaultTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: ogImage.path,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
    locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: [ogImage.path],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <SeoJsonLd />
        {children}
      </body>
    </html>
  );
}
