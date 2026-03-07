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


@router.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):

    total_scans = db.query(func.count(Scan.id)).scalar()

    high_risk = db.query(func.count(Scan.id)).filter(
        Scan.risk_score >= 70
    ).scalar()

    avg_risk = db.query(func.avg(Scan.risk_score)).scalar()

    rule_scans = db.query(func.count(Scan.id)).filter(
        Scan.mode == "rule"
    ).scalar()

    ml_scans = db.query(func.count(Scan.id)).filter(
        Scan.mode == "ml"
    ).scalar()

    hybrid_scans = db.query(func.count(Scan.id)).filter(
        Scan.mode == "hybrid"
    ).scalar()

    return {
        "total_scans": total_scans,
        "high_risk_scans": high_risk,
        "average_risk_score": round(avg_risk or 0, 2),
        "scan_modes": {
            "rule": rule_scans,
            "ml": ml_scans,
            "hybrid": hybrid_scans
        }
    }