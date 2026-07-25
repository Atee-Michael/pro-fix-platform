"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { useAppointments } from "@/components/appointments/appointment-provider";
import { useVehicles } from "@/components/vehicles/vehicle-provider";

export default function BookingsPage() {
  const t = useTranslations("dashboard.pages.bookings");
  const bookingT = useTranslations("dashboard.pages.appointmentBooking");
  const format = useFormatter();
  const { appointments } = useAppointments();
  const { vehicles } = useVehicles();

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
          <Button className="w-full sm:w-auto">{t("bookAction")}</Button>
        </Link>
      </div>

      {appointments.length === 0 ? (
        <Card className="mt-8 text-center">
          <h2 className="text-xl font-semibold">{t("empty.title")}</h2>
          <p className="mx-auto mt-2 max-w-md text-zinc-600 dark:text-zinc-300">
            {t("empty.description")}
          </p>
          <Link className="mt-5 inline-block" href="/dashboard/appointments/book">
            <Button>{t("empty.action")}</Button>
          </Link>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4">
          {appointments.map((appointment) => {
            const appointmentVehicle = appointment.vehicle;
            const vehicle =
              appointmentVehicle.mode === "existing"
                ? vehicles.find((item) => item.id === appointmentVehicle.vehicleId)
                : appointmentVehicle;
            const vehicleLabel = vehicle
              ? `${vehicle.make} ${vehicle.model}`
              : t("vehicleUnavailable");
            const appointmentDate = new Date(
              `${appointment.preferredDate}T${appointment.preferredTime}:00`
            );

            return (
              <Card key={appointment.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {bookingT(`services.${appointment.serviceType}`)}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {vehicleLabel}
                    </p>
                    <p className="mt-3 text-sm font-medium">
                      {format.dateTime(appointmentDate, {
                        dateStyle: "long",
                        timeStyle: "short"
                      })}
                    </p>
                  </div>
                  <Badge>{t(`statuses.${appointment.status}`)}</Badge>
                </div>
                <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                  {t("reference", { reference: appointment.id })}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
