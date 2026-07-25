export const mockDashboardData = {
  customer: {
    id: "customer-001",
    name: "Amelia Carter",
    email: "amelia.carter@example.com",
    phone: "+44 7700 900123",
    role: "customer" as const
  },
  vehicles: [
    {
      id: "vehicle-001",
      make: "BMW",
      model: "3 Series",
      year: 2021,
      registration: "PF21 BMW"
    },
    {
      id: "vehicle-002",
      make: "MINI",
      model: "Countryman",
      year: 2019,
      registration: "PF19 MINI"
    }
  ],
  appointments: [
    {
      id: "appointment-001",
      vehicleId: "vehicle-001",
      date: "2026-08-04T09:30:00.000Z",
      serviceKey: "annualService",
      status: "confirmed" as const
    }
  ],
  supportTickets: [
    {
      id: "ticket-001",
      subjectKey: "serviceReport",
      status: "open" as const,
      updatedAt: "2026-07-22T14:15:00.000Z"
    }
  ],
  notifications: [
    {
      id: "notification-001",
      messageKey: "bookingConfirmed",
      createdAt: "2026-07-23T10:00:00.000Z"
    },
    {
      id: "notification-002",
      messageKey: "reportReady",
      createdAt: "2026-07-21T16:30:00.000Z"
    }
  ],
  statistics: [
    { key: "vehicles", value: 2 },
    { key: "upcomingBookings", value: 1 },
    { key: "availableReports", value: 3 },
    { key: "openTickets", value: 1 }
  ]
} as const;

export type MockDashboardData = typeof mockDashboardData;
