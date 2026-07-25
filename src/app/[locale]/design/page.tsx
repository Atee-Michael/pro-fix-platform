import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Input,
  PageHeader,
  Section
} from "@/components";

export default async function DesignPage() {
  const t = await getTranslations("design");

  const colors = [
    { label: t("colors.black"), className: "bg-zinc-950" },
    { label: t("colors.white"), className: "bg-white" },
    { label: t("colors.silver"), className: "bg-zinc-300" },
    { label: t("colors.deepBlue"), className: "bg-blue-800" }
  ];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <PageHeader
        actions={
          <>
            <Button>{t("hero.primaryAction")}</Button>
            <Button variant="secondary">{t("hero.secondaryAction")}</Button>
          </>
        }
        description={t("hero.description")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
      />

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div>
            <Badge tone="dark">{t("brand.badge")}</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              {t("brand.title")}
            </h2>
          </div>
          <Card className="grid gap-6 bg-gradient-to-br from-zinc-950 to-blue-950 text-white">
            <Image
              alt={t("brand.logoAlt")}
              className="h-auto w-56"
              height={64}
              priority
              src="/pro-fix-logo.svg"
              width={220}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {colors.map((color) => (
                <div className="grid gap-2" key={color.label}>
                  <div
                    className={`h-16 rounded-md border border-white/15 ${color.className}`}
                  />
                  <p className="text-sm font-medium text-zinc-200">{color.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge>{t("buttons.badge")}</Badge>
              <CardTitle>{t("buttons.title")}</CardTitle>
              <CardDescription>{t("buttons.description")}</CardDescription>
            </CardHeader>
            <div className="flex flex-wrap gap-3">
              <Button>{t("buttons.primary")}</Button>
              <Button variant="secondary">{t("buttons.secondary")}</Button>
              <Button variant="ghost">{t("buttons.ghost")}</Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <Badge tone="silver">{t("inputs.badge")}</Badge>
              <CardTitle>{t("inputs.title")}</CardTitle>
              <CardDescription>{t("inputs.description")}</CardDescription>
            </CardHeader>
            <Input
              id="vehicle-registration"
              label={t("inputs.registrationLabel")}
              placeholder={t("inputs.registrationPlaceholder")}
            />
          </Card>

          <Card>
            <CardHeader>
              <Badge tone="dark">{t("cards.badge")}</Badge>
              <CardTitle>{t("cards.title")}</CardTitle>
              <CardDescription>{t("cards.description")}</CardDescription>
            </CardHeader>
            <div className="grid gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <p className="flex items-center justify-between">
                <span>{t("cards.brakeCheck")}</span>
                <Badge tone="blue">{t("cards.ready")}</Badge>
              </p>
              <p className="flex items-center justify-between">
                <span>{t("cards.oilService")}</span>
                <Badge tone="silver">{t("cards.queued")}</Badge>
              </p>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
