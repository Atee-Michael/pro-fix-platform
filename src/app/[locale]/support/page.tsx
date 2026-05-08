import { getTranslations } from "next-intl/server";
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Section
} from "@/components";
import { MotionCard, SlideUp, StaggeredCards } from "@/components/motion";

type HelpSection = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export default async function SupportPage() {
  const t = await getTranslations("supportPage");
  const helpSections = t.raw("help.sections") as HelpSection[];
  const faqItems = t.raw("faq.items") as FaqItem[];

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
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <Card>
              <CardHeader>
                <Badge>{t("contact.eyebrow")}</Badge>
                <CardTitle>{t("contact.title")}</CardTitle>
                <CardDescription>{t("contact.description")}</CardDescription>
              </CardHeader>
              <p className="text-lg font-semibold text-zinc-950 dark:text-white">
                {t("contact.email")}
              </p>
            </Card>

            <Card>
              <CardHeader>
                <Badge tone="silver">{t("ticket.eyebrow")}</Badge>
                <CardTitle>{t("ticket.title")}</CardTitle>
                <CardDescription>{t("ticket.description")}</CardDescription>
              </CardHeader>
              <div className="rounded-md border border-dashed border-zinc-300 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                {t("ticket.placeholder")}
              </div>
            </Card>
          </div>

          <div>
            <SlideUp>
              <Badge tone="dark">{t("help.eyebrow")}</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                {t("help.title")}
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {t("help.description")}
              </p>
            </SlideUp>
            <StaggeredCards className="mt-6 grid gap-4 sm:grid-cols-2">
              {helpSections.map((section) => (
                <MotionCard key={section.title}>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {section.description}
                  </p>
                </MotionCard>
              ))}
            </StaggeredCards>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SlideUp className="max-w-3xl">
            <Badge>{t("faq.eyebrow")}</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              {t("faq.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {t("faq.description")}
            </p>
          </SlideUp>
          <div className="mt-8 grid gap-4">
            {faqItems.map((item) => (
              <Card key={item.question}>
                <CardTitle>{item.question}</CardTitle>
                <CardDescription className="mt-2">{item.answer}</CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
