"use client";

import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AppointmentCard } from "@/components/appointments/appointment-card";
import { useAppointments } from "@/components/appointments/appointment-provider";
import { useVehicles } from "@/components/vehicles/vehicle-provider";
import type { MockAppointment } from "@/lib/mock-data/appointments";

export default function AppointmentsPage() {
  const t = useTranslations("dashboard.pages.appointments");
  const { appointments } = useAppointments();
  const { vehicles } = useVehicles();
  const now = new Date();

  const isPast = (appointment: MockAppointment) =>
    appointment.status === "completed" ||
    appointment.status === "cancelled" ||
    new Date(
      `${appointment.preferredDate}T${appointment.preferredTime}:00`
    ) < now;

  const upcoming = appointments
    .filter((appointment) => !isPast(appointment))
    .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate));
  const past = appointments
    .filter(isPast)
    .sort((a, b) => b.preferredDate.localeCompare(a.preferredDate));

  function vehicleLabel(appointment: MockAppointment) {
    const appointmentVehicle = appointment.vehicle;
    if (appointmentVehicle.mode === "temporary") {
      return `${appointmentVehicle.make} ${appointmentVehicle.model} — ${appointmentVehicle.registrationNumber}`;
    }
    const vehicle = vehicles.find(
      (item) => item.id === appointmentVehicle.vehicleId
    );
    return vehicle
      ? `${vehicle.make} ${vehicle.model} — ${vehicle.registrationNumber}`
      : t("vehicleUnavailable");
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>
        <Link href="/dashboard/appointments/book">
          <Button className="w-full sm:w-auto">{t("actions.book")}</Button>
        </Link>
      </div>

      <AppointmentGroup
        appointments={upcoming}
        description={t("upcoming.description")}
        emptyDescription={t("upcoming.emptyDescription")}
        emptyTitle={t("upcoming.emptyTitle")}
        title={t("upcoming.title")}
      />
      <AppointmentGroup
        appointments={past}
        description={t("past.description")}
        emptyDescription={t("past.emptyDescription")}
        emptyTitle={t("past.emptyTitle")}
        title={t("past.title")}
      />
    </div>
  );

  function AppointmentGroup({
    appointments: group,
    description,
    emptyDescription,
    emptyTitle,
    title
  }: {
    appointments: MockAppointment[];
    description: string;
    emptyDescription: string;
    emptyTitle: string;
    title: string;
  }) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">{description}</p>
        {group.length ? (
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {group.map((appointment) => (
              <AppointmentCard
                appointment={appointment}
                key={appointment.id}
                vehicleLabel={vehicleLabel(appointment)}
              />
            ))}
          </div>
        ) : (
          <Card className="mt-5">
            <h3 className="font-semibold">{emptyTitle}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {emptyDescription}
            </p>
          </Card>
        )}
      </section>
    );
  }
}
