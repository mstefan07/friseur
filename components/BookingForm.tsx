"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { getAvailableTimeSlots } from "@/lib/booking";
import { SectionReveal } from "@/components/SectionReveal";

type BookingFormState = {
  date: string;
  time: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const initialForm: BookingFormState = {
  date: "",
  time: "",
};

const fieldClass =
  "w-full border border-[#d3ae73]/25 bg-[#0f0e0c] px-4 py-3 text-[#f7f1e7] outline-none transition focus:border-[#d3ae73] focus:bg-[#151411]";

function clientValidate(form: BookingFormState) {
  if (!form.date.trim() || !form.time.trim()) {
    return { form: "Bitte wähle Datum und Uhrzeit aus." };
  }

  return {};
}

function blockManualInput(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key !== "Tab" && event.key !== "Shift") {
    event.preventDefault();
  }
}

export function BookingForm() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [errors, setErrors] = useState<{ form?: string }>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [minDate, setMinDate] = useState("");

  const availableTimeSlots = useMemo(
    () => getAvailableTimeSlots(form.date),
    [form.date],
  );

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (form.time && !availableTimeSlots.includes(form.time)) {
      setForm((current) => ({ ...current, time: "" }));
    }
  }, [availableTimeSlots, form.time]);

  function updateField(field: keyof BookingFormState, value: string) {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "date") {
        next.time = "";
      }
      return next;
    });
    setErrors({});
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submission: BookingFormState = {
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
    };
    setForm(submission);

    const nextErrors = clientValidate(submission);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors ?? { form: "Bitte wähle Datum und Uhrzeit aus." });
        setStatus("error");
        return;
      }

      setStatus("success");
      setErrors({});
      setForm(initialForm);
    } catch {
      setErrors({ form: "Die Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen." });
      setStatus("error");
    }
  }

  return (
    <SectionReveal id="buchung" className="barber-gradient py-16 sm:py-20">
      <div className="mx-auto max-w-lg px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl leading-tight text-[#f7f1e7] sm:text-4xl">
            Termin buchen
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#b9ad9d] sm:text-base">
            Wähle Datum und Uhrzeit. Wir bestätigen deinen Termin anschließend.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 border border-[#d3ae73]/28 bg-[#12110f]/92 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-6"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Datum">
              <input
                className={`${fieldClass} cursor-pointer [color-scheme:dark]`}
                value={form.date}
                name="date"
                min={minDate}
                onChange={(event) => updateField("date", event.target.value)}
                onKeyDown={blockManualInput}
                type="date"
                required
              />
            </Field>

            <Field label="Uhrzeit">
              <div className="relative">
                <select
                  className={`${fieldClass} cursor-pointer appearance-none pr-10 [color-scheme:dark]`}
                  value={form.time}
                  name="time"
                  onChange={(event) => updateField("time", event.target.value)}
                  disabled={!form.date || availableTimeSlots.length === 0}
                  required
                >
                  <option value="">
                    {!form.date
                      ? "Zuerst Datum wählen"
                      : availableTimeSlots.length === 0
                        ? "An diesem Tag geschlossen"
                        : "Uhrzeit wählen"}
                  </option>
                  {availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} Uhr
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#d3ae73]"
                  aria-hidden="true"
                />
              </div>
            </Field>
          </div>

          <AnimatePresence>
            {errors.form ? (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 border border-red-300/30 bg-red-950/30 px-4 py-3 text-sm text-red-100"
              >
                {errors.form}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <div className="mt-5">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#d3ae73] px-5 py-3.5 text-sm font-semibold text-[#12110f] transition hover:bg-[#f0d49e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                "Wird gesendet..."
              ) : (
                <>
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Termin anfragen
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {status === "success" ? (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 border border-[#d3ae73]/34 bg-[#d3ae73]/12 px-4 py-3 text-sm text-[#f7f1e7]"
              >
                Danke! Deine Terminanfrage wurde gesendet.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </motion.form>
      </div>
    </SectionReveal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#d3ae73]">{label}</span>
      {children}
    </label>
  );
}
