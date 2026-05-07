import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations("navigation");
  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/book", label: t("book") },
    { href: "/news", label: t("news") },
    { href: "/support", label: t("support") },
    { href: "/contact", label: t("contact") }
  ];
  const accountLinks = [
    { href: "/login", label: t("login") },
    { href: "/register", label: t("register") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-4">
        <Link className="inline-flex shrink-0 items-center" href="/" locale={locale}>
          <Image
            alt={t("logoAlt")}
            className="h-auto w-40"
            height={64}
            priority
            src="/pro-fix-logo.svg"
            width={220}
          />
        </Link>

        <nav
          aria-label={t("primaryLabel")}
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map((link) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              href={link.href}
              key={link.href}
              locale={locale}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <nav aria-label={t("accountLabel")} className="flex items-center gap-1">
            {accountLinks.map((link) => (
              <Link
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                  link.href === "/register"
                    ? "bg-blue-800 text-white hover:bg-blue-700"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                )}
                href={link.href}
                key={link.href}
                locale={locale}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav aria-label={t("localeLabel")} className="flex items-center gap-1">
            {(["en", "fr"] as const).map((targetLocale) => (
              <Link
                aria-current={targetLocale === locale ? "page" : undefined}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm font-semibold uppercase transition-colors",
                  targetLocale === locale
                    ? "border-blue-800 bg-blue-800 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-800 hover:text-blue-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:text-blue-300"
                )}
                href="/"
                key={targetLocale}
                locale={targetLocale}
              >
                {t(`locales.${targetLocale}`)}
              </Link>
            ))}
          </nav>
          <ThemeToggle
            darkLabel={t("theme.dark")}
            label={t("theme.label")}
            lightLabel={t("theme.light")}
            systemLabel={t("theme.system")}
          />
        </div>

        <details className="group lg:hidden">
          <summary className="list-none rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800 marker:hidden dark:border-zinc-700 dark:text-zinc-100">
            {t("menu")}
          </summary>
          <div className="absolute left-0 right-0 top-full border-b border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            <nav aria-label={t("mobileLabel")} className="grid gap-2">
              {[...links, ...accountLinks].map((link) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                  href={link.href}
                  key={link.href}
                  locale={locale}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {(["en", "fr"] as const).map((targetLocale) => (
                <Link
                  aria-current={targetLocale === locale ? "page" : undefined}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm font-semibold uppercase transition-colors",
                    targetLocale === locale
                      ? "border-blue-800 bg-blue-800 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-800 hover:text-blue-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:text-blue-300"
                  )}
                  href="/"
                  key={targetLocale}
                  locale={targetLocale}
                >
                  {t(`locales.${targetLocale}`)}
                </Link>
              ))}
              <ThemeToggle
                darkLabel={t("theme.dark")}
                label={t("theme.label")}
                lightLabel={t("theme.light")}
                systemLabel={t("theme.system")}
              />
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}
