"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createMockAppointment } from "@/lib/mock-data/appointment-repository";
import {
  mockAppointments,
  type AppointmentInput,
  type MockAppointment
} from "@/lib/mock-data/appointments";

type AppointmentContextValue = {
  appointments: MockAppointment[];
  submitAppointment: (input: AppointmentInput) => Promise<MockAppointment>;
};

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function AppointmentProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<MockAppointment[]>(() => [
    ...mockAppointments
  ]);

  const submitAppointment = useCallback(async (input: AppointmentInput) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    const appointment = createMockAppointment(input);
    setAppointments((current) => [...current, appointment]);
    return appointment;
  }, []);

  const value = useMemo(
    () => ({ appointments, submitAppointment }),
    [appointments, submitAppointment]
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider");
  }
  return context;
}
