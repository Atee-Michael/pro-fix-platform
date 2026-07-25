import { getTranslations } from "next-intl/server";
import { Badge, Button, Card, CardDescription, CardTitle, Container } from "@/components";

type PublicPageProps = {
  namespace: "services" | "book" | "news" | "support" | "contact" | "login" | "register";
};

export async function PublicPage({ namespace }: PublicPageProps) {
  const t = await getTranslations(`pages.${namespace}`);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Container className="grid gap-8 py-16 sm:py-20">
        <div className="max-w-3xl">
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>
        <Card className="max-w-3xl">
          <CardTitle>{t("cardTitle")}</CardTitle>
          <CardDescription className="mt-2">{t("cardDescription")}</CardDescription>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>{t("primaryAction")}</Button>
            <Button variant="secondary">{t("secondaryAction")}</Button>
          </div>
        </Card>
      </Container>
    </main>
  );
}
