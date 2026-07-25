import type {
  AppointmentInput,
  MockAppointment
} from "@/lib/mock-data/appointments";

export function createMockAppointment(
  input: AppointmentInput
): MockAppointment {
  return {
    ...input,
    id: `appointment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    garageNotes: "",
    internalAdminNotes: ""
  };
}

export function cancelMockAppointment(
  appointment: MockAppointment
): MockAppointment {
  return {
    ...appointment,
    status: "cancelled",
    updatedAt: new Date().toISOString()
  };
}

export function rescheduleMockAppointment(
  appointment: MockAppointment,
  preferredDate: string,
  preferredTime: string
): MockAppointment {
  const now = new Date().toISOString();
  return {
    ...appointment,
    preferredDate,
    preferredTime,
    status: "pending",
    rescheduleRequestedAt: now,
    updatedAt: now
  };
}
