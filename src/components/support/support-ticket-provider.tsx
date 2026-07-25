"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  addMockTicketReply,
  createMockSupportTicket
} from "@/lib/mock-data/support-ticket-repository";
import {
  mockSupportTickets,
  type CreateTicketInput,
  type SupportTicket
} from "@/lib/mock-data/support-tickets";

type SupportTicketContextValue = {
  tickets: SupportTicket[];
  getTicket: (id: string) => SupportTicket | undefined;
  createTicket: (input: CreateTicketInput) => Promise<SupportTicket>;
  addReply: (id: string, body: string) => Promise<SupportTicket | undefined>;
};

const SupportTicketContext = createContext<SupportTicketContextValue | null>(
  null
);

export function SupportTicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<SupportTicket[]>(() =>
    mockSupportTickets.map((ticket) => ({
      ...ticket,
      conversation: ticket.conversation.map((message) => ({ ...message }))
    }))
  );

  const getTicket = useCallback(
    (id: string) => tickets.find((ticket) => ticket.id === id),
    [tickets]
  );

  const createTicket = useCallback(async (input: CreateTicketInput) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const ticket = createMockSupportTicket(input);
    setTickets((current) => [ticket, ...current]);
    return ticket;
  }, []);

  const addReply = useCallback(async (id: string, body: string) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    let updated: SupportTicket | undefined;
    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== id) return ticket;
        updated = addMockTicketReply(ticket, body);
        return updated;
      })
    );
    return updated;
  }, []);

  const value = useMemo(
    () => ({ tickets, getTicket, createTicket, addReply }),
    [tickets, getTicket, createTicket, addReply]
  );

  return (
    <SupportTicketContext.Provider value={value}>
      {children}
    </SupportTicketContext.Provider>
  );
}

export function useSupportTickets() {
  const context = useContext(SupportTicketContext);
  if (!context) {
    throw new Error("useSupportTickets must be used within SupportTicketProvider");
  }
  return context;
}
