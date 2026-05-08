import { getTranslations } from "next-intl/server";
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Input,
  Section
} from "@/components";
import { SlideUp, StaggeredCards } from "@/components/motion";

type ContactItem = {
  label: string;
  value: string;
};

export default async function ContactPage() {
  const t = await getTranslations("contactPage");
  const contactItems = t.raw("details.items") as ContactItem[];

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
            <StaggeredCards className="grid gap-4">
              {contactItems.map((item) => (
                <Card key={item.label}>
                  <CardTitle>{item.label}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {item.value}
                  </CardDescription>
                </Card>
              ))}
            </StaggeredCards>

            <Card>
              <CardHeader>
                <Badge>{t("hours.eyebrow")}</Badge>
                <CardTitle>{t("hours.title")}</CardTitle>
                <CardDescription>{t("hours.description")}</CardDescription>
              </CardHeader>
              <div className="rounded-md border border-dashed border-zinc-300 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                {t("hours.placeholder")}
              </div>
            </Card>

            <Card>
              <CardHeader>
                <Badge tone="silver">{t("map.eyebrow")}</Badge>
                <CardTitle>{t("map.title")}</CardTitle>
                <CardDescription>{t("map.description")}</CardDescription>
              </CardHeader>
              <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-zinc-300 bg-zinc-100 text-sm font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                {t("map.placeholder")}
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <Badge tone="dark">{t("form.eyebrow")}</Badge>
              <CardTitle>{t("form.title")}</CardTitle>
              <CardDescription>{t("form.description")}</CardDescription>
            </CardHeader>
            <form className="grid gap-4">
              <Input
                id="contact-name"
                label={t("form.nameLabel")}
                placeholder={t("form.namePlaceholder")}
              />
              <Input
                id="contact-email"
                label={t("form.emailLabel")}
                placeholder={t("form.emailPlaceholder")}
                type="email"
              />
              <Input
                id="contact-phone"
                label={t("form.phoneLabel")}
                placeholder={t("form.phonePlaceholder")}
                type="tel"
              />
              <label
                className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                htmlFor="contact-message"
              >
                {t("form.messageLabel")}
                <textarea
                  className="min-h-36 rounded-md border border-zinc-300 bg-white px-3 py-3 text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                  id="contact-message"
                  placeholder={t("form.messagePlaceholder")}
                />
              </label>
              <button
                className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled
                type="button"
              >
                {t("form.submit")}
              </button>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {t("form.note")}
              </p>
            </form>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
