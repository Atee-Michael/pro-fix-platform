import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routing } from "@/i18n/routing";
import { CmsArticleProvider } from "@/components/cms/cms-article-provider";
import { DocumentProvider } from "@/components/documents/document-provider";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <Header locale={locale as "en" | "fr"} />
      <CmsArticleProvider>
        <DocumentProvider>{children}</DocumentProvider>
      </CmsArticleProvider>
      <Footer locale={locale as "en" | "fr"} />
    </NextIntlClientProvider>
  );
}
