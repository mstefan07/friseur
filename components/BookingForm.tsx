"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck2, Send, Sparkles } from "lucide-react";
import { barberServices, barbers } from "@/lib/data";
import { SectionReveal } from "@/components/SectionReveal";

type BookingFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  message: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const initialForm: BookingFormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  barber: "team",
  date: "",
  time: "",
  message: "",
};

const inputClass =
  "w-full border border-white/12 bg-[#0f0e0c] px-4 py-3.5 text-[#f7f1e7] outline-none transition placeholder:text-[#7d7469] focus:border-[#d3ae73]/70 focus:bg-[#151411]";

function clientValidate(form: BookingFormState) {
  const errors: Partial<Record<keyof BookingFormState | "form", string>> = {};

  for (const field of ["name", "phone", "email", "service", "barber", "date", "time"] as const) {
    if (!form[field].trim()) {
      errors[field] = "Pflichtfeld";
    }
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Bitte eine gültige E-Mail eingeben.";
  }

  return errors;
}

export function BookingForm() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormState | "form", string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [minDate, setMinDate] = useState("");
  const [highlightService, setHighlightService] = useState(false);

  const selectedService = useMemo(
    () => barberServices.find((service) => service.id === form.service),
    [form.service],
  );

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));

    const handleServiceSelect = (event: Event) => {
      const serviceId = (event as CustomEvent<string>).detail;
      setForm((current) => ({ ...current, service: serviceId }));
      setHighlightService(true);
      window.setTimeout(() => setHighlightService(false), 900);
    };

    window.addEventListener("barber:select-service", handleServiceSelect);
    return () => window.removeEventListener("barber:select-service", handleServiceSelect);
  }, []);

  function updateField(field: keyof BookingFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submission: BookingFormState = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      barber: String(formData.get("barber") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      message: String(formData.get("message") ?? ""),
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
        setErrors(result.errors ?? { form: "Die Anfrage konnte nicht gesendet werden." });
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
    <SectionReveal id="buchung" className="barber-gradient py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 text-sm font-semibold text-[#d3ae73]">
            Online-Terminbuchung
          </p>
          <h2 className="font-display text-4xl leading-tight text-[#f7f1e7] sm:text-6xl">
            Dein nächster Schnitt beginnt mit einem klaren Slot.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#cbbfac]">
            Sende deine Terminanfrage direkt an den Salon. Die API bereitet den
            Termin bereits als Google-Calendar-Event vor; die echte Integration
            wird später mit Environment Variables aktiviert.
          </p>

          <div className="mt-8 border border-[#d3ae73]/24 bg-[#d3ae73]/10 p-6">
            <Sparkles className="mb-5 size-7 text-[#d3ae73]" aria-hidden="true" />
            <p className="text-sm text-[#d3ae73]">Vorbereitet für Google Calendar</p>
            <p className="mt-3 text-base leading-7 text-[#e6dac8]">
              Titel, Beschreibung, Startzeit und Endzeit werden serverseitig
              strukturiert. Echte Credentials werden nicht hardcodiert.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/10 bg-white/[0.035] p-5 shadow-bronze sm:p-8"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                className={inputClass}
                value={form.name}
                name="name"
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Max Mustermann"
                autoComplete="name"
              />
            </Field>

            <Field label="Telefonnummer" error={errors.phone}>
              <input
                className={inputClass}
                value={form.phone}
                name="phone"
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+49 ..."
                autoComplete="tel"
              />
            </Field>

            <Field label="E-Mail" error={errors.email}>
              <input
                className={inputClass}
                value={form.email}
                name="email"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="mail@example.com"
                autoComplete="email"
                type="email"
              />
            </Field>

            <Field label="Wunsch-Barber" error={errors.barber}>
              <select
                className={inputClass}
                value={form.barber}
                name="barber"
                onChange={(event) => updateField("barber", event.target.value)}
              >
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name} - {barber.role}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Gewünschte Leistung" error={errors.service} className="sm:col-span-2">
              <motion.select
                animate={
                  highlightService
                    ? { borderColor: "rgba(211, 174, 115, 0.95)", scale: 1.01 }
                    : { borderColor: "rgba(255, 255, 255, 0.12)", scale: 1 }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={inputClass}
                value={form.service}
                name="service"
                onChange={(event) => updateField("service", event.target.value)}
              >
                <option value="">Leistung auswählen</option>
                {barberServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} - ca. {service.durationMinutes} Min.
                  </option>
                ))}
              </motion.select>
            </Field>

            <Field label="Datum" error={errors.date}>
              <input
                className={inputClass}
                value={form.date}
                name="date"
                min={minDate}
                onChange={(event) => updateField("date", event.target.value)}
                type="date"
              />
            </Field>

            <Field label="Uhrzeit" error={errors.time}>
              <input
                className={inputClass}
                value={form.time}
                name="time"
                onChange={(event) => updateField("time", event.target.value)}
                type="time"
                step="900"
              />
            </Field>

            <Field label="Optionale Nachricht" error={errors.message} className="sm:col-span-2">
              <textarea
                className={`${inputClass} min-h-32 resize-y`}
                value={form.message}
                name="message"
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Wunschzeit, Anlass oder Hinweise zum Schnitt"
              />
            </Field>
          </div>

          {selectedService ? (
            <div className="mt-5 border border-white/10 bg-black/20 p-4 text-sm text-[#cbbfac]">
              Ausgewählt:{" "}
              <span className="font-semibold text-[#d3ae73]">{selectedService.name}</span>{" "}
              · ca. {selectedService.durationMinutes} Min. · {selectedService.price}
            </div>
          ) : null}

          <AnimatePresence>
            {errors.form ? (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-5 border border-red-300/30 bg-red-950/30 px-4 py-3 text-sm text-red-100"
              >
                {errors.form}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-3 bg-[#d3ae73] px-7 py-4 font-semibold text-[#12110f] transition hover:bg-[#f0d49e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                "Wird gesendet..."
              ) : (
                <>
                  <Send className="size-5" aria-hidden="true" />
                  Terminanfrage senden
                </>
              )}
            </motion.button>

            <p className="text-sm leading-6 text-[#9f9384]">
              Pflichtfelder werden vor dem Senden geprüft.
            </p>
          </div>

          <AnimatePresence>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 flex gap-4 border border-[#d3ae73]/34 bg-[#d3ae73]/12 p-5 text-[#f7f1e7]"
              >
                <CalendarCheck2 className="mt-1 size-6 shrink-0 text-[#d3ae73]" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Terminanfrage erhalten.</p>
                  <p className="mt-2 text-sm leading-6 text-[#cbbfac]">
                    Der Termin wurde vorbereitet. Der Salon bestätigt den Slot
                    anschließend persönlich.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.form>
      </div>
    </SectionReveal>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.label whileHover={{ y: -1 }} className={`block ${className}`}>
      <span className="mb-2 flex min-h-5 items-center justify-between gap-3 text-sm font-medium text-[#f7f1e7]">
        {label}
        {error ? <span className="text-xs text-red-200">{error}</span> : null}
      </span>
      {children}
    </motion.label>
  );
}
