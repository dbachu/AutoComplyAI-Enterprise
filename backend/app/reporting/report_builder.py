from datetime import datetime, timezone
import json


def generate_compliance_mapping(text: str):
    mapping = []
    text_lower = text.lower()

    if "password" in text_lower or "credential" in text_lower:
        mapping.append("ISO27001 A.9.2 – User access management")
        mapping.append("NIST-CSF PR.AC-1 – Identity management")

    if "http" in text_lower or "link" in text_lower:
        mapping.append("ISO27001 A.12.2 – Protection from malware")
        mapping.append("NIST-CSF DE.CM-1 – Network monitoring")

    if "urgent" in text_lower:
        mapping.append("NIST-CSF PR.AT-1 – Security awareness training")

    if not mapping:
        mapping.append("ISO27001 A.18 – Compliance & audit")

    return list(set(mapping))


def generate_remediation(verdict: str):
    if verdict == "phishing":
        return [
            "Do not click suspicious links.",
            "Reset affected credentials immediately.",
            "Enable Multi-Factor Authentication (MFA).",
            "Report the incident to security operations."
        ]
    else:
        return [
            "No malicious activity detected.",
            "Continue monitoring.",
            "Maintain security awareness best practices."
        ]


def build_report(scan):

    compliance_mapping = generate_compliance_mapping(scan.text)
    remediation = generate_remediation(scan.verdict)

    summary = f"""
    The AI detection engine analyzed the submitted content and classified it as
    '{scan.verdict.upper()}' with a risk score of {scan.risk_score}.
    Detection was performed using '{scan.mode}' mode.
    """

    return {
        "scan_id": scan.id,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "risk_score": scan.risk_score,
        "confidence": scan.confidence,
        "verdict": scan.verdict,
        "mode": scan.mode,
        "executive_summary": summary.strip(),
        "compliance_mapping": compliance_mapping,
        "mitre_mapping": scan.mitre_mapping if isinstance(scan.mitre_mapping, list)
            else json.loads(scan.mitre_mapping or "[]"),
        "remediation": remediation,
    }