import { getTranslations } from "next-intl/server";
import { Badge, Card } from "@/components";
import {
  adminDashboardStatistics,
  adminRecentActivity
} from "@/lib/mock-data/admin-dashboard";

export default async function AdminOverviewPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("admin.overview");
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short"
  });
  const numberFormatter = new Intl.NumberFormat(locale);

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>

      <section className="mt-8" aria-labelledby="admin-statistics-title">
        <h2 className="sr-only" id="admin-statistics-title">
          {t("statisticsLabel")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminDashboardStatistics.map((statistic) => (
            <Card key={statistic.key}>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {t(`statistics.${statistic.key}`)}
              </p>
              <p className="mt-3 text-3xl font-bold">
                {numberFormatter.format(statistic.value)}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="recent-activity-title">
        <div>
          <h2 className="text-2xl font-bold" id="recent-activity-title">
            {t("activity.title")}
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {t("activity.description")}
          </p>
        </div>
        <Card className="mt-5 p-0">
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {adminRecentActivity.map((activity) => (
              <li
                className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                key={activity.id}
              >
                <div>
                  <p className="font-semibold">
                    {t(`activity.types.${activity.type}`)}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {activity.subject}
                  </p>
                </div>
                <time className="text-xs text-zinc-500 dark:text-zinc-400">
                  {dateFormatter.format(new Date(activity.occurredAt))}
                </time>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
