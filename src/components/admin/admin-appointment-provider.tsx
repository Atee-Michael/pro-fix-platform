"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AppointmentStatus } from "@/lib/mock-data/appointments";
import {
  assignAdminAppointmentStaff,
  updateAdminAppointmentNotes,
  updateAdminAppointmentStatus
} from "@/lib/mock-data/admin-appointment-repository";
import {
  mockAdminAppointments,
  type AdminAppointment
} from "@/lib/mock-data/admin-appointments";

type AdminAppointmentContextValue = {
  appointments: AdminAppointment[];
  getAppointment: (id: string) => AdminAppointment | undefined;
  setStatus: (id: string, status: AppointmentStatus) => void;
  assignStaff: (id: string, staffId: string | null) => void;
  saveNotes: (
    id: string,
    field: "internalNotes" | "customerVisibleNotes",
    value: string
  ) => void;
};

const AdminAppointmentContext =
  createContext<AdminAppointmentContextValue | null>(null);

export function AdminAppointmentProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<AdminAppointment[]>(() =>
    mockAdminAppointments.map((appointment) => ({ ...appointment }))
  );

  const getAppointment = useCallback(
    (id: string) => appointments.find((appointment) => appointment.id === id),
    [appointments]
  );

  const mutate = useCallback(
    (id: string, change: (appointment: AdminAppointment) => AdminAppointment) =>
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === id ? change(appointment) : appointment
        )
      ),
    []
  );

  const setStatus = useCallback(
    (id: string, status: AppointmentStatus) =>
      mutate(id, (appointment) =>
        updateAdminAppointmentStatus(appointment, status)
      ),
    [mutate]
  );

  const assignStaff = useCallback(
    (id: string, staffId: string | null) =>
      mutate(id, (appointment) =>
        assignAdminAppointmentStaff(appointment, staffId)
      ),
    [mutate]
  );

  const saveNotes = useCallback(
    (
      id: string,
      field: "internalNotes" | "customerVisibleNotes",
      value: string
    ) =>
      mutate(id, (appointment) =>
        updateAdminAppointmentNotes(appointment, field, value)
      ),
    [mutate]
  );

  const value = useMemo(
    () => ({ appointments, getAppointment, setStatus, assignStaff, saveNotes }),
    [appointments, getAppointment, setStatus, assignStaff, saveNotes]
  );

  return (
    <AdminAppointmentContext.Provider value={value}>
      {children}
    </AdminAppointmentContext.Provider>
  );
}

export function useAdminAppointments() {
  const context = useContext(AdminAppointmentContext);
  if (!context) {
    throw new Error(
      "useAdminAppointments must be used within AdminAppointmentProvider"
    );
  }
  return context;
}
