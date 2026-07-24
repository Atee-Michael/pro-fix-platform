import { getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth-form";
import { Badge, Card, CardDescription, CardHeader, CardTitle, Container } from "@/components";
import { SlideUp } from "@/components/motion";
import { login } from "@/app/[locale]/auth/actions";
import type { Locale } from "@/i18n/routing";

export default async function LoginPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("auth.login");
  const validation = await getTranslations("auth.validation");

  return (
    <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Container className="grid min-h-screen items-center py-16">
        <SlideUp className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <Badge>{t("eyebrow")}</Badge>
              <CardTitle className="mt-4 text-3xl">{t("title")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </CardHeader>
            <AuthForm
              action={login}
              alternateLinkLabel={t("alternateLink")}
              alternatePrompt={t("alternatePrompt")}
              backendPlaceholder={t("backendPlaceholder")}
              errorMessage={t("errorMessage")}
              emailLabel={t("emailLabel")}
              emailPlaceholder={t("emailPlaceholder")}
              locale={locale}
              mode="login"
              pendingLabel={t("pendingLabel")}
              passwordLabel={t("passwordLabel")}
              passwordPlaceholder={t("passwordPlaceholder")}
              registrationPendingMessage={t("registrationPendingMessage")}
              submitLabel={t("submit")}
              validationMessages={{
                emailRequired: validation("emailRequired"),
                emailInvalid: validation("emailInvalid"),
                passwordRequired: validation("passwordRequired"),
                passwordMin: validation("passwordMin")
              }}
              validationPlaceholder={t("validationPlaceholder")}
            />
          </Card>
        </SlideUp>
      </Container>
    </main>
  );
}
