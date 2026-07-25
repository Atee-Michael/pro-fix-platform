"use client";

import { useMemo, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AdminTicketBadge } from "@/components/admin/admin-ticket-badges";
import { useAdminSupport } from "@/components/admin/admin-support-provider";
import { adminCustomers } from "@/lib/mock-data/admin-appointments";
import { adminTicketSearchSchema } from "@/lib/admin-support-schema";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses
} from "@/lib/mock-data/support-tickets";

const controlClass =
  "h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950";

export default function AdminSupportPage() {
  const t = useTranslations("admin.supportManagement");
  const format = useFormatter();
  const { tickets } = useAdminSupport();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    const query = adminTicketSearchSchema.parse(search).toLocaleLowerCase();
    return tickets
      .filter((ticket) => {
        const customer = adminCustomers.find(
          (item) => item.id === ticket.customerId
        );
        const haystack = [
          ticket.id,
          ticket.subject,
          customer?.name,
          customer?.email
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();
        return (
          (!query || haystack.includes(query)) &&
          (status === "all" || ticket.status === status) &&
          (priority === "all" || ticket.priority === priority) &&
          (category === "all" || ticket.category === category)
        );
      })
      .sort((a, b) => {
        const comparison = a.updatedAt.localeCompare(b.updatedAt);
        return sort === "newest" ? -comparison : comparison;
      });
  }, [category, priority, search, sort, status, tickets]);

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{t("title")}</h1>
      <p className="mt-3 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <p className="mt-2 text-sm font-medium text-amber-800 dark:text-amber-200">
        {t("temporaryNotice")}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <label className="grid gap-2 text-sm font-semibold xl:col-span-2">
          {t("filters.search")}
          <input
            className={controlClass}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            type="search"
            value={search}
          />
        </label>
        <Filter label={t("filters.status")} onChange={setStatus} value={status}>
          <option value="all">{t("filters.allStatuses")}</option>
          {ticketStatuses.map((option) => (
            <option key={option} value={option}>
              {t(`statuses.${option}`)}
            </option>
          ))}
        </Filter>
        <Filter
          label={t("filters.priority")}
          onChange={setPriority}
          value={priority}
        >
          <option value="all">{t("filters.allPriorities")}</option>
          {ticketPriorities.map((option) => (
            <option key={option} value={option}>
              {t(`priorities.${option}`)}
            </option>
          ))}
        </Filter>
        <Filter
          label={t("filters.category")}
          onChange={setCategory}
          value={category}
        >
          <option value="all">{t("filters.allCategories")}</option>
          {ticketCategories.map((option) => (
            <option key={option} value={option}>
              {t(`categories.${option}`)}
            </option>
          ))}
        </Filter>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {t("results", { count: filtered.length })}
        </p>
        <Filter label={t("filters.sort")} onChange={(value) => setSort(value as "newest" | "oldest")} value={sort}>
          <option value="newest">{t("filters.newest")}</option>
          <option value="oldest">{t("filters.oldest")}</option>
        </Filter>
      </div>

      {filtered.length ? (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {filtered.map((ticket) => {
            const customer = adminCustomers.find(
              (item) => item.id === ticket.customerId
            );
            return (
              <Link href={`/admin/support/${ticket.id}`} key={ticket.id}>
                <Card className="h-full transition-colors hover:border-blue-700">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{ticket.subject}</h2>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        {customer?.name} · {t(`categories.${ticket.category}`)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AdminTicketBadge type="status" value={ticket.status} />
                      <AdminTicketBadge type="priority" value={ticket.priority} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-zinc-500">
                    {t("updated", {
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
          })}
        </div>
      ) : (
        <Card className="mt-6 text-center">
          <h2 className="text-xl font-semibold">{t("empty.title")}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {t("empty.description")}
          </p>
        </Card>
      )}
    </div>
  );

  function Filter({
    children,
    label,
    onChange,
    value
  }: {
    children: React.ReactNode;
    label: string;
    onChange: (value: string) => void;
    value: string;
  }) {
    return (
      <label className="grid gap-2 text-sm font-semibold">
        {label}
        <select
          className={controlClass}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {children}
        </select>
      </label>
    );
  }
}
