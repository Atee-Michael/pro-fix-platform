import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations("navigation");

  return (
    <header className="border-b border-zinc-200 bg-white">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link className="inline-flex items-center" href="/" locale={locale}>
          <Image
            alt={t("logoAlt")}
            className="h-auto w-40"
            height={64}
            priority
            src="/pro-fix-logo.svg"
            width={220}
          />
        </Link>
        <nav aria-label={t("primaryLabel")} className="flex items-center gap-2">
          <Link
            className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            href="/"
            locale={locale}
          >
            {t("home")}
          </Link>
          <Link
            className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            href="/design"
            locale={locale}
          >
            {t("design")}
          </Link>
        </nav>
        <nav aria-label={t("localeLabel")} className="flex items-center gap-1">
          {(["en", "fr"] as const).map((targetLocale) => (
            <Link
              aria-current={targetLocale === locale ? "page" : undefined}
              className={cn(
                "rounded-md border px-3 py-2 text-sm font-semibold uppercase transition-colors",
                targetLocale === locale
                  ? "border-blue-800 bg-blue-800 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-800 hover:text-blue-800"
              )}
              href="/"
              key={targetLocale}
              locale={targetLocale}
            >
              {t(`locales.${targetLocale}`)}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
