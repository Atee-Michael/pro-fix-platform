"use client";

import { useMemo, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { AdminAppointmentStatusBadge } from "@/components/admin/admin-appointment-status-badge";
import { useAdminAppointments } from "@/components/admin/admin-appointment-provider";
import {
  adminCustomers,
  adminVehicles,
  type AdminAppointment
} from "@/lib/mock-data/admin-appointments";
import {
  appointmentStatuses,
  serviceTypes,
  type AppointmentStatus,
  type ServiceType
} from "@/lib/mock-data/appointments";

const controlClass =
  "h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export default function AdminAppointmentsPage() {
  const t = useTranslations("admin.appointmentManagement");
  const serviceT = useTranslations("dashboard.pages.appointmentBooking.services");
  const format = useFormatter();
  const { appointments } = useAdminAppointments();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | AppointmentStatus>("all");
  const [service, setService] = useState<"all" | ServiceType>("all");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState<"ascending" | "descending">("ascending");

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return appointments
      .filter((appointment) => {
        const customer = adminCustomers.find(
          (item) => item.id === appointment.customerId
        );
        const vehicle = adminVehicles.find(
          (item) => item.id === appointment.vehicleId
        );
        const haystack = [
          appointment.id,
          customer?.name,
          customer?.email,
          vehicle?.make,
          vehicle?.model,
          vehicle?.registrationNumber,
          serviceT(appointment.serviceType)
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();
        return (
          (!query || haystack.includes(query)) &&
          (status === "all" || appointment.status === status) &&
          (service === "all" || appointment.serviceType === service) &&
          (!date || appointment.scheduledDate === date)
        );
      })
      .sort((a, b) => {
        const comparison = appointmentDate(a).localeCompare(appointmentDate(b));
        return sort === "ascending" ? comparison : -comparison;
      });
  }, [appointments, date, search, service, serviceT, sort, status]);

  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
        {t("description")}
      </p>
      <p className="mt-2 text-sm font-medium text-amber-800 dark:text-amber-200">
        {t("temporaryNotice")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <label className="grid gap-2 text-sm font-semibold xl:col-span-2">
          {t("filters.search")}
          <input
            className={controlClass}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            type="search"
            value={search}
          />
        </label>
        <FilterSelect
          label={t("filters.status")}
          onChange={(value) => setStatus(value as "all" | AppointmentStatus)}
          value={status}
        >
          <option value="all">{t("filters.allStatuses")}</option>
          {appointmentStatuses.map((option) => (
            <option key={option} value={option}>
              {t(`statuses.${option}`)}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect
          label={t("filters.service")}
          onChange={(value) => setService(value as "all" | ServiceType)}
          value={service}
        >
          <option value="all">{t("filters.allServices")}</option>
          {serviceTypes.map((option) => (
            <option key={option} value={option}>
              {serviceT(option)}
            </option>
          ))}
        </FilterSelect>
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.date")}
          <input
            className={controlClass}
            onChange={(event) => setDate(event.target.value)}
            type="date"
            value={date}
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {t("results", { count: filtered.length })}
        </p>
        <FilterSelect
          label={t("filters.sort")}
          onChange={(value) => setSort(value as "ascending" | "descending")}
          value={sort}
        >
          <option value="ascending">{t("filters.oldestFirst")}</option>
          <option value="descending">{t("filters.newestFirst")}</option>
        </FilterSelect>
      </div>

      {filtered.length ? (
        <>
          <div className="mt-6 hidden overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm md:block dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
                <tr>
                  {(["date", "customer", "vehicle", "service", "status", "action"] as const).map(
                    (heading) => (
                      <th className="px-4 py-3 font-semibold" key={heading}>
                        {t(`table.${heading}`)}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filtered.map((appointment) => (
                  <AppointmentRow appointment={appointment} key={appointment.id} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-4 md:hidden">
            {filtered.map((appointment) => (
              <AppointmentMobileCard
                appointment={appointment}
                key={appointment.id}
              />
            ))}
          </div>
        </>
      ) : (
        <Card className="mt-6 text-center">
          <h2 className="text-xl font-semibold">{t("empty.title")}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {t("empty.description")}
          </p>
        </Card>
      )}
    </div>
  );

  function FilterSelect({
    children,
    label,
    onChange,
    value
  }: {
    children: React.ReactNode;
    label: string;
    onChange: (value: string) => void;
    value: string;
  }) {
    return (
      <label className="grid gap-2 text-sm font-semibold">
        {label}
        <select
          className={controlClass}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {children}
        </select>
      </label>
    );
  }

  function AppointmentRow({
    appointment
  }: {
    appointment: AdminAppointment;
  }) {
    const customer = customerFor(appointment);
    const vehicle = vehicleFor(appointment);
    return (
      <tr>
        <td className="px-4 py-4 font-medium">{formattedDate(appointment)}</td>
        <td className="px-4 py-4">{customer?.name}</td>
        <td className="px-4 py-4">
          {vehicle?.make} {vehicle?.model}
          <span className="block text-xs text-zinc-500">
            {vehicle?.registrationNumber}
          </span>
        </td>
        <td className="px-4 py-4">{serviceT(appointment.serviceType)}</td>
        <td className="px-4 py-4">
          <AdminAppointmentStatusBadge status={appointment.status} />
        </td>
        <td className="px-4 py-4">
          <DetailLink appointment={appointment} />
        </td>
      </tr>
    );
  }

  function AppointmentMobileCard({
    appointment
  }: {
    appointment: AdminAppointment;
  }) {
    const customer = customerFor(appointment);
    const vehicle = vehicleFor(appointment);
    return (
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold">{serviceT(appointment.serviceType)}</h2>
            <p className="mt-1 text-sm">{customer?.name}</p>
          </div>
          <AdminAppointmentStatusBadge status={appointment.status} />
        </div>
        <p className="mt-4 text-sm font-medium">{formattedDate(appointment)}</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {vehicle?.make} {vehicle?.model} · {vehicle?.registrationNumber}
        </p>
        <DetailLink appointment={appointment} />
      </Card>
    );
  }

  function DetailLink({ appointment }: { appointment: AdminAppointment }) {
    return (
      <Link
        className="mt-4 inline-block text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300"
        href={`/admin/appointments/${appointment.id}`}
      >
        {t("actions.view")}
      </Link>
    );
  }

  function customerFor(appointment: AdminAppointment) {
    return adminCustomers.find((item) => item.id === appointment.customerId);
  }

  function vehicleFor(appointment: AdminAppointment) {
    return adminVehicles.find((item) => item.id === appointment.vehicleId);
  }

  function appointmentDate(appointment: AdminAppointment) {
    return `${appointment.scheduledDate}T${appointment.scheduledTime}`;
  }

  function formattedDate(appointment: AdminAppointment) {
    return format.dateTime(new Date(appointmentDate(appointment)), {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
}
