import { z } from "zod";

export const adminTicketSearchSchema = z.string().trim().max(100).catch("");

export const adminStaffReplySchema = z.object({
  body: z.string().trim().min(1, "required").max(4000, "tooLong")
});

export const adminInternalNoteSchema = z.object({
  body: z.string().trim().min(1, "required").max(4000, "tooLong")
});
