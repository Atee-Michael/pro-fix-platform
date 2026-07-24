import { getTranslations } from "next-intl/server";
import { Badge, Card } from "@/components";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const t = await getTranslations("dashboard.pages.profile");
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("name, email, phone, role")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };
  const role =
    profile?.role === "staff" || profile?.role === "admin"
      ? profile.role
      : "customer";

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
            [t("fields.name"), profile?.name ?? t("notProvided")],
            [t("fields.email"), profile?.email ?? user?.email ?? t("notProvided")],
            [t("fields.phone"), profile?.phone ?? t("notProvided")],
            [t("fields.role"), t(`roles.${role}`)]
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
