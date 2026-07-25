import { z } from "zod";
import { fuelTypes, transmissionTypes } from "@/lib/mock-data/vehicles";

const currentYear = new Date().getFullYear();

export const vehicleSchema = z.object({
  make: z.string().trim().min(1, "required"),
  model: z.string().trim().min(1, "required"),
  year: z.coerce
    .number({ error: "yearInvalid" })
    .int("yearInvalid")
    .min(1886, "yearRange")
    .max(currentYear + 1, "yearRange"),
  registrationNumber: z.string().trim().min(1, "required"),
  vin: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "required")
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/, "vinInvalid"),
  mileage: z.coerce
    .number({ error: "mileageInvalid" })
    .int("mileageInvalid")
    .min(0, "mileageInvalid")
    .max(10_000_000, "mileageInvalid"),
  fuelType: z.enum(fuelTypes, { error: "required" }),
  transmission: z.enum(transmissionTypes, { error: "required" }),
  notes: z.string().trim().max(2000, "notesTooLong")
});

export type VehicleFormValues = z.input<typeof vehicleSchema>;
