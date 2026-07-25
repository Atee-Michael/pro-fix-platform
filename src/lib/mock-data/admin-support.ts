import type {
  TicketCategory,
  TicketPriority,
  TicketStatus
} from "@/lib/mock-data/support-tickets";

export type AdminSupportMessage = {
  id: string;
  authorType: "customer" | "staff";
  body: string;
  createdAt: string;
};

export type AdminInternalNote = {
  id: string;
  body: string;
  createdAt: string;
};

export type AdminSupportTicket = {
  id: string;
  customerId: string;
  relatedAppointmentId: string | null;
  relatedVehicleId: string | null;
  assignedStaffId: string | null;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  customerConversation: AdminSupportMessage[];
  internalNotes: AdminInternalNote[];
};

export const mockAdminSupportTickets: AdminSupportTicket[] = [
  {
    id: "ticket-201",
    customerId: "customer-001",
    relatedAppointmentId: "appointment-101",
    relatedVehicleId: "vehicle-001",
    assignedStaffId: "staff-001",
    subject: "Question about diagnostic appointment",
    category: "appointment",
    priority: "normal",
    status: "awaitingReply",
    createdAt: "2026-07-20T09:15:00.000Z",
    updatedAt: "2026-07-22T14:20:00.000Z",
    customerConversation: [
      {
        id: "admin-message-201-1",
        authorType: "customer",
        body: "Should I leave the vehicle for the full day?",
        createdAt: "2026-07-20T09:15:00.000Z"
      },
      {
        id: "admin-message-201-2",
        authorType: "staff",
        body: "Please plan to leave it with us for the morning. We will update you after the initial checks.",
        createdAt: "2026-07-22T14:20:00.000Z"
      }
    ],
    internalNotes: [
      {
        id: "internal-note-201-1",
        body: "Confirm diagnostic bay availability before promising a collection time.",
        createdAt: "2026-07-20T10:00:00.000Z"
      }
    ]
  },
  {
    id: "ticket-202",
    customerId: "customer-001",
    relatedAppointmentId: null,
    relatedVehicleId: "vehicle-002",
    assignedStaffId: null,
    subject: "Receipt copy requested",
    category: "receiptPayment",
    priority: "low",
    status: "resolved",
    createdAt: "2026-06-12T11:00:00.000Z",
    updatedAt: "2026-06-13T08:30:00.000Z",
    customerConversation: [
      {
        id: "admin-message-202-1",
        authorType: "customer",
        body: "Could you provide another copy of my latest service receipt?",
        createdAt: "2026-06-12T11:00:00.000Z"
      },
      {
        id: "admin-message-202-2",
        authorType: "staff",
        body: "The receipt has been prepared for collection at the workshop.",
        createdAt: "2026-06-13T08:30:00.000Z"
      }
    ],
    internalNotes: []
  },
  {
    id: "ticket-203",
    customerId: "customer-002",
    relatedAppointmentId: "appointment-103",
    relatedVehicleId: "vehicle-003",
    assignedStaffId: "staff-002",
    subject: "Vehicle details question",
    category: "vehicle",
    priority: "high",
    status: "open",
    createdAt: "2026-07-24T10:45:00.000Z",
    updatedAt: "2026-07-24T11:05:00.000Z",
    customerConversation: [
      {
        id: "admin-message-203-1",
        authorType: "customer",
        body: "The mileage shown on my service summary needs checking.",
        createdAt: "2026-07-24T10:45:00.000Z"
      }
    ],
    internalNotes: []
  },
  {
    id: "ticket-204",
    customerId: "customer-003",
    relatedAppointmentId: null,
    relatedVehicleId: null,
    assignedStaffId: "staff-003",
    subject: "Account access query",
    category: "account",
    priority: "urgent",
    status: "closed",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-02T15:30:00.000Z",
    customerConversation: [
      {
        id: "admin-message-204-1",
        authorType: "customer",
        body: "I have a question about access to my account.",
        createdAt: "2026-07-01T08:00:00.000Z"
      }
    ],
    internalNotes: [
      {
        id: "internal-note-204-1",
        body: "Closed after confirming this is a mock account state.",
        createdAt: "2026-07-02T15:30:00.000Z"
      }
    ]
  }
];
