"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/lib/mock-data/appointments";

const statusClasses: Record<AppointmentStatus, string> = {
  pending: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
  confirmed: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100",
  inProgress: "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100",
  awaitingParts: "border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-100",
  completed: "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/40 dark:text-green-100",
  cancelled: "border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
};

export function AppointmentStatusBadge({
  status
}: {
  status: AppointmentStatus;
}) {
  const t = useTranslations("dashboard.pages.appointments.statuses");
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
        statusClasses[status]
      )}
    >
      {t(status)}
    </span>
  );
}
