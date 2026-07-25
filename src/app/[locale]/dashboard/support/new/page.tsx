"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { useRouter } from "@/i18n/routing";
import { useSupportTickets } from "@/components/support/support-ticket-provider";
import {
  ticketCategories,
  ticketPriorities
} from "@/lib/mock-data/support-tickets";
import { createTicketSchema } from "@/lib/support-ticket-schema";

const inputClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none focus:border-blue-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export default function NewSupportTicketPage() {
  const t = useTranslations("dashboard.pages.support");
  const router = useRouter();
  const { createTicket } = useSupportTickets();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(false);
    const result = createTicketSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget))
    );
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const ticket = await createTicket(result.data);
      router.push(`/dashboard/support/${ticket.id}?status=created`);
    } catch {
      setSubmitError(true);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("new.title")}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        {t("new.description")}
      </p>
      <Card className="mt-8">
        <form className="grid gap-5" noValidate onSubmit={submit}>
          <Field error={errors.subject} label={t("fields.subject")}>
            <input className={inputClass} name="subject" type="text" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field error={errors.category} label={t("fields.category")}>
              <select className={inputClass} defaultValue="" name="category">
                <option disabled value="">
                  {t("form.select")}
                </option>
                {ticketCategories.map((category) => (
                  <option key={category} value={category}>
                    {t(`categories.${category}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field error={errors.priority} label={t("fields.priority")}>
              <select className={inputClass} defaultValue="normal" name="priority">
                {ticketPriorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {t(`priorities.${priority}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field error={errors.message} label={t("fields.message")}>
            <textarea
              className={`${inputClass} min-h-48 py-3`}
              maxLength={4000}
              name="message"
            />
          </Field>
          {submitError && (
            <p className="text-sm text-red-700 dark:text-red-300" role="alert">
              {t("feedback.error")}
            </p>
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              disabled={submitting}
              onClick={() => router.push("/dashboard/support")}
              variant="secondary"
            >
              {t("actions.cancel")}
            </Button>
            <Button disabled={submitting} type="submit">
              {submitting ? t("actions.submitting") : t("actions.create")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );

  function Field({
    children,
    error,
    label
  }: {
    children: React.ReactNode;
    error?: string;
    label: string;
  }) {
    return (
      <label className="grid gap-2 text-sm font-semibold">
        {label}
        {children}
        {error && (
          <span className="text-sm font-normal text-red-700 dark:text-red-300">
            {t(`validation.${error}`)}
          </span>
        )}
      </label>
    );
  }
}
