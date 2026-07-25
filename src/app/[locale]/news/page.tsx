"use client";

import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card, Container, Section } from "@/components";
import { Link } from "@/i18n/routing";
import { useCmsArticles } from "@/components/cms/cms-article-provider";
import type { Locale } from "@/i18n/routing";

export default function NewsPage() {
  const { locale } = useParams<{ locale: Locale }>();
  const t = useTranslations("newsPage");
  const format = useFormatter();
  const { articles } = useCmsArticles();
  const published = articles
    .filter(
      (article) =>
        article.language === locale && article.state === "published"
    )
    .sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
    );

  return (
    <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <Badge tone="dark">{t("hero.eyebrow")}</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {t("hero.description")}
            </p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {published.map((article) => (
              <Card className="flex min-h-full flex-col" key={article.id}>
                <div
                  aria-label={t("featuredImage")}
                  className="mb-5 flex aspect-[16/9] items-center justify-center rounded-md bg-zinc-100 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {article.featuredImage || t("featuredImage")}
                </div>
                <Badge>{article.category}</Badge>
                <h2 className="mt-4 text-xl font-semibold tracking-tight">
                  {article.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {article.excerpt}
                </p>
                <div className="mt-5 text-xs text-zinc-500 dark:text-zinc-400">
                  <p>{article.author}</p>
                  {article.publishedAt && (
                    <time className="mt-1 block">
                      {format.dateTime(new Date(article.publishedAt), {
                        dateStyle: "long"
                      })}
                    </time>
                  )}
                </div>
                <Link
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                  href={`/news/${article.slug}`}
                >
                  {t("readArticle")}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
