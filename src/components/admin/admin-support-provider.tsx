"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  addAdminInternalNote,
  addAdminStaffReply,
  updateAdminTicket
} from "@/lib/mock-data/admin-support-repository";
import {
  mockAdminSupportTickets,
  type AdminSupportTicket
} from "@/lib/mock-data/admin-support";
import type {
  TicketPriority,
  TicketStatus
} from "@/lib/mock-data/support-tickets";

type AdminSupportContextValue = {
  tickets: AdminSupportTicket[];
  getTicket: (id: string) => AdminSupportTicket | undefined;
  addStaffReply: (id: string, body: string) => void;
  addInternalNote: (id: string, body: string) => void;
  updateTicket: (
    id: string,
    changes: {
      status?: TicketStatus;
      priority?: TicketPriority;
      assignedStaffId?: string | null;
    }
  ) => void;
};

const AdminSupportContext = createContext<AdminSupportContextValue | null>(null);

export function AdminSupportProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<AdminSupportTicket[]>(() =>
    mockAdminSupportTickets.map((ticket) => ({
      ...ticket,
      customerConversation: ticket.customerConversation.map((item) => ({
        ...item
      })),
      internalNotes: ticket.internalNotes.map((item) => ({ ...item }))
    }))
  );

  const getTicket = useCallback(
    (id: string) => tickets.find((ticket) => ticket.id === id),
    [tickets]
  );
  const mutate = useCallback(
    (id: string, action: (ticket: AdminSupportTicket) => AdminSupportTicket) =>
      setTickets((current) =>
        current.map((ticket) => (ticket.id === id ? action(ticket) : ticket))
      ),
    []
  );
  const addStaffReply = useCallback(
    (id: string, body: string) =>
      mutate(id, (ticket) => addAdminStaffReply(ticket, body)),
    [mutate]
  );
  const addInternalNote = useCallback(
    (id: string, body: string) =>
      mutate(id, (ticket) => addAdminInternalNote(ticket, body)),
    [mutate]
  );
  const updateTicket = useCallback(
    (
      id: string,
      changes: {
        status?: TicketStatus;
        priority?: TicketPriority;
        assignedStaffId?: string | null;
      }
    ) => mutate(id, (ticket) => updateAdminTicket(ticket, changes)),
    [mutate]
  );

  const value = useMemo(
    () => ({
      tickets,
      getTicket,
      addStaffReply,
      addInternalNote,
      updateTicket
    }),
    [tickets, getTicket, addStaffReply, addInternalNote, updateTicket]
  );
  return (
    <AdminSupportContext.Provider value={value}>
      {children}
    </AdminSupportContext.Provider>
  );
}

export function useAdminSupport() {
  const context = useContext(AdminSupportContext);
  if (!context) {
    throw new Error("useAdminSupport must be used within AdminSupportProvider");
  }
  return context;
}
