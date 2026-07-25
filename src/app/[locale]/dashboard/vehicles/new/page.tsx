"use client";

import { useTranslations } from "next-intl";
import { Badge, Card } from "@/components";
import { useRouter } from "@/i18n/routing";
import { VehicleForm } from "@/components/vehicles/vehicle-form";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export default function NewVehiclePage() {
  const t = useTranslations("dashboard.pages.vehicles");
  const router = useRouter();
  const { addVehicle } = useVehicles();

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("new.title")}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        {t("new.description")}
      </p>
      <Card className="mt-8">
        <VehicleForm
          onCancel={() => router.push("/dashboard/vehicles")}
          onSubmit={(values) => {
            const vehicle = addVehicle(values);
            router.push(`/dashboard/vehicles/${vehicle.id}?status=created`);
          }}
          submitLabel={t("actions.save")}
        />
      </Card>
    </div>
  );
}
