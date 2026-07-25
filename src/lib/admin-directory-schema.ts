import { z } from "zod";

const safeSearch = z.string().trim().max(100).catch("");

export const customerListFiltersSchema = z.object({
  search: safeSearch,
  accountState: z.enum(["all", "active", "invited", "suspended"]).catch("all"),
  page: z.coerce.number().int().min(1).catch(1)
});

export const vehicleListFiltersSchema = z.object({
  search: safeSearch,
  make: z.string().trim().max(50).catch("all"),
  year: z.union([z.literal("all"), z.coerce.number().int().min(1886).max(2100)]).catch("all"),
  page: z.coerce.number().int().min(1).catch(1)
});
