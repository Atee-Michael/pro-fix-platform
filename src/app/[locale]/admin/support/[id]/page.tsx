"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AdminTicketBadge } from "@/components/admin/admin-ticket-badges";
import { useAdminSupport } from "@/components/admin/admin-support-provider";
import { useAdminAppointments } from "@/components/admin/admin-appointment-provider";
import {
  adminCustomers,
  adminStaffMembers,
  adminVehicles
} from "@/lib/mock-data/admin-appointments";
import {
  adminInternalNoteSchema,
  adminStaffReplySchema
} from "@/lib/admin-support-schema";
import {
  ticketPriorities,
  ticketStatuses,
  type TicketPriority,
  type TicketStatus
} from "@/lib/mock-data/support-tickets";

const controlClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950";

export default function AdminSupportTicketPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("admin.supportManagement");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const {
    addInternalNote,
    addStaffReply,
    getTicket,
    updateTicket
  } = useAdminSupport();
  const { getAppointment } = useAdminAppointments();
  const ticket = getTicket(id);
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");
  const [replyError, setReplyError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!ticket) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <Link className="mt-5 inline-block" href="/admin/support">
          <Button>{t("actions.back")}</Button>
        </Link>
      </Card>
    );
  }

  const customer = adminCustomers.find(
    (item) => item.id === ticket.customerId
  );
  const vehicle = adminVehicles.find(
    (item) => item.id === ticket.relatedVehicleId
  );
  const relatedAppointment = ticket.relatedAppointmentId
    ? getAppointment(ticket.relatedAppointmentId)
    : undefined;

  function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = adminStaffReplySchema.safeParse({ body: reply });
    if (!result.success) {
      setReplyError(result.error.issues[0].message);
      return;
    }
    addStaffReply(id, result.data.body);
    setReply("");
    setReplyError("");
    setFeedback(t("feedback.reply"));
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = adminInternalNoteSchema.safeParse({ body: note });
    if (!result.success) {
      setNoteError(result.error.issues[0].message);
      return;
    }
    addInternalNote(id, result.data.body);
    setNote("");
    setNoteError("");
    setFeedback(t("feedback.note"));
  }

  return (
    <div>
      {feedback && (
        <div
          className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100"
          role="status"
        >
          {feedback}
        </div>
      )}
      <Link
        className="text-sm font-semibold text-blue-800 dark:text-blue-300"
        href="/admin/support"
      >
        {t("actions.back")}
      </Link>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t(`categories.${ticket.category}`)}</Badge>
          <h1 className="mt-4 text-3xl font-bold">{ticket.subject}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            {t("detail.reference", { reference: ticket.id })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminTicketBadge type="status" value={ticket.status} />
          <AdminTicketBadge type="priority" value={ticket.priority} />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-amber-800 dark:text-amber-200">
        {t("temporaryNotice")}
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-6">
          <Card>
            <h2 className="text-xl font-semibold">{t("conversation.title")}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {t("conversation.description")}
            </p>
            <div className="mt-5 grid gap-4">
              {ticket.customerConversation.map((message) => (
                <article
                  className={`max-w-[90%] rounded-lg border p-4 sm:max-w-[78%] ${
                    message.authorType === "staff"
                      ? "ml-auto border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40"
                      : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
                  }`}
                  key={message.id}
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="text-sm font-bold">
                      {t(`conversation.authors.${message.authorType}`)}
                    </p>
                    <time className="text-xs text-zinc-500">
                      {formattedDate(message.createdAt)}
                    </time>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap break-words leading-6">
                    {message.body}
                  </p>
                </article>
              ))}
            </div>
            <form className="mt-6" onSubmit={submitReply}>
              <label className="grid gap-2 text-sm font-semibold">
                {t("conversation.replyLabel")}
                <textarea
                  className={`${controlClass} min-h-36 py-3`}
                  maxLength={4000}
                  onChange={(event) => {
                    setReply(event.target.value);
                    setReplyError("");
                  }}
                  value={reply}
                />
              </label>
              {replyError && <ValidationError error={replyError} />}
              <Button className="mt-3" type="submit">
                {t("conversation.sendReply")}
              </Button>
            </form>
          </Card>

          <Card className="border-red-200 dark:border-red-950">
            <h2 className="text-xl font-semibold">{t("internal.title")}</h2>
            <span className="mt-2 inline-flex rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-900 dark:bg-red-950 dark:text-red-100">
              {t("internal.staffOnly")}
            </span>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              {t("internal.description")}
            </p>
            {ticket.internalNotes.length ? (
              <div className="mt-5 grid gap-3">
                {ticket.internalNotes.map((item) => (
                  <article
                    className="rounded-md border border-red-200 bg-red-50/50 p-4 dark:border-red-950 dark:bg-red-950/20"
                    key={item.id}
                  >
                    <p className="whitespace-pre-wrap break-words">{item.body}</p>
                    <time className="mt-2 block text-xs text-zinc-500">
                      {formattedDate(item.createdAt)}
                    </time>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">{t("internal.empty")}</p>
            )}
            <form className="mt-5" onSubmit={submitNote}>
              <label className="grid gap-2 text-sm font-semibold">
                {t("internal.noteLabel")}
                <textarea
                  className={`${controlClass} min-h-28 py-3`}
                  maxLength={4000}
                  onChange={(event) => {
                    setNote(event.target.value);
                    setNoteError("");
                  }}
                  value={note}
                />
              </label>
              {noteError && <ValidationError error={noteError} />}
              <Button className="mt-3" type="submit">
                {t("internal.addNote")}
              </Button>
            </form>
          </Card>
        </div>

        <aside className="grid content-start gap-6">
          <Card>
            <h2 className="text-lg font-semibold">{t("actions.manage")}</h2>
            <SelectField label={t("actions.status")}>
              <select
                className={controlClass}
                onChange={(event) => {
                  updateTicket(id, {
                    status: event.target.value as TicketStatus
                  });
                  setFeedback(t("feedback.status"));
                }}
                value={ticket.status}
              >
                {ticketStatuses.map((status) => (
                  <option key={status} value={status}>
                    {t(`statuses.${status}`)}
                  </option>
                ))}
              </select>
            </SelectField>
            <SelectField label={t("actions.priority")}>
              <select
                className={controlClass}
                onChange={(event) => {
                  updateTicket(id, {
                    priority: event.target.value as TicketPriority
                  });
                  setFeedback(t("feedback.priority"));
                }}
                value={ticket.priority}
              >
                {ticketPriorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {t(`priorities.${priority}`)}
                  </option>
                ))}
              </select>
            </SelectField>
            <SelectField label={t("actions.assign")}>
              <select
                className={controlClass}
                onChange={(event) => {
                  updateTicket(id, {
                    assignedStaffId: event.target.value || null
                  });
                  setFeedback(t("feedback.assignment"));
                }}
                value={ticket.assignedStaffId ?? ""}
              >
                <option value="">{t("actions.unassigned")}</option>
                {adminStaffMembers.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.displayName}
                  </option>
                ))}
              </select>
            </SelectField>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">{t("customer.title")}</h2>
            {customer && (
              <>
                <p className="mt-3 font-semibold">{customer.name}</p>
                <p className="mt-1 break-all text-sm text-zinc-600 dark:text-zinc-300">
                  {customer.email}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {customer.phone}
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-semibold text-blue-800 dark:text-blue-300"
                  href={`/admin/customers/${customer.id}`}
                >
                  {t("customer.view")}
                </Link>
              </>
            )}
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">{t("related.title")}</h2>
            {relatedAppointment && (
              <Link
                className="mt-3 block rounded-md border border-zinc-200 p-3 hover:border-blue-700 dark:border-zinc-800"
                href={`/admin/appointments/${relatedAppointment.id}`}
              >
                <span className="text-xs text-zinc-500">
                  {t("related.appointment")}
                </span>
                <span className="mt-1 block font-semibold">
                  {serviceT(relatedAppointment.serviceType)}
                </span>
              </Link>
            )}
            {vehicle && (
              <Link
                className="mt-3 block rounded-md border border-zinc-200 p-3 hover:border-blue-700 dark:border-zinc-800"
                href={`/admin/vehicles/${vehicle.id}`}
              >
                <span className="text-xs text-zinc-500">
                  {t("related.vehicle")}
                </span>
                <span className="mt-1 block font-semibold">
                  {vehicle.make} {vehicle.model}
                </span>
                <span className="mt-1 block text-sm text-zinc-500">
                  {vehicle.registrationNumber}
                </span>
              </Link>
            )}
            {!ticket.relatedAppointmentId && !vehicle && (
              <p className="mt-3 text-sm text-zinc-500">{t("related.empty")}</p>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );

  function formattedDate(value: string) {
    return format.dateTime(new Date(value), {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function ValidationError({ error }: { error: string }) {
    return (
      <p className="mt-2 text-sm text-red-700 dark:text-red-300" role="alert">
        {t(`validation.${error}`)}
      </p>
    );
  }

  function SelectField({
    children,
    label
  }: {
    children: React.ReactNode;
    label: string;
  }) {
    return (
      <label className="mt-4 grid gap-2 text-sm font-semibold">
        {label}
        {children}
      </label>
    );
  }
}
