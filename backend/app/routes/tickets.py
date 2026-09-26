from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.services.classifier import classify_query
from app.services.router_logic import route_to_desk
from app.utils.ticket_id import generate_ticket_id

router = APIRouter(prefix="/tickets", tags=["tickets"])

@router.post("/", response_model=schemas.TicketResponse)
def create_ticket(payload: schemas.TicketCreate, db: Session = Depends(get_db)):
    category, confidence, priority, engine = classify_query(payload.subject, payload.body)
    desk = route_to_desk(category)

    ticket = models.Ticket(
        id=generate_ticket_id(),
        student_id=payload.student_id,
        subject=payload.subject,
        body=payload.body,
        status="Pending",
        category=category,
        confidence=confidence,
        priority=priority,
        assigned_desk=desk,
        engine_used=engine,
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket

@router.get("/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.get("/", response_model=List[schemas.TicketResponse])
def list_tickets(desk: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Ticket)
    if desk:
        query = query.filter(models.Ticket.assigned_desk == desk)
    return query.order_by(models.Ticket.created_at.desc()).all()