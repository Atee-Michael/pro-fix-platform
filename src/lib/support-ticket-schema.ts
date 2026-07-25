import { z } from "zod";
import {
  ticketCategories,
  ticketPriorities
} from "@/lib/mock-data/support-tickets";

export const createTicketSchema = z.object({
  subject: z.string().trim().min(5, "subjectMin").max(120, "subjectMax"),
  category: z.enum(ticketCategories, { error: "required" }),
  priority: z.enum(ticketPriorities, { error: "required" }),
  message: z.string().trim().min(10, "messageMin").max(4000, "messageMax")
});

export const ticketReplySchema = z.object({
  message: z.string().trim().min(1, "replyRequired").max(4000, "messageMax")
});
