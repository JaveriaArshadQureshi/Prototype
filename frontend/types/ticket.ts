export interface Ticket {
  id: string;
  student_id: string;
  subject: string;
  body?: string;
  status: string;
  category: string | null;
  confidence: number | null;
  priority: string | null;
  assigned_desk: string | null;
  engine_used: string | null;
}