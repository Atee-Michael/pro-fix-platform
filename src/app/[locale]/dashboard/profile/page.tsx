import { getTranslations } from "next-intl/server";
import { Badge, Card } from "@/components";
import { mockDashboardData } from "@/lib/mock-dashboard-data";

export default async function ProfilePage() {
  const t = await getTranslations("dashboard.pages.profile");
  const { customer } = mockDashboardData;

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <Card className="mt-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          {[
            [t("fields.name"), customer.name],
            [t("fields.email"), customer.email],
            [t("fields.phone"), customer.phone],
            [t("fields.role"), t(`roles.${customer.role}`)]
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {label}
              </dt>
              <dd className="mt-1 font-medium text-zinc-950 dark:text-white">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
