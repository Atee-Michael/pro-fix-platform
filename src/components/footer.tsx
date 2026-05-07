import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("navigation");
  const links = [
    { href: "/services", label: nav("services") },
    { href: "/book", label: nav("book") },
    { href: "/news", label: nav("news") },
    { href: "/support", label: nav("support") },
    { href: "/contact", label: nav("contact") }
  ];

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="grid gap-8 py-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-md">
          <Image
            alt={nav("logoAlt")}
            className="h-auto w-40"
            height={64}
            src="/pro-fix-logo.svg"
            width={220}
          />
          <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>
        <nav aria-label={t("label")} className="grid gap-2 sm:grid-cols-2">
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
        <p className="text-sm text-zinc-500 dark:text-zinc-400 md:col-span-2">
          {t("copyright")}
        </p>
      </Container>
    </footer>
  );
}
