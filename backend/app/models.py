from sqlalchemy import Column, String, Integer, Text, DateTime, Float
from datetime import datetime
from app.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(String, primary_key=True)          # e.g. ACT-1092
    student_id = Column(String)
    subject = Column(String)
    body = Column(Text)
    status = Column(String, default="Pending")
    category = Column(String, nullable=True)
    confidence = Column(Float, nullable=True)
    priority = Column(String, nullable=True)
    assigned_desk = Column(String, nullable=True)
    engine_used = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)