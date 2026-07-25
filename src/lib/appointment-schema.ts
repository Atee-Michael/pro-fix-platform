import { z } from "zod";
import { preferredTimes, serviceTypes } from "@/lib/mock-data/appointments";

export const serviceStepSchema = z.object({
  serviceType: z.enum(serviceTypes, { error: "required" })
});

const temporaryVehicleSchema = z.object({
  vehicleMode: z.literal("temporary"),
  vehicleId: z.string().optional(),
  temporaryMake: z.string().trim().min(1, "required"),
  temporaryModel: z.string().trim().min(1, "required"),
  temporaryYear: z.coerce
    .number({ error: "yearInvalid" })
    .int("yearInvalid")
    .min(1886, "yearRange")
    .max(new Date().getFullYear() + 1, "yearRange"),
  temporaryRegistration: z.string().trim().min(1, "required")
});

const existingVehicleSchema = z.object({
  vehicleMode: z.literal("existing"),
  vehicleId: z.string().trim().min(1, "vehicleRequired"),
  temporaryMake: z.string().optional(),
  temporaryModel: z.string().optional(),
  temporaryYear: z.union([z.string(), z.number()]).optional(),
  temporaryRegistration: z.string().optional()
});

export const vehicleStepSchema = z.discriminatedUnion("vehicleMode", [
  existingVehicleSchema,
  temporaryVehicleSchema
]);

export const dateStepSchema = z
  .object({ preferredDate: z.string().min(1, "required") })
  .refine(
    ({ preferredDate }) => preferredDate >= new Date().toISOString().slice(0, 10),
    { path: ["preferredDate"], message: "datePast" }
  );

export const timeStepSchema = z.object({
  preferredTime: z.enum(preferredTimes, { error: "required" })
});

export const contactStepSchema = z.object({
  contactName: z.string().trim().min(1, "required"),
  contactEmail: z.string().trim().min(1, "required").email("emailInvalid"),
  contactPhone: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^[+\d][\d\s().-]{6,24}$/, "phoneInvalid")
});

export const notesStepSchema = z.object({
  notes: z.string().trim().max(2000, "notesTooLong")
});

export const bookingReviewSchema = z.intersection(
  vehicleStepSchema,
  z.object({
    serviceType: z.enum(serviceTypes, { error: "required" }),
    preferredDate: z.string().min(1, "required"),
    preferredTime: z.enum(preferredTimes, { error: "required" }),
    contactName: z.string().trim().min(1, "required"),
    contactEmail: z.string().trim().min(1, "required").email("emailInvalid"),
    contactPhone: z
      .string()
      .trim()
      .min(1, "required")
      .regex(/^[+\d][\d\s().-]{6,24}$/, "phoneInvalid"),
    notes: z.string().trim().max(2000, "notesTooLong")
  })
).refine(
  ({ preferredDate }) => preferredDate >= new Date().toISOString().slice(0, 10),
  { path: ["preferredDate"], message: "datePast" }
);
