import { redirect } from "next/navigation";
import { Badge, Card, CardDescription, CardHeader, CardTitle, Container } from "@/components";
import { logout } from "@/app/[locale]/auth/actions";
import type { Locale } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";

const copy = {
  en: {
    eyebrow: "Customer dashboard",
    title: "Welcome to your Pro-Fix account.",
    description:
      "Your secure customer area is ready for vehicles, appointments, reports and receipts.",
    signedInAs: "Signed in as",
    logout: "Log out"
  },
  fr: {
    eyebrow: "Espace client",
    title: "Bienvenue dans votre compte Pro-Fix.",
    description:
      "Votre espace securise est pret pour les vehicules, rendez-vous, rapports et recus.",
    signedInAs: "Connecte en tant que",
    logout: "Se deconnecter"
  }
} satisfies Record<Locale, Record<string, string>>;

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const t = copy[locale];

  return (
    <main className="min-h-[70vh] bg-zinc-50 py-16 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Container>
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <Badge>{t.eyebrow}</Badge>
            <CardTitle className="mt-4 text-3xl">{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
            {t.signedInAs}:{" "}
            <span className="font-semibold text-zinc-950 dark:text-white">
              {user.email}
            </span>
          </p>
          <form action={logout}>
            <input name="locale" type="hidden" value={locale} />
            <button
              className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              type="submit"
            >
              {t.logout}
            </button>
          </form>
        </Card>
      </Container>
    </main>
  );
}
