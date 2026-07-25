"use client";

import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { useAdminAppointments } from "@/components/admin/admin-appointment-provider";
import {
  adminCustomers,
  adminVehicles
} from "@/lib/mock-data/admin-appointments";
import {
  adminVehicleReceipts,
  adminVehicleReports
} from "@/lib/mock-data/admin-directory";

export default function AdminVehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("admin.directory.vehicles");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const { appointments } = useAdminAppointments();
  const vehicle = adminVehicles.find((item) => item.id === id);

  if (!vehicle) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <Link className="mt-5 inline-block" href="/admin/vehicles">
          <Button>{t("back")}</Button>
        </Link>
      </Card>
    );
  }

  const owner = adminCustomers.find(
    (customer) => customer.id === vehicle.customerId
  );
  const history = appointments
    .filter((appointment) => appointment.vehicleId === id)
    .sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));
  const reports = adminVehicleReports.filter((report) => report.vehicleId === id);
  const receipts = adminVehicleReceipts.filter(
    (receipt) => receipt.vehicleId === id
  );

  return (
    <div>
      <Link
        className="text-sm font-semibold text-blue-800 dark:text-blue-300"
        href="/admin/vehicles"
      >
        {t("back")}
      </Link>
      <Badge className="mt-5">{vehicle.registrationNumber}</Badge>
      <h1 className="mt-4 text-3xl font-bold">
        {vehicle.make} {vehicle.model}
      </h1>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Section title={t("detail.vehicleInformation")}>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail label={t("detail.registration")} value={vehicle.registrationNumber} />
            <Detail label={t("detail.vin")} value={vehicle.vin} />
            <Detail label={t("detail.make")} value={vehicle.make} />
            <Detail label={t("detail.model")} value={vehicle.model} />
            <Detail
              label={t("detail.year")}
              value={format.number(vehicle.year, { useGrouping: false })}
            />
          </dl>
        </Section>
        <Section title={t("detail.owner")}>
          {owner ? (
            <>
              <p className="font-semibold">{owner.name}</p>
              <p className="mt-1 break-all text-sm text-zinc-600 dark:text-zinc-300">
                {owner.email}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {owner.phone}
              </p>
              <Link
                className="mt-4 inline-block text-sm font-semibold text-blue-800 dark:text-blue-300"
                href={`/admin/customers/${owner.id}`}
              >
                {t("detail.viewOwner")}
              </Link>
            </>
          ) : (
            <p>{t("unknownOwner")}</p>
          )}
        </Section>
        <Section title={t("detail.appointmentHistory")}>
          <ul className="grid gap-3">
            {history.map((appointment) => (
              <li key={appointment.id}>
                <Link
                  className="block rounded-md border border-zinc-200 p-3 hover:border-blue-700 dark:border-zinc-800"
                  href={`/admin/appointments/${appointment.id}`}
                >
                  <span className="font-semibold">
                    {serviceT(appointment.serviceType)}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    {format.dateTime(
                      new Date(
                        `${appointment.scheduledDate}T${appointment.scheduledTime}:00`
                      ),
                      { dateStyle: "medium", timeStyle: "short" }
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
        <Section title={t("detail.serviceNotes")}>
          <p className="whitespace-pre-wrap">
            {vehicle.serviceNotes || t("detail.noServiceNotes")}
          </p>
        </Section>
        <Section title={t("detail.reports")}>
          <PlaceholderList
            empty={t("detail.noReports")}
            items={reports.map((report) => ({
              id: report.id,
              primary: report.title,
              secondary: format.dateTime(new Date(report.date), {
                dateStyle: "medium"
              })
            }))}
          />
        </Section>
        <Section title={t("detail.receipts")}>
          <PlaceholderList
            empty={t("detail.noReceipts")}
            items={receipts.map((receipt) => ({
              id: receipt.id,
              primary: receipt.reference,
              secondary: format.dateTime(new Date(receipt.date), {
                dateStyle: "medium"
              })
            }))}
          />
        </Section>
      </div>
    </div>
  );

  function Section({
    children,
    title
  }: {
    children: React.ReactNode;
    title: string;
  }) {
    return (
      <Card>
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-4">{children}</div>
      </Card>
    );
  }

  function Detail({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <dt className="text-sm text-zinc-500">{label}</dt>
        <dd className="mt-1 break-all font-semibold">{value}</dd>
      </div>
    );
  }

  function PlaceholderList({
    empty,
    items
  }: {
    empty: string;
    items: Array<{ id: string; primary: string; secondary: string }>;
  }) {
    if (!items.length) return <p className="text-sm text-zinc-500">{empty}</p>;
    return (
      <ul className="grid gap-3">
        {items.map((item) => (
          <li
            className="rounded-md border border-dashed border-zinc-300 p-3 dark:border-zinc-700"
            key={item.id}
          >
            <p className="font-semibold">{item.primary}</p>
            <p className="mt-1 text-sm text-zinc-500">{item.secondary}</p>
            <p className="mt-2 text-xs text-zinc-500">
              {t("detail.placeholder")}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
