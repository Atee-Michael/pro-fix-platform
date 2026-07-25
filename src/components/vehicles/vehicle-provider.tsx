"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import {
  createMockVehicle,
  updateMockVehicle
} from "@/lib/mock-data/vehicle-repository";
import {
  mockVehicles,
  type Vehicle,
  type VehicleInput
} from "@/lib/mock-data/vehicles";

type VehicleContextValue = {
  vehicles: Vehicle[];
  addVehicle: (input: VehicleInput) => Vehicle;
  editVehicle: (id: string, input: VehicleInput) => Vehicle | undefined;
  deleteVehicle: (id: string) => void;
  getVehicle: (id: string) => Vehicle | undefined;
};

const VehicleContext = createContext<VehicleContextValue | null>(null);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() =>
    mockVehicles.map((vehicle) => ({ ...vehicle }))
  );

  const addVehicle = useCallback((input: VehicleInput) => {
    const vehicle = createMockVehicle(input);
    setVehicles((current) => [...current, vehicle]);
    return vehicle;
  }, []);

  const editVehicle = useCallback((id: string, input: VehicleInput) => {
    let updated: Vehicle | undefined;
    setVehicles((current) =>
      current.map((vehicle) => {
        if (vehicle.id !== id) return vehicle;
        updated = updateMockVehicle(vehicle, input);
        return updated;
      })
    );
    return updated;
  }, []);

  const deleteVehicle = useCallback((id: string) => {
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id));
  }, []);

  const getVehicle = useCallback(
    (id: string) => vehicles.find((vehicle) => vehicle.id === id),
    [vehicles]
  );

  const value = useMemo(
    () => ({ vehicles, addVehicle, editVehicle, deleteVehicle, getVehicle }),
    [vehicles, addVehicle, editVehicle, deleteVehicle, getVehicle]
  );

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicles must be used within VehicleProvider");
  }
  return context;
}
