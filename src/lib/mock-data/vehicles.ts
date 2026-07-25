export const fuelTypes = [
  "petrol",
  "diesel",
  "hybrid",
  "electric",
  "other"
] as const;

export const transmissionTypes = ["manual", "automatic", "other"] as const;

export type FuelType = (typeof fuelTypes)[number];
export type TransmissionType = (typeof transmissionTypes)[number];

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type VehicleInput = Omit<Vehicle, "id" | "createdAt" | "updatedAt">;

export const mockVehicles: Vehicle[] = [
  {
    id: "vehicle-001",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    registrationNumber: "PF21 BMW",
    vin: "WBA5R7C04MFK12345",
    mileage: 48250,
    fuelType: "petrol",
    transmission: "automatic",
    notes: "Annual service due in September.",
    createdAt: "2026-01-12T10:00:00.000Z",
    updatedAt: "2026-07-18T14:30:00.000Z"
  },
  {
    id: "vehicle-002",
    make: "MINI",
    model: "Countryman",
    year: 2019,
    registrationNumber: "PF19 MINI",
    vin: "WMWYU7C05K3F67890",
    mileage: 73100,
    fuelType: "diesel",
    transmission: "manual",
    notes: "",
    createdAt: "2026-02-03T09:15:00.000Z",
    updatedAt: "2026-06-29T11:45:00.000Z"
  }
];
