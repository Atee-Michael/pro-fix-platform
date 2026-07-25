import type { AppointmentStatus } from "@/lib/mock-data/appointments";
import type { AdminAppointment } from "@/lib/mock-data/admin-appointments";

function updated(
  appointment: AdminAppointment,
  changes: Partial<AdminAppointment>
): AdminAppointment {
  return { ...appointment, ...changes, updatedAt: new Date().toISOString() };
}

export function updateAdminAppointmentStatus(
  appointment: AdminAppointment,
  status: AppointmentStatus
) {
  return updated(appointment, { status });
}

export function assignAdminAppointmentStaff(
  appointment: AdminAppointment,
  assignedStaffId: string | null
) {
  return updated(appointment, { assignedStaffId });
}

export function updateAdminAppointmentNotes(
  appointment: AdminAppointment,
  field: "internalNotes" | "customerVisibleNotes",
  value: string
) {
  return updated(appointment, { [field]: value });
}
