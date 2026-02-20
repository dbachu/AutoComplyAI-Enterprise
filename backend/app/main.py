from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from datetime import datetime
from .agents.agent_orchestrator import run_agent
from datetime import datetime, timezone

import os
import csv
import json

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

from .database import Base, engine, SessionLocal
from .models import Scan
from .detectors.orchestrator import run_detection
from .reporting.report_builder import build_report


# =========================
# APP INIT
# =========================

app = FastAPI(title="AutoComplyAI Enterprise")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


# =========================
# DB DEPENDENCY
# =========================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# SCAN ENDPOINT
# =========================

@app.post("/scan")
def scan(text: str, mode: str = "rule", db: Session = Depends(get_db)):
    # result = run_detection(text, mode)
    result = run_agent(text, mode)


    new_scan = Scan(
        text=text,
        risk_score=result["risk_score"],
        confidence=result["confidence"],
        mode=mode,
        verdict=result["verdict"],
        executive_summary=result.get("executive_summary"),
        compliance_mapping=json.dumps(result.get("compliance_mapping", [])),
        mitre_mapping=json.dumps(result.get("mitre_mapping", [])),
        remediation=json.dumps(result.get("remediation", [])),
        created_at = datetime.now(timezone.utc)
    )

    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)

    report = build_report(new_scan)

    return {
        "scan_id": new_scan.id,
        "report": report
    }


# =========================
# GET ALL SCANS
# =========================

@app.get("/scans")
def get_scans(db: Session = Depends(get_db)):
    return db.query(Scan).all()


# =========================
# EXPORT PDF
# =========================

@app.get("/export/pdf/{scan_id}")
def export_pdf(scan_id: int, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()

    if not scan:
        return {"error": "Scan not found"}

    report = build_report(scan)

    file_path = f"report_{scan_id}.pdf"
    doc = SimpleDocTemplate(file_path)
    elements = []
    styles = getSampleStyleSheet()

    elements.append(Paragraph("AutoComplyAI Phishing Detection Report", styles["Heading1"]))
    elements.append(Spacer(1, 0.3 * inch))

    elements.append(Paragraph(f"Verdict: {report['verdict']}", styles["Normal"]))
    elements.append(Paragraph(f"Risk Score: {report['risk_score']}", styles["Normal"]))
    elements.append(Paragraph(f"Confidence: {report['confidence']}", styles["Normal"]))
    elements.append(Paragraph(f"Mode: {report['mode']}", styles["Normal"]))
    elements.append(Spacer(1, 0.3 * inch))

    elements.append(Paragraph("Compliance Mapping:", styles["Heading3"]))
    elements.append(
        ListFlowable(
            [ListItem(Paragraph(item, styles["Normal"])) for item in report["compliance_mapping"]]
        )
    )

    elements.append(Spacer(1, 0.3 * inch))

    elements.append(Paragraph("Remediation:", styles["Heading3"]))
    elements.append(
        ListFlowable(
            [ListItem(Paragraph(item, styles["Normal"])) for item in report["remediation"]]
        )
    )

    doc.build(elements)

    return FileResponse(file_path, filename=file_path)


# =========================
# EXPORT JSON
# =========================

@app.get("/export/json/{scan_id}")
def export_json(scan_id: int, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()

    if not scan:
        return {"error": "Scan not found"}

    report = build_report(scan)

    file_path = f"report_{scan_id}.json"

    with open(file_path, "w") as f:
        json.dump(report, f, indent=4)

    return FileResponse(file_path, filename=file_path)


# =========================
# EXPORT CSV
# =========================

@app.get("/export/csv/{scan_id}")
def export_csv(scan_id: int, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()

    if not scan:
        return {"error": "Scan not found"}

    report = build_report(scan)

    file_path = f"report_{scan_id}.csv"

    with open(file_path, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)

        writer.writerow(["Field", "Value"])
        writer.writerow(["Verdict", report["verdict"]])
        writer.writerow(["Risk Score", report["risk_score"]])
        writer.writerow(["Confidence", report["confidence"]])
        writer.writerow(["Mode", report["mode"]])

        writer.writerow([])
        writer.writerow(["Compliance Mapping"])
        for item in report["compliance_mapping"]:
            writer.writerow([item])

        writer.writerow([])
        writer.writerow(["Remediation"])
        for item in report["remediation"]:
            writer.writerow([item])

    return FileResponse(file_path, filename=file_path)
