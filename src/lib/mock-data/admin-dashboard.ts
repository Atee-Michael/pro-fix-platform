export const adminDashboardStatistics = [
  { key: "todaysAppointments", value: 8 },
  { key: "pendingApprovals", value: 3 },
  { key: "inProgressAppointments", value: 2 },
  { key: "completedAppointments", value: 5 },
  { key: "openSupportTickets", value: 7 },
  { key: "totalCustomers", value: 248 },
  { key: "totalVehicles", value: 316 },
  { key: "publishedArticles", value: 14 }
] as const;

export const adminRecentActivity = [
  {
    id: "activity-001",
    type: "appointmentConfirmed",
    subject: "BMW 3 Series",
    occurredAt: "2026-07-25T09:42:00.000Z"
  },
  {
    id: "activity-002",
    type: "supportTicketOpened",
    subject: "Diagnostic appointment question",
    occurredAt: "2026-07-25T09:18:00.000Z"
  },
  {
    id: "activity-003",
    type: "customerAdded",
    subject: "Noah Martin",
    occurredAt: "2026-07-25T08:55:00.000Z"
  },
  {
    id: "activity-004",
    type: "appointmentCompleted",
    subject: "MINI Countryman",
    occurredAt: "2026-07-25T08:30:00.000Z"
  }
] as const;
