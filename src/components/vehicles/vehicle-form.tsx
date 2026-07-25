"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/button";
import {
  fuelTypes,
  transmissionTypes,
  type VehicleInput
} from "@/lib/mock-data/vehicles";
import { vehicleSchema, type VehicleFormValues } from "@/lib/vehicle-schema";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof VehicleFormValues, string>>;

const inputClass =
  "h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export function VehicleForm({
  initialValues,
  onCancel,
  onSubmit,
  submitLabel
}: {
  initialValues?: VehicleInput;
  onCancel: () => void;
  onSubmit: (values: VehicleInput) => void;
  submitLabel: string;
}) {
  const t = useTranslations("dashboard.pages.vehicles");
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData) as VehicleFormValues;
    const result = vehicleSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof VehicleFormValues;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      setFeedback(t("validation.summary"));
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  function fieldError(field: keyof VehicleFormValues) {
    const key = errors[field];
    return key ? t(`validation.${key}`) : undefined;
  }

  const fields = [
    ["make", "text"],
    ["model", "text"],
    ["year", "number"],
    ["registrationNumber", "text"],
    ["vin", "text"],
    ["mileage", "number"]
  ] as const;

  return (
    <form className="mt-8 grid gap-6" noValidate onSubmit={handleSubmit}>
      {feedback && (
        <div
          className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"
          role="alert"
        >
          {feedback}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map(([name, type]) => {
          const error = fieldError(name);
          return (
            <label className="grid gap-2 text-sm font-medium" key={name}>
              {t(`fields.${name}`)}
              <input
                aria-describedby={error ? `${name}-error` : undefined}
                aria-invalid={Boolean(error)}
                className={cn(inputClass, error && "border-red-600")}
                defaultValue={initialValues?.[name] ?? ""}
                id={name}
                min={name === "mileage" ? 0 : undefined}
                name={name}
                type={type}
              />
              {error && (
                <span className="text-sm text-red-700 dark:text-red-300" id={`${name}-error`}>
                  {error}
                </span>
              )}
            </label>
          );
        })}
        <SelectField
          defaultValue={initialValues?.fuelType}
          error={fieldError("fuelType")}
          name="fuelType"
          options={fuelTypes}
        />
        <SelectField
          defaultValue={initialValues?.transmission}
          error={fieldError("transmission")}
          name="transmission"
          options={transmissionTypes}
        />
      </div>
      <label className="grid gap-2 text-sm font-medium">
        {t("fields.notes")}
        <textarea
          className={cn(inputClass, "min-h-32 py-3")}
          defaultValue={initialValues?.notes}
          id="notes"
          name="notes"
        />
        {fieldError("notes") && (
          <span className="text-sm text-red-700 dark:text-red-300">
            {fieldError("notes")}
          </span>
        )}
      </label>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button onClick={onCancel} variant="secondary">
          {t("actions.cancel")}
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );

  function SelectField({
    defaultValue,
    error,
    name,
    options
  }: {
    defaultValue?: string;
    error?: string;
    name: "fuelType" | "transmission";
    options: readonly string[];
  }) {
    return (
      <label className="grid gap-2 text-sm font-medium">
        {t(`fields.${name}`)}
        <select
          aria-invalid={Boolean(error)}
          className={cn(inputClass, error && "border-red-600")}
          defaultValue={defaultValue ?? ""}
          id={name}
          name={name}
        >
          <option disabled value="">
            {t("form.selectOption")}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {t(`options.${name}.${option}`)}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
        )}
      </label>
    );
  }
}
