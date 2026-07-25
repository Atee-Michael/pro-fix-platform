"use client";

import { useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { useDocuments } from "@/components/documents/document-provider";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export function CustomerDocumentList({
  kind
}: {
  kind: "reports" | "receipts";
}) {
  const t = useTranslations("dashboard.pages.documents");
  const format = useFormatter();
  const { documents } = useDocuments();
  const { vehicles } = useVehicles();
  const [vehicleId, setVehicleId] = useState("all");
  const [date, setDate] = useState("");
  const [downloaded, setDownloaded] = useState("");
  const matchingCategories =
    kind === "reports"
      ? ["diagnosticReport", "inspectionReport", "serviceReport"]
      : ["receipt", "invoice"];
  const filtered = documents.filter(
    (document) =>
      document.customerId === "customer-001" &&
      matchingCategories.includes(document.category) &&
      (vehicleId === "all" || document.vehicleId === vehicleId) &&
      (!date || document.createdAt.slice(0, 10) === date)
  );

  return (
    <div>
      <Badge>{t(`${kind}.eyebrow`)}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{t(`${kind}.title`)}</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
        {t(`${kind}.description`)}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.vehicle")}
          <select
            className="h-11 rounded-md border border-zinc-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-950"
            onChange={(event) => setVehicleId(event.target.value)}
            value={vehicleId}
          >
            <option value="all">{t("filters.allVehicles")}</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} — {vehicle.registrationNumber}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.date")}
          <input
            className="h-11 rounded-md border border-zinc-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-950"
            onChange={(event) => setDate(event.target.value)}
            type="date"
            value={date}
          />
        </label>
      </div>
      {downloaded && (
        <p
          className="mt-5 rounded-md border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100"
          role="status"
        >
          {t("downloadDemo", { title: downloaded })}
        </p>
      )}
      {filtered.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {filtered.map((document) => {
            const vehicle = vehicles.find(
              (item) => item.id === document.vehicleId
            );
            return (
              <Card key={document.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge>{t(`categories.${document.category}`)}</Badge>
                    <h2 className="mt-3 text-lg font-semibold">
                      {document.title}
                    </h2>
                  </div>
                  {!document.available && (
                    <Badge>{t("unavailable.badge")}</Badge>
                  )}
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <Metadata label={t("metadata.vehicle")} value={
                    vehicle
                      ? `${vehicle.make} ${vehicle.model} — ${vehicle.registrationNumber}`
                      : t("metadata.unknownVehicle")
                  } />
                  <Metadata label={t("metadata.fileName")} value={document.fileName} />
                  <Metadata
                    label={t("metadata.fileSize")}
                    value={format.number(document.sizeBytes / 1024, {
                      maximumFractionDigits: 0
                    }) + ` ${t("metadata.kilobytes")}`}
                  />
                  <Metadata
                    label={t("metadata.created")}
                    value={format.dateTime(new Date(document.createdAt), {
                      dateStyle: "long"
                    })}
                  />
                </dl>
                {document.notes && (
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {document.notes}
                  </p>
                )}
                {document.available ? (
                  <Button
                    className="mt-5"
                    onClick={() => setDownloaded(document.title)}
                    variant="secondary"
                  >
                    {t("download")}
                  </Button>
                ) : (
                  <p className="mt-5 text-sm font-medium text-amber-800 dark:text-amber-200">
                    {t("unavailable.description")}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="mt-6 text-center">
          <h2 className="text-xl font-semibold">{t("empty.title")}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {t("empty.description")}
          </p>
        </Card>
      )}
    </div>
  );

  function Metadata({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <dt className="text-zinc-500">{label}</dt>
        <dd className="mt-1 break-all font-semibold">{value}</dd>
      </div>
    );
  }
}
