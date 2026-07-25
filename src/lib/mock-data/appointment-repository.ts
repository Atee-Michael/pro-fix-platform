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
    status: "requested",
    submittedAt: new Date().toISOString()
  };
}
