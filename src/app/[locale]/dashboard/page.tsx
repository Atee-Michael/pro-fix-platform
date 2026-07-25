import { getTranslations } from "next-intl/server";
import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@/components";
import { mockDashboardData } from "@/lib/mock-dashboard-data";

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("dashboard.pages.overview");
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockDashboardData.statistics.map((statistic) => (
          <Card key={statistic.key}>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {t(`statistics.${statistic.key}`)}
            </p>
            <p className="mt-2 text-3xl font-bold">{statistic.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("appointments.title")}</CardTitle>
            <CardDescription>{t("appointments.description")}</CardDescription>
          </CardHeader>
          {mockDashboardData.appointments.map((appointment) => {
            const vehicle = mockDashboardData.vehicles.find(
              (item) => item.id === appointment.vehicleId
            );

            return (
              <div
                className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800"
                key={appointment.id}
              >
                <p className="font-semibold">
                  {t(`services.${appointment.serviceKey}`)}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {vehicle?.make} {vehicle?.model}
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {dateFormatter.format(new Date(appointment.date))} ·{" "}
                  {t(`statuses.${appointment.status}`)}
                </p>
              </div>
            );
          })}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("notifications.title")}</CardTitle>
            <CardDescription>{t("notifications.description")}</CardDescription>
          </CardHeader>
          <ul className="grid gap-3">
            {mockDashboardData.notifications.map((notification) => (
              <li
                className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800"
                key={notification.id}
              >
                <p className="font-medium">
                  {t(`notifications.messages.${notification.messageKey}`)}
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {dateFormatter.format(new Date(notification.createdAt))}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="mb-0">
          <CardTitle>{t("support.title")}</CardTitle>
          <CardDescription>
            {t("support.summary", {
              count: mockDashboardData.supportTickets.length
            })}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
