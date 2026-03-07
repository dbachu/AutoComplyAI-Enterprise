from sqlalchemy.orm import Session
from datetime import datetime, timezone
import json

from ..agents.agent_orchestrator import run_agent
from ..models import Scan
from ..services.threat_intel import enrich_threat_intel


class ScanService:

    @staticmethod
    def run_scan(text: str, mode: str, db: Session):

        result = run_agent(text, mode)

        intel = enrich_threat_intel(text)

        result.setdefault("threat_intel", [])
        result["threat_intel"] += intel

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
            created_at=datetime.now(timezone.utc)
        )

        db.add(new_scan)
        db.commit()
        db.refresh(new_scan)

        return new_scan, result