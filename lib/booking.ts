import { barberServices } from "@/lib/data";

export type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  message?: string;
};

export type BookingValidationResult =
  | { ok: true; data: BookingPayload; durationMinutes: number }
  | { ok: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export function validateBookingPayload(input: unknown): BookingValidationResult {
  const errors: Record<string, string> = {};
  const data = (input ?? {}) as Partial<BookingPayload>;

  const requiredFields: Array<keyof BookingPayload> = [
    "name",
    "phone",
    "email",
    "service",
    "barber",
    "date",
    "time",
  ];

  for (const field of requiredFields) {
    if (!String(data[field] ?? "").trim()) {
      errors[field] = "Dieses Feld ist erforderlich.";
    }
  }

  if (data.email && !emailPattern.test(data.email)) {
    errors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
  }

  if (data.time && !timePattern.test(data.time)) {
    errors.time = "Bitte eine gültige Uhrzeit im Format HH:MM wählen.";
  }

  const service = barberServices.find((item) => item.id === data.service);
  if (data.service && !service) {
    errors.service = "Diese Leistung ist nicht verfuegbar.";
  }

  if (data.date) {
    const selectedDate = new Date(`${data.date}T00:00:00`);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.date = "Bitte ein gültiges Datum wählen.";
    }
  }

  if (Object.keys(errors).length > 0 || !service) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    durationMinutes: service.durationMinutes || 60,
    data: {
      name: String(data.name).trim(),
      phone: String(data.phone).trim(),
      email: String(data.email).trim(),
      service: service.id,
      barber: String(data.barber).trim(),
      date: String(data.date).trim(),
      time: String(data.time).trim(),
      message: String(data.message ?? "").trim(),
    },
  };
}

export function createCalendarDraft(payload: BookingPayload, durationMinutes: number) {
  const service = barberServices.find((item) => item.id === payload.service);
  const start = toCalendarDate(payload.date, payload.time);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return {
    summary: `Friseurtermin – ${payload.name}`,
    description: [
      `Leistung: ${service?.name ?? payload.service}`,
      `Telefon: ${payload.phone}`,
      `E-Mail: ${payload.email}`,
      `Wunsch-Barber: ${payload.barber}`,
      payload.message ? `Nachricht: ${payload.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    start: {
      dateTime: formatCalendarDateTime(start),
      timeZone: "Europe/Berlin",
    },
    end: {
      dateTime: formatCalendarDateTime(end),
      timeZone: "Europe/Berlin",
    },
  };
}

function toCalendarDate(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes));
}

function formatCalendarDateTime(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export async function createGoogleCalendarEvent(calendarDraft: ReturnType<typeof createCalendarDraft>) {
  const hasGoogleConfig =
    Boolean(process.env.GOOGLE_CLIENT_EMAIL) &&
    Boolean(process.env.GOOGLE_PRIVATE_KEY) &&
    Boolean(process.env.GOOGLE_CALENDAR_ID);

  if (!hasGoogleConfig) {
    return {
      mode: "placeholder",
      message:
        "Google Calendar credentials are not configured. The booking was validated and prepared as a calendar event draft.",
      calendarDraft,
    };
  }

  // TODO: Install and configure the Google Calendar API client here.
  // Required environment variables:
  // GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_CALENDAR_ID.
  // For a service account, remember to share the target Google Calendar
  // with GOOGLE_CLIENT_EMAIL. Before inserting events, add free-slot checks
  // with calendar.events.list({ timeMin, timeMax }) to avoid double bookings.
  return {
    mode: "ready-for-google-calendar",
    message:
      "Google Calendar credentials were found. Connect the Google API client in lib/booking.ts to insert this event.",
    calendarDraft,
  };
}
