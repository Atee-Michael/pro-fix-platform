import { getTranslations } from "next-intl/server";
import { Badge, Container, Section } from "@/components";
import { MotionCard, SlideUp, StaggeredCards } from "@/components/motion";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { getArticles } from "@/lib/news";

type NewsPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations("newsPage");
  const articles = getArticles(locale);

  return (
    <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <Container className="py-16 sm:py-20">
          <SlideUp className="max-w-3xl">
            <Badge tone="dark">{t("hero.eyebrow")}</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {t("hero.description")}
            </p>
          </SlideUp>
        </Container>
      </section>

      <Section>
        <Container>
          <StaggeredCards className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <MotionCard className="flex min-h-full flex-col" key={article.slug}>
                <Badge>{article.category}</Badge>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {article.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {article.preview}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <span>{article.publishedLabel}</span>
                  <span>{article.readTime}</span>
                </div>
                <Link
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  href={`/news/${article.slug}`}
                >
                  {t("readArticle")}
                </Link>
              </MotionCard>
            ))}
          </StaggeredCards>
        </Container>
      </Section>
    </main>
  );
}
