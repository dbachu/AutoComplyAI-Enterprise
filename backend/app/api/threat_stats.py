from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import SessionLocal
from ..models import Scan

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/threat-stats")
def threat_stats(db: Session = Depends(get_db)):

    verdict_counts = db.query(
        Scan.verdict,
        func.count(Scan.id)
    ).group_by(Scan.verdict).all()

    results = {}

    for verdict, count in verdict_counts:
        results[verdict] = count

    return {
        "verdict_distribution": results
    }