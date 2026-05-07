import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700">
        {t("description")}
      </p>
    </main>
  );
}
