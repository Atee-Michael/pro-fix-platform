"use client";

import { useMemo, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { useAppointments } from "@/components/appointments/appointment-provider";
import { useVehicles } from "@/components/vehicles/vehicle-provider";
import {
  bookingReviewSchema,
  contactStepSchema,
  dateStepSchema,
  notesStepSchema,
  serviceStepSchema,
  timeStepSchema,
  vehicleStepSchema
} from "@/lib/appointment-schema";
import {
  preferredTimes,
  serviceTypes,
  type AppointmentInput,
  type MockAppointment
} from "@/lib/mock-data/appointments";
import { cn } from "@/lib/utils";
import { mockDashboardData } from "@/lib/mock-dashboard-data";

type BookingState = {
  serviceType: string;
  vehicleMode: "existing" | "temporary";
  vehicleId: string;
  temporaryMake: string;
  temporaryModel: string;
  temporaryYear: string;
  temporaryRegistration: string;
  preferredDate: string;
  preferredTime: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

type Errors = Record<string, string>;

const initialState: BookingState = {
  serviceType: "",
  vehicleMode: "existing",
  vehicleId: "",
  temporaryMake: "",
  temporaryModel: "",
  temporaryYear: "",
  temporaryRegistration: "",
  preferredDate: "",
  preferredTime: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  notes: ""
};

const inputClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export default function BookAppointmentPage() {
  const t = useTranslations("dashboard.pages.appointmentBooking");
  const format = useFormatter();
  const searchParams = useSearchParams();
  const isGuest = searchParams.get("mode") === "guest";
  const { vehicles } = useVehicles();
  const { submitAppointment } = useAppointments();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<BookingState>(() => ({
    ...initialState,
    contactName: isGuest ? "" : mockDashboardData.customer.name,
    contactEmail: isGuest ? "" : mockDashboardData.customer.email,
    contactPhone: isGuest ? "" : mockDashboardData.customer.phone
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [submissionError, setSubmissionError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<MockAppointment>();

  const schemas = useMemo(
    () => [
      serviceStepSchema,
      vehicleStepSchema,
      dateStepSchema,
      timeStepSchema,
      contactStepSchema,
      notesStepSchema
    ],
    []
  );

  function update(field: keyof BookingState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateCurrentStep() {
    const schema = schemas[step - 1];
    if (!schema) return true;
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Errors = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!nextErrors[field]) nextErrors[field] = issue.message;
    }
    setErrors(nextErrors);
    return false;
  }

  function next() {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(current + 1, 7));
  }

  function back() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  async function submit() {
    setSubmissionError(false);
    const reviewResult = bookingReviewSchema.safeParse(values);
    if (!reviewResult.success) {
      setSubmissionError(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const input: AppointmentInput = {
        serviceType: values.serviceType as AppointmentInput["serviceType"],
        vehicle:
          values.vehicleMode === "existing"
            ? { mode: "existing", vehicleId: values.vehicleId }
            : {
                mode: "temporary",
                make: values.temporaryMake.trim(),
                model: values.temporaryModel.trim(),
                year: Number(values.temporaryYear),
                registrationNumber: values.temporaryRegistration.trim()
              },
        preferredDate: values.preferredDate,
        preferredTime: values.preferredTime,
        contactName: values.contactName.trim(),
        contactEmail: values.contactEmail.trim(),
        contactPhone: values.contactPhone.trim(),
        notes: values.notes.trim()
      };
      const appointment = await submitAppointment(input);
      setConfirmation(appointment);
      setStep(8);
    } catch {
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === values.vehicleId
  );
  const dateTime =
    values.preferredDate && values.preferredTime
      ? new Date(`${values.preferredDate}T${values.preferredTime}:00`)
      : undefined;

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>

      <ol
        aria-label={t("progress.label")}
        className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-8"
      >
        {Array.from({ length: 8 }, (_, index) => index + 1).map((number) => (
          <li key={number}>
            <div
              aria-current={step === number ? "step" : undefined}
              className={cn(
                "h-2 rounded-full",
                number <= step
                  ? "bg-blue-800 dark:bg-blue-500"
                  : "bg-zinc-200 dark:bg-zinc-700"
              )}
            />
            <span className="mt-2 block text-xs text-zinc-500 dark:text-zinc-400">
              {t("progress.step", { current: number, total: 8 })}
            </span>
          </li>
        ))}
      </ol>

      <Card className="mt-8">
        {step === 1 && (
          <StepSection
            description={t("steps.service.description")}
            title={t("steps.service.title")}
          >
            <OptionGrid>
              {serviceTypes.map((service) => (
                <Choice
                  checked={values.serviceType === service}
                  key={service}
                  label={t(`services.${service}`)}
                  name="serviceType"
                  onChange={() => update("serviceType", service)}
                  value={service}
                />
              ))}
            </OptionGrid>
            <ErrorText error={errors.serviceType} />
          </StepSection>
        )}

        {step === 2 && (
          <StepSection
            description={t("steps.vehicle.description")}
            title={t("steps.vehicle.title")}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Choice
                checked={values.vehicleMode === "existing"}
                label={t("vehicle.existing")}
                name="vehicleMode"
                onChange={() => update("vehicleMode", "existing")}
                value="existing"
              />
              <Choice
                checked={values.vehicleMode === "temporary"}
                label={t("vehicle.temporary")}
                name="vehicleMode"
                onChange={() => update("vehicleMode", "temporary")}
                value="temporary"
              />
            </div>
            {values.vehicleMode === "existing" ? (
              <div className="mt-5">
                {vehicles.length ? (
                  <OptionGrid>
                    {vehicles.map((vehicle) => (
                      <Choice
                        checked={values.vehicleId === vehicle.id}
                        key={vehicle.id}
                        label={`${vehicle.make} ${vehicle.model} — ${vehicle.registrationNumber}`}
                        name="vehicleId"
                        onChange={() => update("vehicleId", vehicle.id)}
                        value={vehicle.id}
                      />
                    ))}
                  </OptionGrid>
                ) : (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {t("vehicle.none")}
                  </p>
                )}
                <ErrorText error={errors.vehicleId} />
              </div>
            ) : (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {(
                  [
                    ["temporaryMake", "text"],
                    ["temporaryModel", "text"],
                    ["temporaryYear", "number"],
                    ["temporaryRegistration", "text"]
                  ] as const
                ).map(([field, type]) => (
                  <Field
                    error={errors[field]}
                    key={field}
                    label={t(`vehicle.fields.${field}`)}
                  >
                    <input
                      className={inputClass}
                      onChange={(event) => update(field, event.target.value)}
                      type={type}
                      value={values[field]}
                    />
                  </Field>
                ))}
              </div>
            )}
          </StepSection>
        )}

        {step === 3 && (
          <StepSection
            description={t("steps.date.description")}
            title={t("steps.date.title")}
          >
            <Field
              error={errors.preferredDate}
              label={t("fields.preferredDate")}
            >
              <input
                className={inputClass}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => update("preferredDate", event.target.value)}
                type="date"
                value={values.preferredDate}
              />
            </Field>
          </StepSection>
        )}

        {step === 4 && (
          <StepSection
            description={t("steps.time.description")}
            title={t("steps.time.title")}
          >
            <OptionGrid>
              {preferredTimes.map((time) => (
                <Choice
                  checked={values.preferredTime === time}
                  key={time}
                  label={format.dateTime(
                    new Date(`2026-01-01T${time}:00`),
                    { hour: "numeric", minute: "2-digit" }
                  )}
                  name="preferredTime"
                  onChange={() => update("preferredTime", time)}
                  value={time}
                />
              ))}
            </OptionGrid>
            <ErrorText error={errors.preferredTime} />
          </StepSection>
        )}

        {step === 5 && (
          <StepSection
            description={t("steps.contact.description")}
            title={t("steps.contact.title")}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {(["contactName", "contactEmail", "contactPhone"] as const).map(
                (field) => (
                  <Field
                    error={errors[field]}
                    key={field}
                    label={t(`fields.${field}`)}
                  >
                    <input
                      className={inputClass}
                      onChange={(event) => update(field, event.target.value)}
                      type={field === "contactEmail" ? "email" : "text"}
                      value={values[field]}
                    />
                  </Field>
                )
              )}
            </div>
          </StepSection>
        )}

        {step === 6 && (
          <StepSection
            description={t("steps.notes.description")}
            title={t("steps.notes.title")}
          >
            <Field error={errors.notes} label={t("fields.notes")}>
              <textarea
                className={cn(inputClass, "min-h-40 py-3")}
                maxLength={2000}
                onChange={(event) => update("notes", event.target.value)}
                value={values.notes}
              />
            </Field>
            <p className="mt-2 text-right text-xs text-zinc-500">
              {t("notesCount", { count: values.notes.length, max: 2000 })}
            </p>
          </StepSection>
        )}

        {step === 7 && (
          <StepSection
            description={t("steps.review.description")}
            title={t("steps.review.title")}
          >
            <dl className="grid gap-5 sm:grid-cols-2">
              <ReviewItem
                label={t("review.service")}
                value={t(`services.${values.serviceType}`)}
              />
              <ReviewItem
                label={t("review.vehicle")}
                value={
                  values.vehicleMode === "existing"
                    ? selectedVehicle
                      ? `${selectedVehicle.make} ${selectedVehicle.model} — ${selectedVehicle.registrationNumber}`
                      : ""
                    : `${values.temporaryMake} ${values.temporaryModel} — ${values.temporaryRegistration}`
                }
              />
              <ReviewItem
                label={t("review.preferredDateTime")}
                value={
                  dateTime
                    ? format.dateTime(dateTime, {
                        dateStyle: "long",
                        timeStyle: "short"
                      })
                    : ""
                }
              />
              <ReviewItem
                label={t("review.contact")}
                value={`${values.contactName}\n${values.contactEmail}\n${values.contactPhone}`}
              />
              <ReviewItem
                label={t("review.notes")}
                value={values.notes || t("review.noNotes")}
              />
            </dl>
            {submissionError && (
              <div
                className="mt-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"
                role="alert"
              >
                {t("feedback.error")}
              </div>
            )}
          </StepSection>
        )}

        {step === 8 && confirmation && (
          <div className="py-6 text-center" role="status">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-800 dark:bg-green-950 dark:text-green-200">
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-bold">{t("success.title")}</h2>
            <p className="mx-auto mt-3 max-w-lg text-zinc-600 dark:text-zinc-300">
              {t("success.description")}
            </p>
            <p className="mt-4 text-sm font-semibold">
              {t("success.reference", { reference: confirmation.id })}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/dashboard/bookings">
                <Button>{t("success.viewAppointments")}</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary">{t("success.dashboard")}</Button>
              </Link>
            </div>
          </div>
        )}

        {step < 8 && (
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between dark:border-zinc-800">
            {step > 1 ? (
              <Button disabled={isSubmitting} onClick={back} variant="secondary">
                {t("actions.back")}
              </Button>
            ) : (
              <Link href="/dashboard/bookings">
                <Button className="w-full" variant="secondary">
                  {t("actions.cancel")}
                </Button>
              </Link>
            )}
            {step < 7 ? (
              <Button onClick={next}>{t("actions.continue")}</Button>
            ) : (
              <Button disabled={isSubmitting} onClick={submit}>
                {isSubmitting
                  ? t("actions.submitting")
                  : t("actions.submit")}
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );

  function ErrorText({ error }: { error?: string }) {
    return error ? (
      <p className="mt-2 text-sm text-red-700 dark:text-red-300" role="alert">
        {t(`validation.${error}`)}
      </p>
    ) : null;
  }

  function Field({
    children,
    error,
    label
  }: {
    children: React.ReactNode;
    error?: string;
    label: string;
  }) {
    return (
      <label className="block text-sm font-medium">
        <span className="mb-2 block">{label}</span>
        {children}
        <ErrorText error={error} />
      </label>
    );
  }

  function StepSection({
    children,
    description,
    title
  }: {
    children: React.ReactNode;
    description: string;
    title: string;
  }) {
    return (
      <section>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 mb-6 text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
        {children}
      </section>
    );
  }

  function OptionGrid({ children }: { children: React.ReactNode }) {
    return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
  }

  function Choice({
    checked,
    label,
    name,
    onChange,
    value
  }: {
    checked: boolean;
    label: string;
    name: string;
    onChange: () => void;
    value: string;
  }) {
    return (
      <label
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-md border p-4 text-sm font-semibold transition-colors",
          checked
            ? "border-blue-800 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40"
            : "border-zinc-300 hover:border-blue-500 dark:border-zinc-700"
        )}
      >
        <input
          checked={checked}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
        />
        {label}
      </label>
    );
  }

  function ReviewItem({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </dt>
        <dd className="mt-1 whitespace-pre-line font-semibold">{value}</dd>
      </div>
    );
  }
}
