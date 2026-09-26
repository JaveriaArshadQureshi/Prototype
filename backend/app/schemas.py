from pydantic import BaseModel
from typing import Optional

class TicketCreate(BaseModel):
    student_id: str
    subject: str
    body: str

class TicketResponse(BaseModel):
    id: str
    student_id: str
    subject: str
    status: str
    category: Optional[str] = None
    confidence: Optional[float] = None
    priority: Optional[str] = None
    assigned_desk: Optional[str] = None
    engine_used: Optional[str] = None 

    class Config:
        from_attributes = True