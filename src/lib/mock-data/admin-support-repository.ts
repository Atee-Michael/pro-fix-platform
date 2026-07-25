import type {
  AdminSupportTicket
} from "@/lib/mock-data/admin-support";
import type {
  TicketPriority,
  TicketStatus
} from "@/lib/mock-data/support-tickets";

function updated(
  ticket: AdminSupportTicket,
  changes: Partial<AdminSupportTicket>
): AdminSupportTicket {
  return { ...ticket, ...changes, updatedAt: new Date().toISOString() };
}

export function addAdminStaffReply(
  ticket: AdminSupportTicket,
  body: string
): AdminSupportTicket {
  const now = new Date().toISOString();
  return updated(ticket, {
    status: "awaitingReply",
    customerConversation: [
      ...ticket.customerConversation,
      {
        id: `${ticket.id}-staff-${Date.now()}`,
        authorType: "staff",
        body,
        createdAt: now
      }
    ]
  });
}

export function addAdminInternalNote(
  ticket: AdminSupportTicket,
  body: string
): AdminSupportTicket {
  const now = new Date().toISOString();
  return updated(ticket, {
    internalNotes: [
      ...ticket.internalNotes,
      { id: `${ticket.id}-internal-${Date.now()}`, body, createdAt: now }
    ]
  });
}

export function updateAdminTicket(
  ticket: AdminSupportTicket,
  changes: {
    status?: TicketStatus;
    priority?: TicketPriority;
    assignedStaffId?: string | null;
  }
) {
  return updated(ticket, changes);
}
