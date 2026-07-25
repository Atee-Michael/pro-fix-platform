import { getTranslations } from "next-intl/server";
import { Badge, Container, Section } from "@/components";
import { Link } from "@/i18n/routing";
import { FadeIn, MotionCard, SlideUp, StaggeredCards } from "@/components/motion";

type CardItem = {
  title: string;
  description: string;
};

function SectionIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <SlideUp className="max-w-3xl">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        {description}
      </p>
    </SlideUp>
  );
}

export default async function Home() {
  const t = await getTranslations("home");
  const services = t.raw("services.items") as CardItem[];
  const process = t.raw("process.steps") as CardItem[];
  const reasons = t.raw("why.items") as CardItem[];
  const news = t.raw("news.items") as CardItem[];
  const brands = t.raw("expertise.brands") as string[];

  return (
    <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <SlideUp>
            <Badge tone="dark">{t("hero.eyebrow")}</Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                href="/book"
              >
                {t("hero.primaryAction")}
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:border-blue-700 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                href="/services"
              >
                {t("hero.secondaryAction")}
              </Link>
            </div>
          </SlideUp>

          <FadeIn className="rounded-lg border border-zinc-200 bg-zinc-950 p-6 text-white shadow-2xl shadow-zinc-950/20 dark:border-zinc-800">
            <div className="rounded-md border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-blue-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
                {t("hero.panelLabel")}
              </p>
              <div className="mt-16 grid gap-4">
                <div className="h-2 rounded-full bg-zinc-700" />
                <div className="h-2 w-3/4 rounded-full bg-blue-500" />
                <div className="h-2 w-1/2 rounded-full bg-zinc-500" />
              </div>
              <p className="mt-8 max-w-sm text-sm leading-6 text-zinc-300">
                {t("hero.panelText")}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionIntro
            description={t("story.description")}
            eyebrow={t("story.eyebrow")}
            title={t("story.title")}
          />
          <SlideUp className="rounded-lg border border-zinc-200 bg-white p-8 text-lg leading-8 text-zinc-700 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            {t("story.body")}
          </SlideUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro
            description={t("expertise.description")}
            eyebrow={t("expertise.eyebrow")}
            title={t("expertise.title")}
          />
          <StaggeredCards className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => (
              <MotionCard key={brand}>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                  {brand}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {t("expertise.cardDescription")}
                </p>
              </MotionCard>
            ))}
          </StaggeredCards>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro
            description={t("services.description")}
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
          />
          <StaggeredCards className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <MotionCard key={service.title}>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {service.description}
                </p>
              </MotionCard>
            ))}
          </StaggeredCards>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro
            description={t("process.description")}
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
          />
          <StaggeredCards className="mt-8 grid gap-5 lg:grid-cols-4">
            {process.map((step, index) => (
              <MotionCard key={step.title}>
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {step.description}
                </p>
              </MotionCard>
            ))}
          </StaggeredCards>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro
            description={t("why.description")}
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
          />
          <StaggeredCards className="mt-8 grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => (
              <MotionCard key={reason.title}>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {reason.description}
                </p>
              </MotionCard>
            ))}
          </StaggeredCards>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionIntro
            description={t("portal.description")}
            eyebrow={t("portal.eyebrow")}
            title={t("portal.title")}
          />
          <SlideUp className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
                <span className="text-sm font-semibold">{t("portal.statusLabel")}</span>
                <Badge>{t("portal.status")}</Badge>
              </div>
              <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-700">
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {t("portal.note")}
                </p>
              </div>
            </div>
          </SlideUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro
            description={t("news.description")}
            eyebrow={t("news.eyebrow")}
            title={t("news.title")}
          />
          <StaggeredCards className="mt-8 grid gap-5 md:grid-cols-3">
            {news.map((item) => (
              <MotionCard key={item.title}>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {item.description}
                </p>
              </MotionCard>
            ))}
          </StaggeredCards>
        </Container>
      </Section>

      <section className="bg-zinc-950 py-16 text-white dark:bg-black sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <SlideUp>
            <Badge className="border-blue-300/20 bg-blue-300/10 text-blue-100">
              {t("cta.eyebrow")}
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              {t("cta.description")}
            </p>
          </SlideUp>
          <FadeIn className="flex flex-wrap gap-3">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              href="/book"
            >
              {t("cta.primaryAction")}
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:border-blue-700 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
              href="/contact"
            >
              {t("cta.secondaryAction")}
            </Link>
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}
