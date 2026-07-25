"use client";

import { useMemo, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card } from "@/components";
import { Link } from "@/i18n/routing";
import {
  AdminPagination,
  type PaginationMeta
} from "@/components/admin/admin-pagination";
import {
  adminCustomers,
  adminVehicles
} from "@/lib/mock-data/admin-appointments";
import { vehicleListFiltersSchema } from "@/lib/admin-directory-schema";

const pageSize = 2;
const controlClass =
  "h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950";

export default function AdminVehiclesPage() {
  const t = useTranslations("admin.directory.vehicles");
  const format = useFormatter();
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("all");
  const [year, setYear] = useState("all");
  const [page, setPage] = useState(1);
  const makes = [...new Set(adminVehicles.map((vehicle) => vehicle.make))].sort();
  const years = [...new Set(adminVehicles.map((vehicle) => vehicle.year))].sort(
    (a, b) => b - a
  );

  const result = useMemo(() => {
    const filters = vehicleListFiltersSchema.parse({ search, make, year, page });
    const query = filters.search.toLocaleLowerCase();
    const filtered = adminVehicles.filter((vehicle) => {
      const text = [
        vehicle.registrationNumber,
        vehicle.vin,
        vehicle.make,
        vehicle.model
      ]
        .join(" ")
        .toLocaleLowerCase();
      return (
        (!query || text.includes(query)) &&
        (filters.make === "all" || vehicle.make === filters.make) &&
        (filters.year === "all" || vehicle.year === filters.year)
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
  }, [make, page, search, year]);

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{t("title")}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.search")}
          <input
            className={controlClass}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder={t("filters.searchPlaceholder")}
            type="search"
            value={search}
          />
        </label>
        <Filter
          label={t("filters.make")}
          onChange={(value) => {
            setMake(value);
            setPage(1);
          }}
          value={make}
        >
          <option value="all">{t("filters.allMakes")}</option>
          {makes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Filter>
        <Filter
          label={t("filters.year")}
          onChange={(value) => {
            setYear(value);
            setPage(1);
          }}
          value={year}
        >
          <option value="all">{t("filters.allYears")}</option>
          {years.map((option) => (
            <option key={option} value={option}>
              {format.number(option, { useGrouping: false })}
            </option>
          ))}
        </Filter>
      </div>
      <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-300">
        {t("results", { count: result.meta.totalItems })}
      </p>
      {result.rows.length ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {result.rows.map((vehicle) => {
            const owner = adminCustomers.find(
              (customer) => customer.id === vehicle.customerId
            );
            return (
              <Link href={`/admin/vehicles/${vehicle.id}`} key={vehicle.id}>
                <Card className="h-full transition-colors hover:border-blue-700">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {vehicle.make} {vehicle.model}
                      </h2>
                      <p className="mt-1 font-mono text-sm">
                        {vehicle.registrationNumber}
                      </p>
                    </div>
                    <Badge>
                      {format.number(vehicle.year, { useGrouping: false })}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {t("owner", { owner: owner?.name ?? t("unknownOwner") })}
                  </p>
                  <p className="mt-1 break-all text-xs text-zinc-500">
                    {vehicle.vin}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-blue-800 dark:text-blue-300">
                    {t("view")}
                  </p>
                </Card>
              </Link>
            );
          })}
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
