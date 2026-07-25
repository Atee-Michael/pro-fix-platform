"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link, useRouter } from "@/i18n/routing";
import { VehicleForm } from "@/components/vehicles/vehicle-form";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export default function EditVehiclePage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("dashboard.pages.vehicles");
  const router = useRouter();
  const { editVehicle, getVehicle } = useVehicles();
  const vehicle = getVehicle(id);

  if (!vehicle) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <Link className="mt-5 inline-block" href="/dashboard/vehicles">
          <Button>{t("actions.back")}</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div>
      <Badge>{vehicle.registrationNumber}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("edit.title")}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        {t("edit.description")}
      </p>
      <Card className="mt-8">
        <VehicleForm
          initialValues={vehicle}
          onCancel={() => router.push(`/dashboard/vehicles/${vehicle.id}`)}
          onSubmit={(values) => {
            editVehicle(vehicle.id, values);
            router.push(`/dashboard/vehicles/${vehicle.id}?status=updated`);
          }}
          submitLabel={t("actions.update")}
        />
      </Card>
    </div>
  );
}
