"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  cancelMockAppointment,
  createMockAppointment,
  rescheduleMockAppointment
} from "@/lib/mock-data/appointment-repository";
import {
  mockAppointments,
  type AppointmentInput,
  type MockAppointment
} from "@/lib/mock-data/appointments";

type AppointmentContextValue = {
  appointments: MockAppointment[];
  submitAppointment: (input: AppointmentInput) => Promise<MockAppointment>;
  getAppointment: (id: string) => MockAppointment | undefined;
  cancelAppointment: (id: string) => Promise<MockAppointment | undefined>;
  rescheduleAppointment: (
    id: string,
    preferredDate: string,
    preferredTime: string
  ) => Promise<MockAppointment | undefined>;
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

  const getAppointment = useCallback(
    (id: string) => appointments.find((appointment) => appointment.id === id),
    [appointments]
  );

  const cancelAppointment = useCallback(async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    let result: MockAppointment | undefined;
    setAppointments((current) =>
      current.map((appointment) => {
        if (appointment.id !== id) return appointment;
        result = cancelMockAppointment(appointment);
        return result;
      })
    );
    return result;
  }, []);

  const rescheduleAppointment = useCallback(
    async (id: string, preferredDate: string, preferredTime: string) => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      let result: MockAppointment | undefined;
      setAppointments((current) =>
        current.map((appointment) => {
          if (appointment.id !== id) return appointment;
          result = rescheduleMockAppointment(
            appointment,
            preferredDate,
            preferredTime
          );
          return result;
        })
      );
      return result;
    },
    []
  );

  const value = useMemo(
    () => ({
      appointments,
      submitAppointment,
      getAppointment,
      cancelAppointment,
      rescheduleAppointment
    }),
    [
      appointments,
      submitAppointment,
      getAppointment,
      cancelAppointment,
      rescheduleAppointment
    ]
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
