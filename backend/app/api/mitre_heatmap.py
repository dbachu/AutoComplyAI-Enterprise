from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json
from collections import Counter

from ..database import SessionLocal
from ..models import Scan

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/mitre-heatmap")
def mitre_heatmap(db: Session = Depends(get_db)):

    scans = db.query(Scan.mitre_mapping).all()

    techniques = []

    for scan in scans:
        if scan.mitre_mapping:
            try:
                items = json.loads(scan.mitre_mapping)
                techniques.extend(items)
            except:
                pass

    counts = Counter(techniques)

    return {
        "mitre_techniques": counts
    }