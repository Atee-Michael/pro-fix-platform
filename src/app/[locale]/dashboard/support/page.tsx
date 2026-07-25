"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { SupportTicketCard } from "@/components/support/support-ticket-card";
import { useSupportTickets } from "@/components/support/support-ticket-provider";
import {
  ticketStatuses,
  type TicketStatus
} from "@/lib/mock-data/support-tickets";

export default function SupportPage() {
  const t = useTranslations("dashboard.pages.support");
  const { tickets } = useSupportTickets();
  const [filter, setFilter] = useState<"all" | TicketStatus>("all");
  const filtered =
    filter === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>
        <Link href="/dashboard/support/new">
          <Button className="w-full sm:w-auto">{t("actions.new")}</Button>
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:max-w-xs">
        <label className="text-sm font-semibold" htmlFor="ticket-status-filter">
          {t("filter.label")}
        </label>
        <select
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-base dark:border-zinc-700 dark:bg-zinc-950"
          id="ticket-status-filter"
          onChange={(event) =>
            setFilter(event.target.value as "all" | TicketStatus)
          }
          value={filter}
        >
          <option value="all">{t("filter.all")}</option>
          {ticketStatuses.map((status) => (
            <option key={status} value={status}>
              {t(`statuses.${status}`)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length ? (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {filtered.map((ticket) => (
            <SupportTicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <Card className="mt-6 text-center">
          <h2 className="text-xl font-semibold">
            {tickets.length ? t("empty.filteredTitle") : t("empty.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-zinc-600 dark:text-zinc-300">
            {tickets.length
              ? t("empty.filteredDescription")
              : t("empty.description")}
          </p>
          {!tickets.length && (
            <Link className="mt-5 inline-block" href="/dashboard/support/new">
              <Button>{t("empty.action")}</Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}
