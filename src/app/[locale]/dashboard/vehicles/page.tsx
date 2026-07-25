"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export default function VehiclesPage() {
  const t = useTranslations("dashboard.pages.vehicles");
  const format = useFormatter();
  const searchParams = useSearchParams();
  const { vehicles } = useVehicles();

  return (
    <div>
      {searchParams.get("status") === "deleted" && (
        <div
          className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100"
          role="status"
        >
          {t("feedback.deleted")}
        </div>
      )}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>
        <Link href="/dashboard/vehicles/new">
          <Button className="w-full sm:w-auto">{t("actions.add")}</Button>
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <Card className="mt-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-950">
            +
          </div>
          <h2 className="mt-4 text-xl font-semibold">{t("empty.title")}</h2>
          <p className="mx-auto mt-2 max-w-md text-zinc-600 dark:text-zinc-300">
            {t("empty.description")}
          </p>
          <Link className="mt-5 inline-block" href="/dashboard/vehicles/new">
            <Button>{t("empty.action")}</Button>
          </Link>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <Link href={`/dashboard/vehicles/${vehicle.id}`} key={vehicle.id}>
              <Card className="h-full transition-colors hover:border-blue-700">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {vehicle.make} {vehicle.model}
                    </h2>
                    <p className="mt-1 font-mono text-sm text-zinc-600 dark:text-zinc-300">
                      {vehicle.registrationNumber}
                    </p>
                  </div>
                  <Badge>
                    {format.number(vehicle.year, { useGrouping: false })}
                  </Badge>
                </div>
                <p className="mt-5 text-sm font-semibold text-blue-800 dark:text-blue-300">
                  {t("actions.view")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
