import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Badge, Container } from "@/components";
import { SlideUp } from "@/components/motion";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { getArticle, getArticleSlugs } from "@/lib/news";

type ArticlePageProps = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getArticleSlugs().flatMap((slug) => [
    { locale: "en", slug },
    { locale: "fr", slug }
  ]);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  const t = await getTranslations("newsPage");

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <article className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <Container className="py-16 sm:py-20">
          <SlideUp className="max-w-3xl">
            <Badge tone="dark">{article.category}</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {article.preview}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <span>{article.publishedLabel}</span>
              <span>{article.readTime}</span>
            </div>
          </SlideUp>
        </Container>
      </article>

      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          className="mt-10 inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:border-blue-700 hover:text-blue-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
          href="/news"
        >
          {t("backToNews")}
        </Link>
      </Container>
    </main>
  );
}
