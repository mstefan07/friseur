// TODO: Replace all placeholder contact, team, service and image data with real Yunes Barber details before launch.
export type BarberService = {
  id: string;
  category: "Cut" | "Beard" | "Package" | "Finish";
  name: string;
  shortName: string;
  description: string;
  durationMinutes: number;
  price: string;
};

export type Barber = {
  id: string;
  name: string;
  role: string;
};

export const salon = {
  name: "Yunes Barber",
  city: "Langen",
  claim: "Premium Barber Experience in Langen",
  phone: "+49 6103 000000",
  email: "termin@yunes-barber.de",
  address: "Platzhalterstraße 12, 63225 Langen",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Langen",
};

export const trustItems = [
  "Premium Barber",
  "Moderne Fades",
  "Bart & Rasur",
  "Online buchbar",
];

export const barbers: Barber[] = [
  { id: "yunes", name: "Yunes", role: "Master Barber" },
  { id: "team", name: "Erster freier Barber", role: "Schnellster Termin" },
  { id: "barber-placeholder", name: "Wunsch-Barber", role: "Platzhalter" },
];

export const barberServices: BarberService[] = [
  {
    id: "herrenschnitt",
    category: "Cut",
    name: "Herrenhaarschnitt",
    shortName: "Herrenhaarschnitt",
    description: "Beratung, sauberer Schnitt und Finish für Alltag, Office oder Abend.",
    durationMinutes: 45,
    price: "ab 25 €",
  },
  {
    id: "skin-fade",
    category: "Cut",
    name: "Skin Fade",
    shortName: "Skin Fade",
    description: "Präziser Verlauf mit klarer Kontur und modernem Styling.",
    durationMinutes: 50,
    price: "ab 30 €",
  },
  {
    id: "maschinenhaarschnitt",
    category: "Cut",
    name: "Maschinenhaarschnitt",
    shortName: "Maschine",
    description: "Klarer, schneller Schnitt mit sauberem Abschluss.",
    durationMinutes: 25,
    price: "ab 18 €",
  },
  {
    id: "bart-trimmen",
    category: "Beard",
    name: "Bart trimmen",
    shortName: "Bart trimmen",
    description: "Form, Laenge und Konturen abgestimmt auf Gesicht und Stil.",
    durationMinutes: 25,
    price: "ab 15 €",
  },
  {
    id: "konturen",
    category: "Beard",
    name: "Konturen",
    shortName: "Konturen",
    description: "Scharfe Linien an Haar, Bart, Nacken und Wangen.",
    durationMinutes: 20,
    price: "ab 10 €",
  },
  {
    id: "nassrasur",
    category: "Beard",
    name: "Nassrasur",
    shortName: "Nassrasur",
    description: "Klassische Rasur mit Ruhe, warmem Tuch und sauberem Finish.",
    durationMinutes: 35,
    price: "ab 20 €",
  },
  {
    id: "hair-beard",
    category: "Package",
    name: "Hair & Beard Paket",
    shortName: "Hair & Beard",
    description: "Schnitt, Bartform und Styling als kompletter Premium-Look.",
    durationMinutes: 70,
    price: "ab 40 €",
  },
  {
    id: "wash-cut-style",
    category: "Package",
    name: "Waschen, Schneiden & Styling",
    shortName: "Wash, Cut & Style",
    description: "Pflege, Schnitt und professionelles Styling in einem Termin.",
    durationMinutes: 60,
    price: "ab 32 €",
  },
  {
    id: "augenbrauen",
    category: "Finish",
    name: "Augenbrauen",
    shortName: "Augenbrauen",
    description: "Saubere Form und gepflegte Details für ein klares Gesamtbild.",
    durationMinutes: 15,
    price: "ab 8 €",
  },
  {
    id: "pflege-styling",
    category: "Finish",
    name: "Pflege & Styling",
    shortName: "Pflege & Styling",
    description: "Waschen, Pflegeprodukt und Finish für Textur, Halt und Glanz.",
    durationMinutes: 25,
    price: "ab 12 €",
  },
];

export const beforeAfterItems = [
  {
    title: "Skin Fade Transformation",
    description: "Vom herausgewachsenen Schnitt zum sauberen Fade mit klarer Nackenlinie.",
    before: "/images/before-1.png",
    after: "/images/after-1.png",
  },
  {
    title: "Bartkontur & Shape",
    description: "Gepflegter Bart, scharfe Linien und ein ruhiger, maskuliner Abschluss.",
    before: "/images/before-2.png",
    after: "/images/after-2.png",
  },
  {
    title: "Textured Styling",
    description: "Mehr Form, kontrollierte Textur und ein Finish, das den ganzen Tag haelt.",
    before: "/images/before-3.png",
    after: "/images/after-3.png",
  },
];

export const galleryImages = [
  {
    src: "/images/hero-barber.png",
    title: "Premium Schnitt",
    category: "Herrenhaarschnitt",
  },
  {
    src: "/images/gallery-fade.png",
    title: "Clean Fade",
    category: "Fade",
  },
  {
    src: "/images/gallery-razor.png",
    title: "Razor Finish",
    category: "Rasur",
  },
  {
    src: "/images/gallery-station.png",
    title: "Barber Station",
    category: "Salon",
  },
  {
    src: "/images/after-2.png",
    title: "Bart Shape",
    category: "Bartpflege",
  },
  {
    src: "/images/after-3.png",
    title: "Styling Finish",
    category: "Styling",
  },
];

export const openingHours = [
  { day: "Montag", hours: "geschlossen" },
  { day: "Dienstag", hours: "10:00-19:00" },
  { day: "Mittwoch", hours: "10:00-19:00" },
  { day: "Donnerstag", hours: "10:00-19:00" },
  { day: "Freitag", hours: "10:00-19:00" },
  { day: "Samstag", hours: "09:00-16:00" },
  { day: "Sonntag", hours: "geschlossen" },
];

export const navigation = [
  { href: "#inhaber", label: "Inhaber" },
  { href: "#salon", label: "Salon" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#transformationen", label: "Vorher/Nachher" },
  { href: "#galerie", label: "Galerie" },
  { href: "#buchung", label: "Termin" },
  { href: "#kontakt", label: "Kontakt" },
];
