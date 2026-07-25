import { getTranslations } from "next-intl/server";
import { Badge, Container, Section } from "@/components";
import { MotionCard, SlideUp, StaggeredCards } from "@/components/motion";
import { Link } from "@/i18n/routing";

type ServiceGroup = {
  title: string;
  description: string;
  services: string[];
};

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");
  const groups = t.raw("groups") as ServiceGroup[];

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
          <SlideUp className="max-w-3xl">
            <Badge>{t("overview.eyebrow")}</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("overview.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {t("overview.description")}
            </p>
          </SlideUp>

          <StaggeredCards className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <MotionCard className="flex min-h-full flex-col" key={group.title}>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {group.description}
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {group.services.map((service) => (
                    <li className="flex gap-2" key={service}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800 dark:bg-blue-300" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
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
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            href="/book"
          >
            {t("cta.action")}
          </Link>
        </Container>
      </section>
    </main>
  );
}
