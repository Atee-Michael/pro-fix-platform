import { getTranslations } from "next-intl/server";

export default async function SupportLoading() {
  const t = await getTranslations("dashboard.pages.support");
  return (
    <div aria-label={t("loading")} className="animate-pulse">
      <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-5 h-10 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="h-44 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-44 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
