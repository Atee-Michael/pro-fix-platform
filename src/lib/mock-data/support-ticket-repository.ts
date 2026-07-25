import type {
  CreateTicketInput,
  SupportTicket
} from "@/lib/mock-data/support-tickets";

export function createMockSupportTicket(
  input: CreateTicketInput
): SupportTicket {
  const now = new Date().toISOString();
  const id = `ticket-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  return {
    id,
    subject: input.subject,
    category: input.category,
    priority: input.priority,
    status: "open",
    createdAt: now,
    updatedAt: now,
    conversation: [
      {
        id: `${id}-message-1`,
        authorType: "customer",
        body: input.message,
        createdAt: now
      }
    ]
  };
}

export function addMockTicketReply(
  ticket: SupportTicket,
  body: string
): SupportTicket {
  const now = new Date().toISOString();
  return {
    ...ticket,
    status: "open",
    updatedAt: now,
    conversation: [
      ...ticket.conversation,
      {
        id: `${ticket.id}-message-${Date.now()}`,
        authorType: "customer",
        body,
        createdAt: now
      }
    ]
  };
}
