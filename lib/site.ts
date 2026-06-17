// Central site configuration for SEO, Local SEO, and GEO.
// TODO: Replace placeholder NAP, geo coordinates, and social URLs before launch.

export const siteName = "Yunes Barber";
export const businessName = "Yunes Barber";

export const siteDescription =
  "Moderner Barber in Langen für Herrenhaarschnitte, Skin Fades, Bartpflege und Styling. Termine einfach online buchen.";

export const fallbackSiteUrl = "https://www.yunes-barber-langen.de";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;
  return url.replace(/\/$/, "");
}

export const locale = "de_DE";
export const city = "Langen";
export const region = "Hessen";
export const country = "DE";

// TODO: Replace with real contact details from the business owner.
export const phone = "+49 6103 000000";
export const email = "termin@yunes-barber.de";
export const streetAddress = "Platzhalterstraße 12";
export const postalCode = "63225";

export const address = {
  streetAddress,
  postalCode,
  addressLocality: city,
  addressRegion: region,
  addressCountry: country,
  full: `${streetAddress}, ${postalCode} ${city}`,
};

// TODO: Replace with exact salon coordinates when available.
export const geo = {
  latitude: 50.0256,
  longitude: 8.656,
};

export const priceRange = "€€";

export type OpeningHoursDisplay = {
  day: string;
  hours: string;
};

export const openingHoursDisplay: OpeningHoursDisplay[] = [
  { day: "Montag", hours: "geschlossen" },
  { day: "Dienstag", hours: "10:00-19:00" },
  { day: "Mittwoch", hours: "10:00-19:00" },
  { day: "Donnerstag", hours: "10:00-19:00" },
  { day: "Freitag", hours: "10:00-19:00" },
  { day: "Samstag", hours: "09:00-16:00" },
  { day: "Sonntag", hours: "geschlossen" },
];

export const openingHoursSpecification = [
  {
    dayOfWeek: [
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ],
    opens: "10:00",
    closes: "19:00",
  },
  {
    dayOfWeek: ["https://schema.org/Saturday"],
    opens: "09:00",
    closes: "16:00",
  },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    platform: "instagram" as const,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    platform: "tiktok" as const,
  },
];

export const schemaServices = [
  "Herrenhaarschnitt",
  "Skin Fade",
  "Bart trimmen",
  "Nassrasur",
  "Hair & Beard Paket",
];

export const ogImage = {
  path: "/images/barber-salon.webp",
  width: 1200,
  height: 800,
  alt: "Yunes Barber Salon in Langen",
};

export const siteConfig = {
  siteName,
  businessName,
  description: siteDescription,
  locale,
  city,
  region,
  country,
  phone,
  email,
  address,
  geo,
  priceRange,
  openingHours: openingHoursDisplay,
  socialLinks,
  schemaServices,
  ogImage,
};
