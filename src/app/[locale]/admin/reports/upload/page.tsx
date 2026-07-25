"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { useRouter } from "@/i18n/routing";
import { useDocuments } from "@/components/documents/document-provider";
import {
  adminCustomers,
  adminVehicles
} from "@/lib/mock-data/admin-appointments";
import { useAdminAppointments } from "@/components/admin/admin-appointment-provider";
import {
  allowedDocumentExtensions,
  documentCategories,
  futureMaximumDocumentSizeBytes
} from "@/lib/mock-data/documents";
import {
  documentFileSchema,
  documentMetadataSchema
} from "@/lib/document-schema";

const inputClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950";

export default function AdminDocumentUploadPage() {
  const t = useTranslations("admin.documents");
  const router = useRouter();
  const { appointments } = useAdminAppointments();
  const { addDocumentMetadata } = useDocuments();
  const [file, setFile] = useState<File>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [simulateFailure, setSimulateFailure] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("idle");
    const metadataResult = documentMetadataSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget))
    );
    const fileResult = documentFileSchema.safeParse(
      file ? { name: file.name, type: file.type, size: file.size } : {}
    );
    const nextErrors: Record<string, string> = {};
    if (!metadataResult.success) {
      for (const issue of metadataResult.error.issues) {
        nextErrors[String(issue.path[0])] = issue.message;
      }
    }
    if (!fileResult.success) {
      nextErrors.file = fileResult.error.issues[0].message;
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setState("uploading");
    for (const value of [20, 45, 75, 100]) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      setProgress(value);
    }
    if (simulateFailure) {
      setState("error");
      return;
    }
    if (metadataResult.success && fileResult.success) {
      addDocumentMetadata({
        ...metadataResult.data,
        fileName: fileResult.data.name,
        mimeType: fileResult.data.type,
        sizeBytes: fileResult.data.size
      });
      setState("success");
    }
  }

  return (
    <div>
      <Badge>{t("upload.eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{t("upload.title")}</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
        {t("upload.description")}
      </p>
      <p className="mt-3 text-sm font-semibold text-amber-800 dark:text-amber-200">
        {t("upload.noRealUpload")}
      </p>
      <Card className="mt-8">
        <form className="grid gap-5" noValidate onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              error={errors.customerId}
              label={t("fields.customer")}
              name="customerId"
            >
              {adminCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>
            <Select error={errors.vehicleId} label={t("fields.vehicle")} name="vehicleId">
              {adminVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} — {vehicle.registrationNumber}
                </option>
              ))}
            </Select>
            <Select
              error={errors.appointmentId}
              label={t("fields.appointment")}
              name="appointmentId"
            >
              {appointments.map((appointment) => (
                <option key={appointment.id} value={appointment.id}>
                  {appointment.id} — {appointment.scheduledDate}
                </option>
              ))}
            </Select>
            <Select error={errors.category} label={t("fields.category")} name="category">
              {documentCategories.map((category) => (
                <option key={category} value={category}>
                  {t(`categories.${category}`)}
                </option>
              ))}
            </Select>
          </div>
          <Field error={errors.title} label={t("fields.title")}>
            <input className={inputClass} name="title" />
          </Field>
          <Field error={errors.notes} label={t("fields.notes")}>
            <textarea className={`${inputClass} min-h-28 py-3`} name="notes" />
          </Field>
          <Field error={errors.file} label={t("fields.file")}>
            <input
              accept={allowedDocumentExtensions.join(",")}
              className="block w-full rounded-md border border-zinc-300 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              onChange={(event) => setFile(event.target.files?.[0])}
              type="file"
            />
            <span className="text-xs font-normal text-zinc-500">
              {t("upload.rules", {
                types: allowedDocumentExtensions.join(", "),
                size: futureMaximumDocumentSizeBytes / 1024 / 1024
              })}
            </span>
          </Field>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input
              checked={simulateFailure}
              onChange={(event) => setSimulateFailure(event.target.checked)}
              type="checkbox"
            />
            {t("upload.simulateFailure")}
          </label>
          {state === "uploading" && (
            <div role="status">
              <div className="h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full bg-blue-700 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm">{t("upload.progress", { progress })}</p>
            </div>
          )}
          {state === "success" && (
            <p className="rounded-md bg-green-50 p-4 text-sm text-green-900 dark:bg-green-950/40 dark:text-green-100" role="status">
              {t("upload.success")}
            </p>
          )}
          {state === "error" && (
            <p className="rounded-md bg-red-50 p-4 text-sm text-red-900 dark:bg-red-950/40 dark:text-red-100" role="alert">
              {t("upload.failure")}
            </p>
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button onClick={() => router.push("/admin/reports")} variant="secondary">
              {t("actions.cancel")}
            </Button>
            <Button disabled={state === "uploading"} type="submit">
              {t("actions.uploadDemo")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );

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
      <label className="grid gap-2 text-sm font-semibold">
        {label}
        {children}
        {error && (
          <span className="font-normal text-red-700 dark:text-red-300">
            {t(`validation.${error}`)}
          </span>
        )}
      </label>
    );
  }

  function Select({
    children,
    error,
    label,
    name
  }: {
    children: React.ReactNode;
    error?: string;
    label: string;
    name: string;
  }) {
    return (
      <Field error={error} label={label}>
        <select className={inputClass} defaultValue="" name={name}>
          <option disabled value="">
            {t("fields.select")}
          </option>
          {children}
        </select>
      </Field>
    );
  }
}
