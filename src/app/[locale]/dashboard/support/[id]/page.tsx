"use client";

import { useState, type FormEvent } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import {
  TicketPriorityBadge,
  TicketStatusBadge
} from "@/components/support/ticket-badges";
import { useSupportTickets } from "@/components/support/support-ticket-provider";
import { ticketReplySchema } from "@/lib/support-ticket-schema";

export default function SupportTicketDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const t = useTranslations("dashboard.pages.support");
  const format = useFormatter();
  const { addReply, getTicket } = useSupportTickets();
  const ticket = getTicket(id);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replied, setReplied] = useState(false);

  if (!ticket) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {t("notFound.description")}
        </p>
        <Link className="mt-5 inline-block" href="/dashboard/support">
          <Button>{t("actions.back")}</Button>
        </Link>
      </Card>
    );
  }

  async function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = ticketReplySchema.safeParse({ message: reply });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");
    setSubmitting(true);
    await addReply(id, result.data.message);
    setReply("");
    setReplied(true);
    setSubmitting(false);
  }

  return (
    <div>
      {(searchParams.get("status") === "created" || replied) && (
        <div
          className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100"
          role="status"
        >
          {t(
            searchParams.get("status") === "created"
              ? "feedback.created"
              : "feedback.replied"
          )}
        </div>
      )}
      <Link
        className="text-sm font-semibold text-blue-800 dark:text-blue-300"
        href="/dashboard/support"
      >
        {t("actions.back")}
      </Link>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t(`categories.${ticket.category}`)}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {ticket.subject}
          </h1>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {t("detail.reference", { reference: ticket.id })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TicketStatusBadge status={ticket.status} />
          <TicketPriorityBadge priority={ticket.priority} />
        </div>
      </div>

      <Card className="mt-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          <DateDetail label={t("fields.createdDate")} value={ticket.createdAt} />
          <DateDetail label={t("fields.updatedDate")} value={ticket.updatedAt} />
        </dl>
      </Card>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">{t("conversation.title")}</h2>
        <div className="mt-5 grid gap-4">
          {ticket.conversation.map((message) => (
            <article
              className={`max-w-[90%] rounded-lg border p-4 sm:max-w-[75%] ${
                message.authorType === "customer"
                  ? "ml-auto border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
              key={message.id}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold">
                  {t(`conversation.authors.${message.authorType}`)}
                </p>
                <time className="text-xs text-zinc-500">
                  {format.dateTime(new Date(message.createdAt), {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap break-words leading-6">
                {message.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Card className="mt-8">
        <form onSubmit={submitReply}>
          <label className="grid gap-2 text-sm font-semibold">
            {t("reply.label")}
            <textarea
              className="min-h-36 rounded-md border border-zinc-300 bg-white px-3 py-3 text-base text-zinc-950 outline-none focus:border-blue-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              maxLength={4000}
              onChange={(event) => {
                setReply(event.target.value);
                setError("");
                setReplied(false);
              }}
              value={reply}
            />
          </label>
          {error && (
            <p className="mt-2 text-sm text-red-700 dark:text-red-300" role="alert">
              {t(`validation.${error}`)}
            </p>
          )}
          <Button className="mt-4" disabled={submitting} type="submit">
            {submitting ? t("actions.submitting") : t("reply.submit")}
          </Button>
        </form>
      </Card>
    </div>
  );

  function DateDetail({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <dt className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
        <dd className="mt-1 font-semibold">
          {format.dateTime(new Date(value), {
            dateStyle: "medium",
            timeStyle: "short"
          })}
        </dd>
      </div>
    );
  }
}
