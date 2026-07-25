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
  adminCustomerActivity,
  adminCustomerTicketLinks
} from "@/lib/mock-data/admin-directory";

export default function AdminCustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("admin.directory.customers");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const { appointments } = useAdminAppointments();
  const customer = adminCustomers.find((item) => item.id === id);

  if (!customer) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound.title")}</h1>
        <Link className="mt-5 inline-block" href="/admin/customers">
          <Button>{t("back")}</Button>
        </Link>
      </Card>
    );
  }

  const vehicles = adminVehicles.filter((vehicle) => vehicle.customerId === id);
  const linkedAppointments = appointments.filter(
    (appointment) => appointment.customerId === id
  );
  const tickets = adminCustomerTicketLinks.filter(
    (ticket) => ticket.customerId === id
  );
  const activity = adminCustomerActivity.filter(
    (item) => item.customerId === id
  );

  return (
    <div>
      <Link
        className="text-sm font-semibold text-blue-800 dark:text-blue-300"
        href="/admin/customers"
      >
        {t("back")}
      </Link>
      <Badge className="mt-5">{t("detail.eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{customer.name}</h1>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Section title={t("detail.contact")}>
          <dl className="grid gap-4">
            <Detail label={t("detail.email")} value={customer.email} />
            <Detail label={t("detail.phone")} value={customer.phone} />
            <Detail
              label={t("detail.accountState")}
              value={t(`states.${customer.accountState}`)}
            />
            <Detail
              label={t("detail.joined")}
              value={format.dateTime(new Date(customer.joinedAt), {
                dateStyle: "long"
              })}
            />
          </dl>
        </Section>
        <Section title={t("detail.vehicles")}>
          <LinkedList
            empty={t("detail.emptyVehicles")}
            items={vehicles.map((vehicle) => ({
              id: vehicle.id,
              href: `/admin/vehicles/${vehicle.id}` as const,
              primary: `${vehicle.make} ${vehicle.model}`,
              secondary: vehicle.registrationNumber
            }))}
          />
        </Section>
        <Section title={t("detail.appointments")}>
          <LinkedList
            empty={t("detail.emptyAppointments")}
            items={linkedAppointments.map((appointment) => ({
              id: appointment.id,
              href: `/admin/appointments/${appointment.id}` as const,
              primary: serviceT(appointment.serviceType),
              secondary: format.dateTime(
                new Date(
                  `${appointment.scheduledDate}T${appointment.scheduledTime}:00`
                ),
                { dateStyle: "medium", timeStyle: "short" }
              )
            }))}
          />
        </Section>
        <Section title={t("detail.supportTickets")}>
          <LinkedList
            empty={t("detail.emptyTickets")}
            items={tickets.map((ticket) => ({
              id: ticket.id,
              href: "/admin/support" as const,
              primary: ticket.subject,
              secondary: t(`ticketStatuses.${ticket.status}`)
            }))}
          />
        </Section>
      </div>
      <Section className="mt-6" title={t("detail.activity")}>
        <ul className="grid gap-3">
          {activity.map((item) => (
            <li
              className="flex flex-col gap-1 rounded-md border border-zinc-200 p-4 sm:flex-row sm:justify-between dark:border-zinc-800"
              key={item.id}
            >
              <span className="font-medium">
                {t(`activityTypes.${item.type}`)}
              </span>
              <time className="text-xs text-zinc-500">
                {format.dateTime(new Date(item.occurredAt), {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </time>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );

  function Section({
    children,
    className = "",
    title
  }: {
    children: React.ReactNode;
    className?: string;
    title: string;
  }) {
    return (
      <Card className={className}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-4">{children}</div>
      </Card>
    );
  }

  function Detail({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <dt className="text-sm text-zinc-500">{label}</dt>
        <dd className="mt-1 break-words font-semibold">{value}</dd>
      </div>
    );
  }

  function LinkedList({
    empty,
    items
  }: {
    empty: string;
    items: Array<{
      id: string;
      href: string;
      primary: string;
      secondary: string;
    }>;
  }) {
    if (!items.length) return <p className="text-sm text-zinc-500">{empty}</p>;
    return (
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              className="block rounded-md border border-zinc-200 p-3 hover:border-blue-700 dark:border-zinc-800"
              href={item.href}
            >
              <span className="font-semibold">{item.primary}</span>
              <span className="mt-1 block text-sm text-zinc-500">
                {item.secondary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
