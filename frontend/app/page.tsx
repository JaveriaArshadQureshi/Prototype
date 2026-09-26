"use client";
import { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import { Ticket } from "../types/ticket";

export default function DeskPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const desk = encodeURIComponent("Fee & Billing Desk");
    fetch(`http://127.0.0.1:8000/tickets/?desk=${desk}`)
      .then((res) => res.json())
      .then((data: Ticket[]) => setTickets(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: "40px", paddingBottom: "20px", borderBottom: "2px solid #000000" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#666666", margin: "0 0 6px", textTransform: "uppercase" }}>
            Accounts department
          </p>
          <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0, color: "#000000" }}>
            Fee &amp; Billing Desk
          </h1>
        </div>

        {error && (
          <p style={{ fontSize: "13px", color: "#000000", border: "1px solid #000000", padding: "12px 16px" }}>
            Could not load tickets: {error}
          </p>
        )}

        {!error && tickets.length === 0 && (
          <p style={{ fontSize: "13px", color: "#999999", textAlign: "center", padding: "60px 0" }}>
            No tickets yet.
          </p>
        )}

        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}