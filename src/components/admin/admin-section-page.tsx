import { getTranslations } from "next-intl/server";
import { Badge, Card } from "@/components";

export async function AdminSectionPage({
  section
}: {
  section:
    | "appointments"
    | "customers"
    | "vehicles"
    | "support"
    | "articles"
    | "reports"
    | "settings";
}) {
  const t = await getTranslations(`admin.sections.${section}`);
  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <Card className="mt-8">
        <h2 className="text-lg font-semibold">{t("panelTitle")}</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {t("panelDescription")}
        </p>
      </Card>
    </div>
  );
}
