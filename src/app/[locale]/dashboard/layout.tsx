import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { logout } from "@/app/[locale]/auth/actions";
import { Container } from "@/components";
import { DashboardNavigation } from "@/components/dashboard-navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

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
              {user.email}
            </p>
          </div>
          <form action={logout}>
            <input name="locale" type="hidden" value={locale} />
            <button
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-blue-700 hover:text-blue-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
              type="submit"
            >
              {t("logout")}
            </button>
          </form>
        </Container>
      </div>
      <Container className="py-8">
        <div className="lg:flex lg:gap-8">
          <DashboardNavigation />
          <section className="min-w-0 flex-1 pt-6 lg:pt-0">{children}</section>
        </div>
      </Container>
    </main>
  );
}
