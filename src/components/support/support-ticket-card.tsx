"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Card } from "@/components";
import { Link } from "@/i18n/routing";
import {
  TicketPriorityBadge,
  TicketStatusBadge
} from "@/components/support/ticket-badges";
import type { SupportTicket } from "@/lib/mock-data/support-tickets";

export function SupportTicketCard({ ticket }: { ticket: SupportTicket }) {
  const t = useTranslations("dashboard.pages.support");
  const format = useFormatter();

  return (
    <Link href={`/dashboard/support/${ticket.id}`}>
      <Card className="h-full transition-colors hover:border-blue-700">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">{ticket.subject}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {t(`categories.${ticket.category}`)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {t("card.updated", {
            date: format.dateTime(new Date(ticket.updatedAt), {
              dateStyle: "medium",
              timeStyle: "short"
            })
          })}
        </p>
        <p className="mt-4 text-sm font-semibold text-blue-800 dark:text-blue-300">
          {t("actions.view")}
        </p>
      </Card>
    </Link>
  );
}
