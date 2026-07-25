import type { Vehicle, VehicleInput } from "@/lib/mock-data/vehicles";

export function createMockVehicle(input: VehicleInput): Vehicle {
  const now = new Date().toISOString();
  return {
    ...input,
    id: `vehicle-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now
  };
}

export function updateMockVehicle(
  vehicle: Vehicle,
  input: VehicleInput
): Vehicle {
  return { ...vehicle, ...input, updatedAt: new Date().toISOString() };
}
