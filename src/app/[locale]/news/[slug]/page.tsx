"use client";

import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card, Container } from "@/components";
import { Link } from "@/i18n/routing";
import { useCmsArticles } from "@/components/cms/cms-article-provider";
import type { Locale } from "@/i18n/routing";

export default function ArticlePage() {
  const { locale, slug } = useParams<{ locale: Locale; slug: string }>();
  const t = useTranslations("newsPage");
  const format = useFormatter();
  const { articles, getPublishedBySlug } = useCmsArticles();
  const article = getPublishedBySlug(locale, slug);

  if (!article) {
    return (
      <main className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <Container>
          <Card>
            <h1 className="text-2xl font-bold">{t("notFound")}</h1>
            <Link className="mt-5 inline-block text-blue-800" href="/news">
              {t("backToNews")}
            </Link>
          </Card>
        </Container>
      </main>
    );
  }

  const related = articles
    .filter(
      (item) =>
        item.id !== article.id &&
        item.language === locale &&
        item.state === "published" &&
        item.category === article.category
    )
    .slice(0, 3);

  return (
    <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <title>{article.seoTitle}</title>
      <meta content={article.seoDescription} name="description" />
      <article>
        <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
          <Container className="py-16 sm:py-20">
            <div className="max-w-3xl">
              <Badge tone="dark">{article.category}</Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {article.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span>{article.author}</span>
                {article.publishedAt && (
                  <time>
                    {format.dateTime(new Date(article.publishedAt), {
                      dateStyle: "long"
                    })}
                  </time>
                )}
              </div>
            </div>
          </Container>
        </header>
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            {article.content.map((block, index) => (
              <p key={`${article.id}-${index}`}>{block.text}</p>
            ))}
          </div>
          <Link
            className="mt-10 inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold dark:border-zinc-700 dark:bg-zinc-950"
            href="/news"
          >
            {t("backToNews")}
          </Link>
        </Container>
      </article>
      {related.length > 0 && (
        <section className="border-t border-zinc-200 py-12 dark:border-zinc-800">
          <Container>
            <h2 className="text-2xl font-bold">{t("relatedArticles")}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link href={`/news/${item.slug}`} key={item.id}>
                  <Card className="h-full hover:border-blue-700">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.excerpt}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
