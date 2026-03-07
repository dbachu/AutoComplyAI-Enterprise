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


@router.get("/risk-trend")
def risk_trend(db: Session = Depends(get_db)):

    results = db.query(
        func.date(Scan.created_at),
        func.avg(Scan.risk_score)
    ).group_by(
        func.date(Scan.created_at)
    ).all()

    trend = []

    for date, avg in results:
        trend.append({
            "date": str(date),
            "average_risk": round(avg or 0, 2)
        })

    return trend