# Yunes Barber Langen

Moderne Premium-Website für einen Herrenfriseur / Barber-Salon in Langen.
Die Seite ist mit Next.js, React, Tailwind CSS und `motion` für hochwertige,
dezente UI-Animationen umgesetzt.

## Funktionen

- Premium-Barber-Startseite mit Hero und klaren CTAs
- Barber-only Leistungen und Preisliste
- Interaktive Vorher-/Nachher-Slider für Fade, Bart und Styling
- Google Calendar Terminbuchung per Embed
- Kontaktbereich mit Route-Link (kein automatisches Google-Maps-Embed)
- Impressum und Datenschutz als Platzhalter (`noindex`) bis zum Livegang
- Technische SEO: Metadata, Sitemap, robots.txt, JSON-LD, llms.txt

## Installation

```bash
npm install
```

## Lokal starten

```bash
npm run dev
```

Danach im Browser öffnen:

```text
http://localhost:3000
```

## Build prüfen

```bash
npm run build
```

## Deployment

Das Projekt ist Vercel-ready. Repository mit Vercel verbinden, Build Command
`npm run build` verwenden und danach die Environment Variables setzen.

## SEO / Domain

Setze nach Domain-Kauf die echte Produktions-URL in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://www.deine-domain.de
```

Danach prüfen:

- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`

Google Search Console einrichten und die Sitemap einreichen.

Zentrale SEO-Konfiguration: `lib/site.ts`

## Platzhalter ersetzen

Vor dem Livegang ersetzen:

- NAP, Geo-Koordinaten und Social Links in `lib/site.ts`
- Leistungen, Preise, Dauer und Mitarbeiter in `lib/data.ts`
- Bilder in `public/images/`
- Rechtstexte in `app/impressum/page.tsx` und `app/datenschutz/page.tsx` (danach `noindex` entfernen und Seiten in `app/sitemap.ts` aufnehmen)
- Route-Link im Kontaktbereich mit echter Adresse in `lib/site.ts`
- Favicon / App Icons (aktuell noch TODO)

## Google Calendar

Kopiere `.env.example` nach `.env.local` und setze bei Bedarf:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL=
```

Die Buchung läuft ausschließlich über das Google-Calendar-Embed auf der Startseite. Es gibt keine eigene Booking-API mehr.

Wichtig: Keine echten Keys in Git committen.
