"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AppointmentDetailSection } from "@/components/appointments/appointment-detail-section";
import { AppointmentRequestDialog } from "@/components/appointments/appointment-request-dialog";
import { AppointmentStatusBadge } from "@/components/appointments/appointment-status-badge";
import { useAppointments } from "@/components/appointments/appointment-provider";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("dashboard.pages.appointments");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const {
    cancelAppointment,
    getAppointment,
    rescheduleAppointment
  } = useAppointments();
  const { vehicles } = useVehicles();
  const [dialog, setDialog] = useState<"cancel" | "reschedule">();
  const [feedback, setFeedback] = useState<"cancelled" | "rescheduled">();
  const appointment = getAppointment(id);

  if (!appointment) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {t("notFound.description")}
        </p>
        <Link className="mt-5 inline-block" href="/dashboard/appointments">
          <Button>{t("actions.back")}</Button>
        </Link>
      </Card>
    );
  }

  const appointmentVehicle = appointment.vehicle;
  const savedVehicle =
    appointmentVehicle.mode === "existing"
      ? vehicles.find((vehicle) => vehicle.id === appointmentVehicle.vehicleId)
      : undefined;
  const vehicle =
    appointmentVehicle.mode === "temporary"
      ? appointmentVehicle
      : savedVehicle;
  const date = new Date(
    `${appointment.preferredDate}T${appointment.preferredTime}:00`
  );
  const canRequestChange = !["completed", "cancelled"].includes(
    appointment.status
  );

  return (
    <div>
      {feedback && (
        <div
          className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100"
          role="status"
        >
          {t(`feedback.${feedback}`)}
        </div>
      )}
      <Link
        className="text-sm font-semibold text-blue-800 dark:text-blue-300"
        href="/dashboard/appointments"
      >
        {t("actions.back")}
      </Link>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t("detail.eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {serviceT(appointment.serviceType)}
          </h1>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            {t("detail.reference", { reference: appointment.id })}
          </p>
        </div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <Card className="mt-8 grid gap-6">
        <AppointmentDetailSection title={t("detail.service.title")}>
          <p className="font-semibold">{serviceT(appointment.serviceType)}</p>
          <p className="mt-2 leading-6 text-zinc-600 dark:text-zinc-300">
            {t(`serviceDescriptions.${appointment.serviceType}`)}
          </p>
        </AppointmentDetailSection>

        <AppointmentDetailSection title={t("detail.schedule.title")}>
          <p className="font-semibold">
            {format.dateTime(date, {
              dateStyle: "full",
              timeStyle: "short"
            })}
          </p>
          {appointment.rescheduleRequestedAt && (
            <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
              {t("detail.schedule.reschedulePending")}
            </p>
          )}
        </AppointmentDetailSection>

        <AppointmentDetailSection title={t("detail.vehicle.title")}>
          {vehicle ? (
            <dl className="grid gap-4 sm:grid-cols-2">
              <Detail
                label={t("detail.vehicle.makeModel")}
                value={`${vehicle.make} ${vehicle.model}`}
              />
              <Detail
                label={t("detail.vehicle.registration")}
                value={vehicle.registrationNumber}
              />
              <Detail
                label={t("detail.vehicle.year")}
                value={format.number(vehicle.year, { useGrouping: false })}
              />
              <Detail
                label={t("detail.vehicle.source")}
                value={t(
                  `detail.vehicle.${appointment.vehicle.mode === "existing" ? "saved" : "temporary"}`
                )}
              />
            </dl>
          ) : (
            <p>{t("vehicleUnavailable")}</p>
          )}
        </AppointmentDetailSection>

        <AppointmentDetailSection title={t("detail.customerNotes.title")}>
          <p className="whitespace-pre-wrap">
            {appointment.notes || t("detail.noNotes")}
          </p>
        </AppointmentDetailSection>

        <AppointmentDetailSection title={t("detail.garageNotes.title")}>
          <p className="whitespace-pre-wrap">
            {appointment.garageNotes || t("detail.garageNotes.empty")}
          </p>
        </AppointmentDetailSection>
      </Card>

      {canRequestChange && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setDialog("reschedule")} variant="secondary">
            {t("actions.reschedule")}
          </Button>
          <Button
            className="text-red-700 dark:text-red-300"
            onClick={() => setDialog("cancel")}
            variant="ghost"
          >
            {t("actions.cancel")}
          </Button>
        </div>
      )}

      {dialog && (
        <AppointmentRequestDialog
          initialDate={appointment.preferredDate}
          initialTime={appointment.preferredTime}
          mode={dialog}
          onCancel={() => setDialog(undefined)}
          onConfirm={async (nextDate, nextTime) => {
            if (dialog === "cancel") {
              await cancelAppointment(appointment.id);
              setFeedback("cancelled");
            } else if (nextDate && nextTime) {
              await rescheduleAppointment(appointment.id, nextDate, nextTime);
              setFeedback("rescheduled");
            }
            setDialog(undefined);
          }}
          open
        />
      )}
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
