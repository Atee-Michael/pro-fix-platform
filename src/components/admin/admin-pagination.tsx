"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components";

export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export function AdminPagination({
  meta,
  onPageChange
}: {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const t = useTranslations("admin.directory.pagination");
  if (meta.totalPages <= 1) return null;

  return (
    <nav
      aria-label={t("label")}
      className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        {t("summary", {
          page: meta.page,
          totalPages: meta.totalPages,
          totalItems: meta.totalItems
        })}
      </p>
      <div className="flex gap-2">
        <Button
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
          variant="secondary"
        >
          {t("previous")}
        </Button>
        <Button
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPageChange(meta.page + 1)}
          variant="secondary"
        >
          {t("next")}
        </Button>
      </div>
    </nav>
  );
}
