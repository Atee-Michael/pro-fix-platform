"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", key: "overview" },
  { href: "/dashboard/vehicles", key: "vehicles" },
  { href: "/dashboard/repair-history", key: "repairHistory" },
  { href: "/dashboard/reports", key: "reports" },
  { href: "/dashboard/receipts", key: "receipts" },
  { href: "/dashboard/bookings", key: "bookings" },
  { href: "/dashboard/payments", key: "payments" },
  { href: "/dashboard/support", key: "support" },
  { href: "/dashboard/profile", key: "profile" }
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const t = useTranslations("dashboard.navigation");

  return items.map((item) => {
    const active =
      item.href === "/dashboard"
        ? pathname === item.href
        : pathname.startsWith(item.href);

    return (
      <Link
        aria-current={active ? "page" : undefined}
        className={cn(
          "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
          mobile && "shrink-0 whitespace-nowrap",
          active
            ? "bg-blue-800 text-white"
            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        )}
        href={item.href}
        key={item.href}
      >
        {t(item.key)}
      </Link>
    );
  });
}

export function DashboardNavigation() {
  const t = useTranslations("dashboard.navigation");

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-zinc-200 pr-6 dark:border-zinc-800 lg:block">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t("label")}
        </p>
        <nav aria-label={t("label")} className="grid gap-1">
          <NavigationLinks />
        </nav>
      </aside>

      <nav
        aria-label={t("mobileLabel")}
        className="-mx-5 flex gap-2 overflow-x-auto border-b border-zinc-200 px-5 pb-4 dark:border-zinc-800 sm:-mx-6 sm:px-6 lg:hidden"
      >
        <NavigationLinks mobile />
      </nav>
    </>
  );
}
