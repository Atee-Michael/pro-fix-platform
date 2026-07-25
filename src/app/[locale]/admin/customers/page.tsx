"use client";

import { useMemo, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card } from "@/components";
import { Link } from "@/i18n/routing";
import {
  AdminPagination,
  type PaginationMeta
} from "@/components/admin/admin-pagination";
import { adminCustomers } from "@/lib/mock-data/admin-appointments";
import { customerListFiltersSchema } from "@/lib/admin-directory-schema";
import { cn } from "@/lib/utils";

const pageSize = 2;
const controlClass =
  "h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950";

export default function AdminCustomersPage() {
  const t = useTranslations("admin.directory.customers");
  const format = useFormatter();
  const [search, setSearch] = useState("");
  const [accountState, setAccountState] = useState("all");
  const [page, setPage] = useState(1);

  const result = useMemo(() => {
    const filters = customerListFiltersSchema.parse({
      search,
      accountState,
      page
    });
    const query = filters.search.toLocaleLowerCase();
    const filtered = adminCustomers.filter((customer) => {
      const text = [customer.name, customer.email, customer.phone]
        .join(" ")
        .toLocaleLowerCase();
      return (
        (!query || text.includes(query)) &&
        (filters.accountState === "all" ||
          customer.accountState === filters.accountState)
      );
    });
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(filters.page, totalPages);
    return {
      rows: filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
      meta: {
        page: safePage,
        pageSize,
        totalItems: filtered.length,
        totalPages
      } satisfies PaginationMeta
    };
  }, [accountState, page, search]);

  function resetPage() {
    setPage(1);
  }

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.search")}
          <input
            className={controlClass}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
            placeholder={t("filters.searchPlaceholder")}
            type="search"
            value={search}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.accountState")}
          <select
            className={controlClass}
            onChange={(event) => {
              setAccountState(event.target.value);
              resetPage();
            }}
            value={accountState}
          >
            <option value="all">{t("filters.allStates")}</option>
            {(["active", "invited", "suspended"] as const).map((state) => (
              <option key={state} value={state}>
                {t(`states.${state}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-300">
        {t("results", { count: result.meta.totalItems })}
      </p>
      {result.rows.length ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {result.rows.map((customer) => (
            <Link href={`/admin/customers/${customer.id}`} key={customer.id}>
              <Card className="h-full transition-colors hover:border-blue-700">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{customer.name}</h2>
                    <p className="mt-1 break-all text-sm text-zinc-600 dark:text-zinc-300">
                      {customer.email}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {customer.phone}
                    </p>
                  </div>
                  <AccountState state={customer.accountState} />
                </div>
                <p className="mt-4 text-xs text-zinc-500">
                  {t("joined", {
                    date: format.dateTime(new Date(customer.joinedAt), {
                      dateStyle: "medium"
                    })
                  })}
                </p>
                <p className="mt-4 text-sm font-semibold text-blue-800 dark:text-blue-300">
                  {t("view")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mt-5 text-center">
          <h2 className="text-xl font-semibold">{t("empty.title")}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {t("empty.description")}
          </p>
        </Card>
      )}
      <AdminPagination meta={result.meta} onPageChange={setPage} />
    </div>
  );

  function AccountState({
    state
  }: {
    state: "active" | "invited" | "suspended";
  }) {
    return (
      <span
        className={cn(
          "rounded-full border px-3 py-1 text-xs font-bold",
          state === "active" &&
            "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/40 dark:text-green-100",
          state === "invited" &&
            "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100",
          state === "suspended" &&
            "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100"
        )}
      >
        {t(`states.${state}`)}
      </span>
    );
  }
}
