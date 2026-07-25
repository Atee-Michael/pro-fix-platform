import { getTranslations } from "next-intl/server";
import { Container } from "@/components";
import { DashboardNavigation } from "@/components/dashboard-navigation";
import { mockDashboardData } from "@/lib/mock-dashboard-data";
import { VehicleProvider } from "@/components/vehicles/vehicle-provider";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("dashboard.shell");

  return (
    <main className="min-h-[70vh] bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-bold text-zinc-950 dark:text-white">
              {t("title")}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {mockDashboardData.customer.email}
            </p>
          </div>
        </Container>
      </div>
      <Container className="py-8">
        <p className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          {t("developmentNotice")}
        </p>
        <div className="lg:flex lg:gap-8">
          <DashboardNavigation />
          <section className="min-w-0 flex-1 pt-6 lg:pt-0">
            <VehicleProvider>{children}</VehicleProvider>
          </section>
        </div>
      </Container>
    </main>
  );
}
