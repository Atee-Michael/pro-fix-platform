import { getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth-form";
import { Badge, Card, CardDescription, CardHeader, CardTitle, Container } from "@/components";
import { SlideUp } from "@/components/motion";

export default async function RegisterPage() {
  const t = await getTranslations("auth.register");
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
              alternateLinkLabel={t("alternateLink")}
              alternatePrompt={t("alternatePrompt")}
              emailLabel={t("emailLabel")}
              emailPlaceholder={t("emailPlaceholder")}
              mode="register"
              passwordLabel={t("passwordLabel")}
              passwordPlaceholder={t("passwordPlaceholder")}
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
