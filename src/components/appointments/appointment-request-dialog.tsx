"use client";

import { useEffect, useState, useRef } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components";
import { preferredTimes } from "@/lib/mock-data/appointments";
import { dateStepSchema, timeStepSchema } from "@/lib/appointment-schema";

const inputClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none focus:border-blue-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export function AppointmentRequestDialog({
  initialDate,
  initialTime,
  mode,
  onCancel,
  onConfirm,
  open
}: {
  initialDate: string;
  initialTime: string;
  mode: "cancel" | "reschedule";
  onCancel: () => void;
  onConfirm: (date?: string, time?: string) => Promise<void>;
  open: boolean;
}) {
  const t = useTranslations("dashboard.pages.appointments.requests");
  const format = useFormatter();
  const ref = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  async function confirm() {
    if (mode === "reschedule") {
      const dateResult = dateStepSchema.safeParse({ preferredDate: date });
      const timeResult = timeStepSchema.safeParse({ preferredTime: time });
      if (!dateResult.success) {
        setError(t(`validation.${dateResult.error.issues[0].message}`));
        return;
      }
      if (!timeResult.success) {
        setError(t(`validation.${timeResult.error.issues[0].message}`));
        return;
      }
    }
    setError("");
    setSubmitting(true);
    await onConfirm(date, time);
    setSubmitting(false);
  }

  return (
    <dialog
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border border-zinc-200 bg-white p-0 text-zinc-950 shadow-2xl backdrop:bg-black/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
      onCancel={onCancel}
      ref={ref}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold">{t(`${mode}.title`)}</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {t(`${mode}.description`)}
        </p>
        {mode === "reschedule" && (
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              {t("dateLabel")}
              <input
                className={inputClass}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                value={date}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {t("timeLabel")}
              <select
                className={inputClass}
                onChange={(event) => setTime(event.target.value)}
                value={time}
              >
                {preferredTimes.map((option) => (
                  <option key={option} value={option}>
                    {format.dateTime(new Date(`2026-01-01T${option}:00`), {
                      hour: "numeric",
                      minute: "2-digit"
                    })}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-700 dark:text-red-300" role="alert">
            {error}
          </p>
        )}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button disabled={submitting} onClick={onCancel} variant="secondary">
            {t("dismiss")}
          </Button>
          <Button
            className={mode === "cancel" ? "bg-red-700 hover:bg-red-600" : ""}
            disabled={submitting}
            onClick={confirm}
          >
            {submitting ? t("submitting") : t(`${mode}.confirm`)}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
