"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link, useRouter } from "@/i18n/routing";
import { DeleteVehicleDialog } from "@/components/vehicles/delete-vehicle-dialog";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export default function VehicleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const t = useTranslations("dashboard.pages.vehicles");
  const format = useFormatter();
  const router = useRouter();
  const { deleteVehicle, getVehicle } = useVehicles();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const vehicle = getVehicle(id);
  const status = searchParams.get("status");

  if (!vehicle) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {t("notFound.description")}
        </p>
        <Link className="mt-5 inline-block" href="/dashboard/vehicles">
          <Button>{t("actions.back")}</Button>
        </Link>
      </Card>
    );
  }

  const details = [
    ["make", vehicle.make],
    ["model", vehicle.model],
    ["year", format.number(vehicle.year, { useGrouping: false })],
    ["registrationNumber", vehicle.registrationNumber],
    ["vin", vehicle.vin],
    ["mileage", t("details.mileageValue", { value: vehicle.mileage })],
    ["fuelType", t(`options.fuelType.${vehicle.fuelType}`)],
    ["transmission", t(`options.transmission.${vehicle.transmission}`)]
  ] as const;

  return (
    <div>
      {(status === "created" || status === "updated") && (
        <div
          className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100"
          role="status"
        >
          {t(`feedback.${status}`)}
        </div>
      )}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{vehicle.registrationNumber}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {vehicle.make} {vehicle.model}
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {t("details.description")}
          </p>
        </div>
        <div className="flex gap-3">
          <Link className="flex-1" href={`/dashboard/vehicles/${vehicle.id}/edit`}>
            <Button className="w-full" variant="secondary">
              {t("actions.edit")}
            </Button>
          </Link>
          <Button
            className="flex-1 text-red-700 dark:text-red-300"
            onClick={() => setConfirmingDelete(true)}
            variant="ghost"
          >
            {t("actions.delete")}
          </Button>
        </div>
      </div>

      <Card className="mt-8">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {details.map(([key, value]) => (
            <div key={key}>
              <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {t(`fields.${key}`)}
              </dt>
              <dd className="mt-1 break-words font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {t("fields.notes")}
          </h2>
          <p className="mt-2 whitespace-pre-wrap">
            {vehicle.notes || t("details.noNotes")}
          </p>
        </div>
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
          {t("details.updated", {
            date: format.dateTime(new Date(vehicle.updatedAt), {
              dateStyle: "medium",
              timeStyle: "short"
            })
          })}
        </p>
      </Card>

      <DeleteVehicleDialog
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteVehicle(vehicle.id);
          router.push("/dashboard/vehicles?status=deleted");
        }}
        open={confirmingDelete}
        vehicleName={`${vehicle.make} ${vehicle.model}`}
      />
    </div>
  );
}
