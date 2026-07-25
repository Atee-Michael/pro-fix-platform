export const ticketCategories = [
  "appointment",
  "vehicle",
  "repairReport",
  "receiptPayment",
  "account",
  "generalEnquiry"
] as const;

export const ticketPriorities = ["low", "normal", "high", "urgent"] as const;
export const ticketStatuses = ["open", "awaitingReply", "resolved", "closed"] as const;

export type TicketCategory = (typeof ticketCategories)[number];
export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketStatus = (typeof ticketStatuses)[number];

export type TicketMessage = {
  id: string;
  authorType: "customer" | "support";
  body: string;
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  conversation: TicketMessage[];
};

export type CreateTicketInput = {
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  message: string;
};

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "ticket-201",
    subject: "Question about diagnostic appointment",
    category: "appointment",
    priority: "normal",
    status: "awaitingReply",
    createdAt: "2026-07-20T09:15:00.000Z",
    updatedAt: "2026-07-22T14:20:00.000Z",
    conversation: [
      {
        id: "message-201-1",
        authorType: "customer",
        body: "Should I leave the vehicle for the full day?",
        createdAt: "2026-07-20T09:15:00.000Z"
      },
      {
        id: "message-201-2",
        authorType: "support",
        body: "Please plan to leave it with us for the morning. We will update you after the initial checks.",
        createdAt: "2026-07-22T14:20:00.000Z"
      }
    ]
  },
  {
    id: "ticket-202",
    subject: "Receipt copy requested",
    category: "receiptPayment",
    priority: "low",
    status: "resolved",
    createdAt: "2026-06-12T11:00:00.000Z",
    updatedAt: "2026-06-13T08:30:00.000Z",
    conversation: [
      {
        id: "message-202-1",
        authorType: "customer",
        body: "Could you provide another copy of my latest service receipt?",
        createdAt: "2026-06-12T11:00:00.000Z"
      },
      {
        id: "message-202-2",
        authorType: "support",
        body: "The receipt has been prepared for collection at the workshop.",
        createdAt: "2026-06-13T08:30:00.000Z"
      }
    ]
  }
];
