# Yunes Barber Langen

Moderne Premium-Website für einen Herrenfriseur / Barber-Salon in Langen.
Die Seite ist mit Next.js, React, Tailwind CSS und `motion` für hochwertige,
dezente UI-Animationen umgesetzt.

## Funktionen

- Premium-Barber-Startseite mit Hero, Trust-Elementen und klaren CTAs
- Barber-only Leistungen und Preisliste
- Interaktive Vorher-/Nachher-Slider für Fade, Bart und Styling
- Galerie mit Lightbox
- Online-Terminbuchung über `/api/book-appointment`
- Google-Calendar-Struktur vorbereitet, aber ohne echte Credentials
- Kontaktbereich, Google-Maps-Platzhalter, Impressum und Datenschutz
- SEO-Basics, Open Graph und responsive Layouts

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

## Platzhalter ersetzen

Vor dem Livegang ersetzen:

- Salonname, Adresse, Telefonnummer, E-Mail und Social Links in `lib/data.ts`
- Leistungen, Preise, Dauer und Mitarbeiter in `lib/data.ts`
- Bilder in `public/images/`
- Rechtstexte in `app/impressum/page.tsx` und `app/datenschutz/page.tsx`
- Google Maps Embed im Kontaktbereich, falls eine genaue Adresse vorhanden ist
- Open-Graph-URL in `app/layout.tsx`

## Google Calendar vorbereiten

Kopiere `.env.example` nach `.env.local` und setze später echte Werte:

```bash
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
```

Die API-Route `/api/book-appointment` validiert Buchungsdaten und erzeugt einen
Kalenderentwurf mit Titel, Beschreibung, Startzeit und Endzeit. Die echte
Google-Calendar-Integration ist in `lib/booking.ts` als TODO markiert.

Wichtig: Keine echten Keys in Git committen. Der Kalender muss für ein
Service-Account-Setup mit `GOOGLE_CLIENT_EMAIL` geteilt werden.
