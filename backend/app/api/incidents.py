from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models_incident import Incident

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/incidents")
def create_incident(scan_id: int, severity: str, db: Session = Depends(get_db)):

    incident = Incident(
        scan_id=scan_id,
        severity=severity,
        status="open"
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return incident


@router.get("/incidents")
def get_incidents(db: Session = Depends(get_db)):

    return db.query(Incident).all()


@router.put("/incidents/{incident_id}")
def update_incident(
    incident_id: int,
    status: str,
    notes: str,
    db: Session = Depends(get_db)
):

    incident = db.query(Incident).filter(Incident.id == incident_id).first()

    if not incident:
        return {"error": "incident not found"}

    incident.status = status
    incident.analyst_notes = notes

    db.commit()

    return incident