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
  status: "requested";
  submittedAt: string;
};

export const mockAppointments: MockAppointment[] = [];
