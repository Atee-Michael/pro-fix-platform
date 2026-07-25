"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { useDocuments } from "@/components/documents/document-provider";
import {
  adminCustomers,
  adminVehicles
} from "@/lib/mock-data/admin-appointments";

export default function AdminReportsPage() {
  const t = useTranslations("admin.documents");
  const format = useFormatter();
  const { documents } = useDocuments();
  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
        <div>
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold">{t("title")}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>
        <Link href="/admin/reports/upload">
          <Button>{t("actions.upload")}</Button>
        </Link>
      </div>
      <p className="mt-4 text-sm font-medium text-amber-800 dark:text-amber-200">
        {t("demoNotice")}
      </p>
      <div className="mt-8 grid gap-4">
        {documents.map((document) => {
          const customer = adminCustomers.find(
            (item) => item.id === document.customerId
          );
          const vehicle = adminVehicles.find(
            (item) => item.id === document.vehicleId
          );
          return (
            <Card key={document.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge>{t(`categories.${document.category}`)}</Badge>
                  <h2 className="mt-3 text-lg font-semibold">{document.title}</h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {customer?.name} · {vehicle?.make} {vehicle?.model}
                  </p>
                </div>
                <Badge>
                  {document.available ? t("states.available") : t("states.metadataOnly")}
                </Badge>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-zinc-500 sm:grid-cols-2">
                <p className="break-all">{document.fileName}</p>
                <p>
                  {format.dateTime(new Date(document.createdAt), {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
