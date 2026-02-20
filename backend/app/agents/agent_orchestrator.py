from ..detectors.rule_engine import detect as rule_detect
from ..detectors.ml_engine import detect as ml_detect
from ..agents.llm_mock import analyze_with_mock_llm
from ..agents.openai_agent import analyze_with_openai


# ===============================
# MITRE Mapping Generator
# ===============================
def generate_mitre_mapping(text: str, risk_score: float):
    text_lower = text.lower()
    mappings = []

    if "http" in text_lower or "link" in text_lower:
        mappings.append("T1566.002 – Phishing: Link")

    if "password" in text_lower or "credential" in text_lower:
        mappings.append("T1556 – Modify Authentication Process")

    if "attachment" in text_lower:
        mappings.append("T1566.001 – Phishing: Attachment")

    if risk_score >= 75:
        mappings.append("T1204 – User Execution")

    return mappings


# ===============================
# MAIN ORCHESTRATOR
# ===============================
def run_agent(text: str, mode: str):

    if mode == "rule":
        result = rule_detect(text)

    elif mode == "ml":
        result = ml_detect(text)

    elif mode == "hybrid":
        rule = rule_detect(text)
        ml = ml_detect(text)

        risk = (rule.get("risk_score", 0) + ml.get("risk_score", 0)) / 2
        verdict = "phishing" if risk > 50 else "legitimate"

        rule_reasons = rule.get("reasons", [])
        ml_reasons = ml.get("reasons", [])

        result = {
            "risk_score": risk,
            "confidence": 0.92,
            "verdict": verdict,
            "mode": "hybrid",
            "reasons": rule_reasons + ml_reasons
        }

    elif mode == "llm_mock":
        result = analyze_with_mock_llm(text)

    elif mode == "openai":
        result = analyze_with_openai(text)

    else:
        result = rule_detect(text)

    # ---------------------------------
    # Standardize Output Structure
    # ---------------------------------
    result.setdefault("risk_score", 0)
    result.setdefault("confidence", 0.8)
    result.setdefault("verdict", "legitimate")
    result.setdefault("reasons", [])
    result.setdefault("mode", mode)

    # ---------------------------------
    # Inject MITRE Mapping
    # ---------------------------------
    result["mitre_mapping"] = generate_mitre_mapping(
        text,
        result["risk_score"]
    )

    # ---------------------------------
    # Ensure Compliance + Remediation exist
    # ---------------------------------
    result.setdefault("compliance_mapping", [])
    result.setdefault("remediation", [])
    result.setdefault("executive_summary", None)

    return result
