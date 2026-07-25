"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AdminAppointmentStatusBadge } from "@/components/admin/admin-appointment-status-badge";
import { useAdminAppointments } from "@/components/admin/admin-appointment-provider";
import {
  adminCustomers,
  adminStaffMembers,
  adminVehicles
} from "@/lib/mock-data/admin-appointments";
import {
  appointmentStatuses,
  type AppointmentStatus
} from "@/lib/mock-data/appointments";

const controlClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export default function AdminAppointmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("admin.appointmentManagement");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const { assignStaff, getAppointment, saveNotes, setStatus } =
    useAdminAppointments();
  const appointment = getAppointment(id);
  const [feedback, setFeedback] = useState("");

  if (!appointment) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {t("notFound.description")}
        </p>
        <Link className="mt-5 inline-block" href="/admin/appointments">
          <Button>{t("actions.back")}</Button>
        </Link>
      </Card>
    );
  }

  const customer = adminCustomers.find(
    (item) => item.id === appointment.customerId
  );
  const vehicle = adminVehicles.find(
    (item) => item.id === appointment.vehicleId
  );
  const scheduledAt = new Date(
    `${appointment.scheduledDate}T${appointment.scheduledTime}:00`
  );

  function changeStatus(status: AppointmentStatus, messageKey = "statusUpdated") {
    setStatus(id, status);
    setFeedback(t(`feedback.${messageKey}`));
  }

  function saveNote(
    event: FormEvent<HTMLFormElement>,
    field: "internalNotes" | "customerVisibleNotes"
  ) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    saveNotes(id, field, String(data.get(field) ?? "").trim());
    setFeedback(t(`feedback.${field}`));
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
        className="text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300"
        href="/admin/appointments"
      >
        {t("actions.back")}
      </Link>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t("detail.eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {serviceT(appointment.serviceType)}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {t("detail.reference", { reference: appointment.id })}
          </p>
        </div>
        <AdminAppointmentStatusBadge status={appointment.status} />
      </div>
      <p className="mt-4 text-sm font-medium text-amber-800 dark:text-amber-200">
        {t("temporaryNotice")}
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-6">
          <Card>
            <h2 className="text-xl font-semibold">{t("detail.summary")}</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <Detail
                label={t("detail.service")}
                value={serviceT(appointment.serviceType)}
              />
              <Detail
                label={t("detail.scheduled")}
                value={format.dateTime(scheduledAt, {
                  dateStyle: "full",
                  timeStyle: "short"
                })}
              />
              <Detail
                label={t("detail.created")}
                value={format.dateTime(new Date(appointment.createdAt), {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              />
              <Detail
                label={t("detail.updated")}
                value={format.dateTime(new Date(appointment.updatedAt), {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              />
            </dl>
            <div className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800">
              <h3 className="font-semibold">{t("detail.customerRequest")}</h3>
              <p className="mt-2 whitespace-pre-wrap break-words text-zinc-700 dark:text-zinc-300">
                {appointment.customerNotes || t("detail.noNotes")}
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">{t("notes.internal.title")}</h2>
            <div className="mt-2 inline-flex rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-900 dark:bg-red-950 dark:text-red-100">
              {t("notes.internal.staffOnly")}
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              {t("notes.internal.description")}
            </p>
            <form
              className="mt-4"
              onSubmit={(event) => saveNote(event, "internalNotes")}
            >
              <textarea
                className={`${controlClass} min-h-36 py-3`}
                defaultValue={appointment.internalNotes}
                maxLength={4000}
                name="internalNotes"
              />
              <Button className="mt-3" type="submit">
                {t("notes.saveInternal")}
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">{t("notes.customer.title")}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {t("notes.customer.description")}
            </p>
            <form
              className="mt-4"
              onSubmit={(event) => saveNote(event, "customerVisibleNotes")}
            >
              <textarea
                className={`${controlClass} min-h-36 py-3`}
                defaultValue={appointment.customerVisibleNotes}
                maxLength={4000}
                name="customerVisibleNotes"
              />
              <Button className="mt-3" type="submit">
                {t("notes.saveCustomer")}
              </Button>
            </form>
          </Card>
        </div>

        <aside className="grid content-start gap-6">
          <Card>
            <h2 className="text-lg font-semibold">{t("actions.title")}</h2>
            {appointment.status === "pending" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button onClick={() => changeStatus("confirmed", "approved")}>
                  {t("actions.approve")}
                </Button>
                <Button
                  className="text-red-700 dark:text-red-300"
                  onClick={() => changeStatus("cancelled", "rejected")}
                  variant="secondary"
                >
                  {t("actions.reject")}
                </Button>
              </div>
            )}
            <label className="mt-5 grid gap-2 text-sm font-semibold">
              {t("actions.updateStatus")}
              <select
                className={controlClass}
                onChange={(event) =>
                  changeStatus(event.target.value as AppointmentStatus)
                }
                value={appointment.status}
              >
                {appointmentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {t(`statuses.${status}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-5 grid gap-2 text-sm font-semibold">
              {t("actions.assignStaff")}
              <select
                className={controlClass}
                onChange={(event) => {
                  assignStaff(id, event.target.value || null);
                  setFeedback(t("feedback.staffAssigned"));
                }}
                value={appointment.assignedStaffId ?? ""}
              >
                <option value="">{t("actions.unassigned")}</option>
                {adminStaffMembers.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.displayName} — {t(`staff.specialties.${staff.specialty}`)}
                  </option>
                ))}
              </select>
            </label>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">{t("linked.customer")}</h2>
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
                  className="mt-4 inline-block text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300"
                  href={`/admin/customers?customer=${customer.id}`}
                >
                  {t("linked.viewCustomer")}
                </Link>
              </>
            )}
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">{t("linked.vehicle")}</h2>
            {vehicle && (
              <>
                <p className="mt-3 font-semibold">
                  {vehicle.make} {vehicle.model}
                </p>
                <p className="mt-1 font-mono text-sm text-zinc-600 dark:text-zinc-300">
                  {vehicle.registrationNumber}
                </p>
                <p className="mt-1 break-all text-xs text-zinc-500">
                  {vehicle.vin}
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300"
                  href={`/admin/vehicles?vehicle=${vehicle.id}`}
                >
                  {t("linked.viewVehicle")}
                </Link>
              </>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );

  function Detail({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <dt className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
        <dd className="mt-1 font-semibold">{value}</dd>
      </div>
    );
  }
}
