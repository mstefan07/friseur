import { NextResponse } from "next/server";
import {
  createCalendarDraft,
  createGoogleCalendarEvent,
  validateBookingPayload,
} from "@/lib/booking";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateBookingPayload(body);

    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, errors: validation.errors },
        { status: 400 },
      );
    }

    const calendarDraft = createCalendarDraft(
      validation.data,
      validation.durationMinutes,
    );
    const calendarResult = await createGoogleCalendarEvent(calendarDraft);

    return NextResponse.json({
      ok: true,
      message: "Danke! Deine Terminanfrage wurde gesendet.",
      booking: {
        date: validation.data.date,
        time: validation.data.time,
        start: calendarDraft.start,
        end: calendarDraft.end,
      },
      calendar: calendarResult,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "Die Buchung konnte nicht verarbeitet werden. Bitte später erneut versuchen.",
        },
      },
      { status: 500 },
    );
  }
}
