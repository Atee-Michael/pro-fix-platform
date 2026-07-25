"use client";

import { useTranslations } from "next-intl";
import { Button, Card } from "@/components";

export default function AppointmentsError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("dashboard.pages.appointments.error");
  return (
    <Card role="alert">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <Button className="mt-5" onClick={reset}>
        {t("retry")}
      </Button>
    </Card>
  );
}
