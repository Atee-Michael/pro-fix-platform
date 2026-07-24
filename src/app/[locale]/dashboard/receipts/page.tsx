import { getTranslations } from "next-intl/server";
import { DashboardPlaceholder } from "@/components/dashboard-placeholder";

export default async function ReceiptsPage() {
  const t = await getTranslations("dashboard.pages.receipts");
  return <DashboardPlaceholder description={t("description")} eyebrow={t("eyebrow")} placeholder={t("placeholder")} title={t("title")} />;
}
