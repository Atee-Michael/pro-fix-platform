export const adminCustomerTicketLinks = [
  {
    id: "ticket-201",
    customerId: "customer-001",
    subject: "Question about diagnostic appointment",
    status: "open",
    updatedAt: "2026-07-22T14:20:00.000Z"
  },
  {
    id: "ticket-202",
    customerId: "customer-001",
    subject: "Receipt copy requested",
    status: "resolved",
    updatedAt: "2026-06-13T08:30:00.000Z"
  },
  {
    id: "ticket-203",
    customerId: "customer-002",
    subject: "Vehicle details question",
    status: "open",
    updatedAt: "2026-07-24T11:05:00.000Z"
  }
] as const;

export const adminCustomerActivity = [
  {
    id: "customer-activity-1",
    customerId: "customer-001",
    type: "appointmentConfirmed",
    occurredAt: "2026-07-20T13:30:00.000Z"
  },
  {
    id: "customer-activity-2",
    customerId: "customer-001",
    type: "supportReply",
    occurredAt: "2026-07-22T14:20:00.000Z"
  },
  {
    id: "customer-activity-3",
    customerId: "customer-002",
    type: "accountInvited",
    occurredAt: "2026-07-21T14:30:00.000Z"
  },
  {
    id: "customer-activity-4",
    customerId: "customer-003",
    type: "appointmentUpdated",
    occurredAt: "2026-07-25T08:20:00.000Z"
  }
] as const;

export const adminVehicleReports = [
  {
    id: "report-301",
    vehicleId: "vehicle-001",
    title: "Diagnostic inspection report",
    date: "2026-06-10T15:00:00.000Z"
  },
  {
    id: "report-302",
    vehicleId: "vehicle-003",
    title: "Air-conditioning service report",
    date: "2026-07-18T14:30:00.000Z"
  }
] as const;

export const adminVehicleReceipts = [
  {
    id: "receipt-401",
    vehicleId: "vehicle-001",
    reference: "PF-2026-041",
    date: "2026-06-10T15:10:00.000Z"
  },
  {
    id: "receipt-402",
    vehicleId: "vehicle-003",
    reference: "PF-2026-058",
    date: "2026-07-18T14:40:00.000Z"
  }
] as const;
