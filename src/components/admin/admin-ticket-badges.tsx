"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type {
  TicketPriority,
  TicketStatus
} from "@/lib/mock-data/support-tickets";

const statusClasses: Record<TicketStatus, string> = {
  open: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100",
  awaitingReply: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
  resolved: "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/40 dark:text-green-100",
  closed: "border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
};

const priorityClasses: Record<TicketPriority, string> = {
  low: "border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
  normal: "border-blue-300 text-blue-800 dark:border-blue-800 dark:text-blue-300",
  high: "border-orange-300 text-orange-800 dark:border-orange-800 dark:text-orange-300",
  urgent: "border-red-300 text-red-800 dark:border-red-800 dark:text-red-300"
};

export function AdminTicketBadge({
  type,
  value
}: {
  type: "status" | "priority";
  value: TicketStatus | TicketPriority;
}) {
  const t = useTranslations("admin.supportManagement");
  const className =
    type === "status"
      ? statusClasses[value as TicketStatus]
      : priorityClasses[value as TicketPriority];
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
        className
      )}
    >
      {t(`${type === "status" ? "statuses" : "priorities"}.${value}`)}
    </span>
  );
}
