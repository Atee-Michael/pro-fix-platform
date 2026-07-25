export const serviceTypes = [
  "diagnosticInspection",
  "routineMaintenance",
  "engineRepair",
  "electricalDiagnosis",
  "brakeService",
  "suspensionService",
  "airConditioningService",
  "prePurchaseInspection",
  "bmwCodingProgramming",
  "other"
] as const;

export const preferredTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00"
] as const;

export type ServiceType = (typeof serviceTypes)[number];
export const appointmentStatuses = [
  "pending",
  "confirmed",
  "inProgress",
  "awaitingParts",
  "completed",
  "cancelled"
] as const;
export type AppointmentStatus = (typeof appointmentStatuses)[number];

export type AppointmentVehicle =
  | { mode: "existing"; vehicleId: string }
  | {
      mode: "temporary";
      make: string;
      model: string;
      year: number;
      registrationNumber: string;
    };

export type AppointmentInput = {
  serviceType: ServiceType;
  vehicle: AppointmentVehicle;
  preferredDate: string;
  preferredTime: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

export type MockAppointment = AppointmentInput & {
  id: string;
  status: AppointmentStatus;
  submittedAt: string;
  updatedAt: string;
  garageNotes: string;
  internalAdminNotes: string;
  rescheduleRequestedAt?: string;
};

export const mockAppointments: MockAppointment[] = [
  {
    id: "appointment-101",
    serviceType: "diagnosticInspection",
    vehicle: { mode: "existing", vehicleId: "vehicle-001" },
    preferredDate: "2026-08-04",
    preferredTime: "09:00",
    contactName: "Amelia Carter",
    contactEmail: "amelia.carter@example.com",
    contactPhone: "+44 7700 900123",
    notes: "Intermittent drivetrain warning after longer journeys.",
    garageNotes: "Please leave the vehicle with us for the morning.",
    internalAdminNotes: "Internal workshop allocation placeholder.",
    status: "confirmed",
    submittedAt: "2026-07-18T10:00:00.000Z",
    updatedAt: "2026-07-20T13:30:00.000Z"
  },
  {
    id: "appointment-102",
    serviceType: "brakeService",
    vehicle: { mode: "existing", vehicleId: "vehicle-002" },
    preferredDate: "2026-08-12",
    preferredTime: "13:00",
    contactName: "Amelia Carter",
    contactEmail: "amelia.carter@example.com",
    contactPhone: "+44 7700 900123",
    notes: "Front brakes squeal at low speed.",
    garageNotes: "",
    internalAdminNotes: "",
    status: "pending",
    submittedAt: "2026-07-23T09:15:00.000Z",
    updatedAt: "2026-07-23T09:15:00.000Z"
  },
  {
    id: "appointment-099",
    serviceType: "routineMaintenance",
    vehicle: { mode: "existing", vehicleId: "vehicle-001" },
    preferredDate: "2026-06-10",
    preferredTime: "10:00",
    contactName: "Amelia Carter",
    contactEmail: "amelia.carter@example.com",
    contactPhone: "+44 7700 900123",
    notes: "Annual service.",
    garageNotes: "Service completed. No additional work required.",
    internalAdminNotes: "Internal invoice reference placeholder.",
    status: "completed",
    submittedAt: "2026-05-28T08:00:00.000Z",
    updatedAt: "2026-06-10T15:00:00.000Z"
  },
  {
    id: "appointment-098",
    serviceType: "airConditioningService",
    vehicle: { mode: "existing", vehicleId: "vehicle-002" },
    preferredDate: "2026-05-15",
    preferredTime: "14:00",
    contactName: "Amelia Carter",
    contactEmail: "amelia.carter@example.com",
    contactPhone: "+44 7700 900123",
    notes: "",
    garageNotes: "",
    internalAdminNotes: "",
    status: "cancelled",
    submittedAt: "2026-05-04T12:00:00.000Z",
    updatedAt: "2026-05-07T10:00:00.000Z"
  }
];
