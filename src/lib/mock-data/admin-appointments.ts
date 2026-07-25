import type {
  AppointmentStatus,
  ServiceType
} from "@/lib/mock-data/appointments";

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountState: "active" | "invited" | "suspended";
  joinedAt: string;
};

export type AdminVehicle = {
  id: string;
  customerId: string;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
  serviceNotes: string;
};

export type AdminStaffMember = {
  id: string;
  displayName: string;
  specialty: string;
};

export type AdminAppointment = {
  id: string;
  customerId: string;
  vehicleId: string;
  serviceType: ServiceType;
  status: AppointmentStatus;
  scheduledDate: string;
  scheduledTime: string;
  customerNotes: string;
  customerVisibleNotes: string;
  internalNotes: string;
  assignedStaffId: string | null;
  createdAt: string;
  updatedAt: string;
};

export const adminCustomers: AdminCustomer[] = [
  {
    id: "customer-001",
    name: "Amelia Carter",
    email: "amelia.carter@example.com",
    phone: "+44 7700 900123",
    accountState: "active",
    joinedAt: "2025-11-14T10:00:00.000Z"
  },
  {
    id: "customer-002",
    name: "Noah Martin",
    email: "noah.martin@example.com",
    phone: "+44 7700 900456",
    accountState: "invited",
    joinedAt: "2026-07-21T14:30:00.000Z"
  },
  {
    id: "customer-003",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    phone: "+33 6 12 34 56 78",
    accountState: "suspended",
    joinedAt: "2025-08-02T09:00:00.000Z"
  }
];

export const adminVehicles: AdminVehicle[] = [
  {
    id: "vehicle-001",
    customerId: "customer-001",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    registrationNumber: "PF21 BMW",
    vin: "WBA5R7C04MFK12345",
    serviceNotes: "Use manufacturer-approved oil specification."
  },
  {
    id: "vehicle-002",
    customerId: "customer-001",
    make: "MINI",
    model: "Countryman",
    year: 2019,
    registrationNumber: "PF19 MINI",
    vin: "WMWYU7C05K3F67890",
    serviceNotes: ""
  },
  {
    id: "vehicle-003",
    customerId: "customer-002",
    make: "BMW",
    model: "X5",
    year: 2022,
    registrationNumber: "NX22 BMW",
    vin: "WBACR6C01N9K24680",
    serviceNotes: "Check tyre pressures during each workshop visit."
  },
  {
    id: "vehicle-004",
    customerId: "customer-003",
    make: "Audi",
    model: "A4",
    year: 2020,
    registrationNumber: "SB20 AUD",
    vin: "WAUZZZF40LA135791",
    serviceNotes: "Customer reports intermittent passenger window control."
  }
];

export const adminStaffMembers: AdminStaffMember[] = [
  { id: "staff-001", displayName: "Workshop team A", specialty: "diagnostics" },
  { id: "staff-002", displayName: "Workshop team B", specialty: "mechanical" },
  { id: "staff-003", displayName: "Workshop team C", specialty: "electrical" }
];

export const mockAdminAppointments: AdminAppointment[] = [
  {
    id: "appointment-101",
    customerId: "customer-001",
    vehicleId: "vehicle-001",
    serviceType: "diagnosticInspection",
    status: "confirmed",
    scheduledDate: "2026-08-04",
    scheduledTime: "09:00",
    customerNotes: "Intermittent drivetrain warning after longer journeys.",
    customerVisibleNotes: "Please leave the vehicle with us for the morning.",
    internalNotes: "Allocate diagnostic bay on arrival.",
    assignedStaffId: "staff-001",
    createdAt: "2026-07-18T10:00:00.000Z",
    updatedAt: "2026-07-20T13:30:00.000Z"
  },
  {
    id: "appointment-102",
    customerId: "customer-001",
    vehicleId: "vehicle-002",
    serviceType: "brakeService",
    status: "pending",
    scheduledDate: "2026-08-12",
    scheduledTime: "13:00",
    customerNotes: "Front brakes squeal at low speed.",
    customerVisibleNotes: "",
    internalNotes: "",
    assignedStaffId: null,
    createdAt: "2026-07-23T09:15:00.000Z",
    updatedAt: "2026-07-23T09:15:00.000Z"
  },
  {
    id: "appointment-103",
    customerId: "customer-002",
    vehicleId: "vehicle-003",
    serviceType: "routineMaintenance",
    status: "inProgress",
    scheduledDate: "2026-07-25",
    scheduledTime: "10:00",
    customerNotes: "Annual maintenance and tyre pressure check.",
    customerVisibleNotes: "Vehicle inspection is currently underway.",
    internalNotes: "Check service history before resetting indicator.",
    assignedStaffId: "staff-002",
    createdAt: "2026-07-10T12:30:00.000Z",
    updatedAt: "2026-07-25T09:50:00.000Z"
  },
  {
    id: "appointment-104",
    customerId: "customer-003",
    vehicleId: "vehicle-004",
    serviceType: "electricalDiagnosis",
    status: "awaitingParts",
    scheduledDate: "2026-07-24",
    scheduledTime: "14:00",
    customerNotes: "Passenger window controls are intermittent.",
    customerVisibleNotes: "A replacement switch has been requested.",
    internalNotes: "Part reference recorded in workshop system placeholder.",
    assignedStaffId: "staff-003",
    createdAt: "2026-07-14T08:45:00.000Z",
    updatedAt: "2026-07-25T08:20:00.000Z"
  },
  {
    id: "appointment-105",
    customerId: "customer-002",
    vehicleId: "vehicle-003",
    serviceType: "airConditioningService",
    status: "completed",
    scheduledDate: "2026-07-18",
    scheduledTime: "11:00",
    customerNotes: "Air is no longer cooling effectively.",
    customerVisibleNotes: "System serviced and cooling performance confirmed.",
    internalNotes: "No leak detected during pressure test.",
    assignedStaffId: "staff-003",
    createdAt: "2026-07-08T10:10:00.000Z",
    updatedAt: "2026-07-18T14:30:00.000Z"
  }
];
