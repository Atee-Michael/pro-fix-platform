"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card, CardDescription, CardTitle, Container } from "@/components";
import { Link } from "@/i18n/routing";

export default function BookPage() {
  const t = useTranslations("pages.book");
  const [showOptions, setShowOptions] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Container className="grid gap-8 py-16 sm:py-20">
        <div className="max-w-3xl">
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>

        {!showOptions ? (
          <Card className="max-w-3xl">
            <CardTitle>{t("cardTitle")}</CardTitle>
            <CardDescription className="mt-2">
              {t("cardDescription")}
            </CardDescription>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => setShowOptions(true)}>
                {t("primaryAction")}
              </Button>
              <Link href="/services">
                <Button variant="secondary">{t("secondaryAction")}</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <section aria-labelledby="booking-choice-title" className="max-w-5xl">
            <h2 className="text-2xl font-bold" id="booking-choice-title">
              {t("choice.title")}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              {t("choice.description")}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <ChoiceCard
                action={t("choice.newCustomer.action")}
                description={t("choice.newCustomer.description")}
                href="/register"
                title={t("choice.newCustomer.title")}
              />
              <ChoiceCard
                action={t("choice.login.action")}
                description={t("choice.login.description")}
                href="/login"
                title={t("choice.login.title")}
              />
              <ChoiceCard
                action={t("choice.guest.action")}
                description={t("choice.guest.description")}
                href="/dashboard/appointments/book?mode=guest"
                title={t("choice.guest.title")}
              />
            </div>
            <Button
              className="mt-5"
              onClick={() => setShowOptions(false)}
              variant="ghost"
            >
              {t("choice.back")}
            </Button>
          </section>
        )}
      </Container>
    </main>
  );
}

function ChoiceCard({
  action,
  description,
  href,
  title
}: {
  action: string;
  description: string;
  href: "/register" | "/login" | "/dashboard/appointments/book?mode=guest";
  title: string;
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardTitle>{title}</CardTitle>
      <CardDescription className="mt-2 flex-1">{description}</CardDescription>
      <Link className="mt-6" href={href}>
        <Button className="w-full" variant={href.includes("guest") ? "secondary" : "primary"}>
          {action}
        </Button>
      </Link>
    </Card>
  );
}
