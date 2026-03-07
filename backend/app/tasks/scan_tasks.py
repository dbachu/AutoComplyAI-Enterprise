from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..services.scan_service import ScanService
from ..reporting.report_builder import build_report


def process_scan(text: str, mode: str):

    db: Session = SessionLocal()

    try:
        scan = ScanService.run_scan(text, mode, db)

        # build report after scan completes
        report = build_report(scan)

        return report

    finally:
        db.close()