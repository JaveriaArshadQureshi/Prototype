import { Ticket } from "../types/ticket";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div
      style={{
        border: "1px solid #000000",
        borderRadius: "0px",
        padding: "20px",
        marginBottom: "16px",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
          paddingBottom: "12px",
          borderBottom: "1px solid #000000",
        }}
      >
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.05em", color: "#666666", margin: "0 0 4px", textTransform: "uppercase" }}>
            {ticket.id}
          </p>
          <p style={{ fontWeight: 600, fontSize: "15px", margin: 0, color: "#000000" }}>
            {ticket.subject}
          </p>
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "4px 10px",
            border: "1px solid #000000",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          {ticket.status}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <p style={{ fontSize: "10px", letterSpacing: "0.05em", color: "#999999", margin: "0 0 2px", textTransform: "uppercase" }}>
            Student
          </p>
          <p style={{ fontSize: "13px", color: "#000000", margin: 0 }}>{ticket.student_id}</p>
        </div>
        <div>
          <p style={{ fontSize: "10px", letterSpacing: "0.05em", color: "#999999", margin: "0 0 2px", textTransform: "uppercase" }}>
            Category
          </p>
          <p style={{ fontSize: "13px", color: "#000000", margin: 0 }}>{ticket.category}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: "1px dashed #CCCCCC",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#000000",
          }}
        >
          ● {ticket.priority} priority
        </span>
        <span style={{ fontSize: "12px", color: "#666666" }}>
          {ticket.confidence}% confidence
        </span>
      </div>
    </div>
  );
}