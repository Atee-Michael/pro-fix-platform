"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/admin", key: "overview", marker: "O" },
  { href: "/admin/appointments", key: "appointments", marker: "A" },
  { href: "/admin/customers", key: "customers", marker: "C" },
  { href: "/admin/vehicles", key: "vehicles", marker: "V" },
  { href: "/admin/support", key: "support", marker: "S" },
  { href: "/admin/articles", key: "articles", marker: "N" },
  { href: "/admin/reports", key: "reports", marker: "R" },
  { href: "/admin/settings", key: "settings", marker: "G" }
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const current =
    navigationItems.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    ) ?? navigationItems[0];

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-zinc-200 bg-zinc-950 text-white lg:flex lg:flex-col dark:border-zinc-800">
          <AdminBrand />
          <AdminNavigation />
          <p className="mt-auto border-t border-zinc-800 px-6 py-5 text-xs leading-5 text-zinc-400">
            {t("shell.unrestrictedAccess")}
          </p>
        </aside>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label={t("shell.closeMenu")}
              className="absolute inset-0 bg-black/60"
              onClick={() => setDrawerOpen(false)}
              type="button"
            />
            <aside className="relative flex h-full w-[min(20rem,88vw)] flex-col bg-zinc-950 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pr-4">
                <AdminBrand />
                <button
                  aria-label={t("shell.closeMenu")}
                  className="rounded-md px-3 py-2 text-xl hover:bg-zinc-800"
                  onClick={() => setDrawerOpen(false)}
                  type="button"
                >
                  ×
                </button>
              </div>
              <AdminNavigation onNavigate={() => setDrawerOpen(false)} />
            </aside>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
            <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
              <button
                aria-label={t("shell.openMenu")}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-bold lg:hidden dark:border-zinc-700"
                onClick={() => setDrawerOpen(true)}
                type="button"
              >
                {t("shell.menu")}
              </button>
              <form
                className="min-w-0 flex-1 sm:max-w-xl"
                onSubmit={(event) => event.preventDefault()}
                role="search"
              >
                <label className="sr-only" htmlFor="admin-search">
                  {t("header.searchLabel")}
                </label>
                <input
                  className="h-10 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/15 dark:border-zinc-700 dark:bg-zinc-950"
                  id="admin-search"
                  placeholder={t("header.searchPlaceholder")}
                  type="search"
                />
              </form>
              <button
                aria-label={t("header.notifications")}
                className="relative rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold dark:border-zinc-700"
                type="button"
              >
                {t("header.notificationShort")}
                <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  3
                </span>
              </button>
              <details className="relative">
                <summary className="list-none rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold marker:hidden dark:border-zinc-700">
                  {t("header.staffShort")}
                </summary>
                <div className="absolute right-0 top-12 w-64 rounded-md border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                  <p className="font-semibold">{t("header.profile.name")}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {t("header.profile.placeholder")}
                  </p>
                  <div className="mt-4">
                    <ThemeToggle
                      darkLabel={t("header.theme.dark")}
                      label={t("header.theme.label")}
                      lightLabel={t("header.theme.light")}
                      systemLabel={t("header.theme.system")}
                    />
                  </div>
                </div>
              </details>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div
                className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
                role="status"
              >
                {t("shell.developmentWarning")}
              </div>
              <nav aria-label={t("breadcrumbs.label")} className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <li>
                    {pathname === "/admin" ? (
                      <span aria-current="page">{t("navigation.overview")}</span>
                    ) : (
                      <Link
                        className="font-medium hover:text-blue-700 dark:hover:text-blue-300"
                        href="/admin"
                      >
                        {t("breadcrumbs.admin")}
                      </Link>
                    )}
                  </li>
                  {pathname !== "/admin" && (
                    <>
                      <li aria-hidden="true">/</li>
                      <li aria-current="page">
                        {t(`navigation.${current.key}`)}
                      </li>
                    </>
                  )}
                </ol>
              </nav>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );

  function AdminBrand() {
    return (
      <Link
        className="flex min-h-20 items-center gap-3 px-6"
        href="/admin"
      >
        <span className="flex size-10 items-center justify-center rounded-md bg-blue-700 text-sm font-black">
          PF
        </span>
        <div>
          <p className="font-bold">{t("shell.brand")}</p>
          <p className="text-xs text-zinc-400">{t("shell.portal")}</p>
        </div>
      </Link>
    );
  }

  function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <nav aria-label={t("navigation.label")} className="grid gap-1 px-4 py-5">
        {navigationItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition-colors",
                active
                  ? "bg-blue-700 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              )}
              href={item.href}
              key={item.href}
              onClick={onNavigate}
            >
              <span
                aria-hidden="true"
                className="flex size-7 items-center justify-center rounded bg-white/10 text-xs"
              >
                {item.marker}
              </span>
              {t(`navigation.${item.key}`)}
            </Link>
          );
        })}
      </nav>
    );
  }
}
