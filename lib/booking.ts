import { openingHours } from "@/lib/data";

export type BookingPayload = {
  date: string;
  time: string;
};

export type BookingValidationResult =
  | { ok: true; data: BookingPayload; durationMinutes: number }
  | { ok: false; errors: Record<string, string> };

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const DEFAULT_DURATION_MINUTES = 45;
const SLOT_INTERVAL_MINUTES = 30;
const FALLBACK_OPEN = "09:00";
const FALLBACK_CLOSE = "18:00";

const weekdayNames = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
] as const;

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function generateTimeSlots(start: string, end: string, intervalMinutes = SLOT_INTERVAL_MINUTES) {
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  const slots: string[] = [];

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += intervalMinutes) {
    slots.push(formatMinutes(minutes));
  }

  return slots;
}

function getOpeningHoursForDate(date: string) {
  const weekday = weekdayNames[new Date(`${date}T12:00:00`).getDay()];
  return openingHours.find((entry) => entry.day === weekday);
}

export function getAvailableTimeSlots(date: string, today = new Date()) {
  const fallbackSlots = generateTimeSlots(FALLBACK_OPEN, FALLBACK_CLOSE);

  if (!date) {
    return fallbackSlots;
  }

  const hoursForDay = getOpeningHoursForDate(date);

  if (!hoursForDay || hoursForDay.hours === "geschlossen") {
    return [];
  }

  const [open, close] = hoursForDay.hours.split("-").map((value) => value.trim());
  const slots = generateTimeSlots(open || FALLBACK_OPEN, close || FALLBACK_CLOSE);

  const todayKey = today.toISOString().slice(0, 10);
  if (date !== todayKey) {
    return slots;
  }

  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  return slots.filter((slot) => parseTimeToMinutes(slot) > nowMinutes);
}

export function validateBookingPayload(input: unknown): BookingValidationResult {
  const errors: Record<string, string> = {};
  const data = (input ?? {}) as Partial<BookingPayload>;

  if (!String(data.date ?? "").trim()) {
    errors.date = "Dieses Feld ist erforderlich.";
  }

  if (!String(data.time ?? "").trim()) {
    errors.time = "Dieses Feld ist erforderlich.";
  }

  if (data.time && !timePattern.test(data.time)) {
    errors.time = "Bitte eine gültige Uhrzeit im Format HH:MM wählen.";
  }

  if (data.date) {
    const selectedDate = new Date(`${data.date}T00:00:00`);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.date = "Bitte ein gültiges Datum wählen.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    durationMinutes: DEFAULT_DURATION_MINUTES,
    data: {
      date: String(data.date).trim(),
      time: String(data.time).trim(),
    },
  };
}

export function createCalendarDraft(
  payload: BookingPayload,
  durationMinutes = DEFAULT_DURATION_MINUTES,
) {
  const start = toCalendarDate(payload.date, payload.time);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return {
    summary: "Terminanfrage",
    description: `Gewünschter Termin: ${payload.date} um ${payload.time}`,
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
