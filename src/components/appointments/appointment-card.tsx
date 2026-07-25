"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AppointmentStatusBadge } from "@/components/appointments/appointment-status-badge";
import type { MockAppointment } from "@/lib/mock-data/appointments";

export function AppointmentCard({
  appointment,
  vehicleLabel
}: {
  appointment: MockAppointment;
  vehicleLabel: string;
}) {
  const t = useTranslations("dashboard.pages.appointments");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const date = new Date(
    `${appointment.preferredDate}T${appointment.preferredTime}:00`
  );

  return (
    <Link href={`/dashboard/appointments/${appointment.id}`}>
      <Card className="h-full transition-colors hover:border-blue-700">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {serviceT(appointment.serviceType)}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {vehicleLabel}
            </p>
          </div>
          <AppointmentStatusBadge status={appointment.status} />
        </div>
        <p className="mt-4 text-sm font-medium">
          {format.dateTime(date, { dateStyle: "long", timeStyle: "short" })}
        </p>
        <p className="mt-4 text-sm font-semibold text-blue-800 dark:text-blue-300">
          {t("actions.view")}
        </p>
      </Card>
    </Link>
  );
}
