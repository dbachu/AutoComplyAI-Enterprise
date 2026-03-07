from ..detectors.rule_engine import detect as rule_detect
from ..detectors.ml_engine import detect as ml_detect
from ..agents.llm_mock import analyze_with_mock_llm
from ..agents.llm_model import analyze_with_llm

# Safe OpenAI import
try:
    from ..agents.openai_agent import analyze_with_openai
except Exception:
    analyze_with_openai = None

import re


# ===============================
# MITRE Mapping Generator
# ===============================

def generate_mitre_mapping(text: str, risk_score: float):

    text_lower = text.lower()
    mappings = []

    if "http" in text_lower or "link" in text_lower:
        mappings.append("T1566.002 – Phishing: Link")

    if "password" in text_lower or "credential" in text_lower:
        mappings.append("T1556 – Credential Harvesting")

    if "attachment" in text_lower:
        mappings.append("T1566.001 – Phishing: Attachment")

    if risk_score >= 75:
        mappings.append("T1204 – User Execution")

    return mappings


# ===============================
# Threat Intelligence Agent
# ===============================

def threat_intel_agent(text):

    indicators = []

    urls = re.findall(r'https?://\S+', text)

    for url in urls:
        indicators.append(f"External URL detected: {url}")

    if "bank" in text.lower():
        indicators.append("Banking phishing pattern detected")

    if "verify" in text.lower():
        indicators.append("Credential verification request")

    return indicators


# ===============================
# Compliance Mapping Agent
# ===============================

def compliance_agent(risk_score):

    mappings = []

    if risk_score >= 50:

        mappings.append("ISO 27001 A.16 – Incident Management")
        mappings.append("NIST CSF PR.DS – Data Security")
        mappings.append("GDPR Article 32 – Security of Processing")

    return mappings


# ===============================
# Executive Summary Agent
# ===============================

def executive_summary_agent(verdict):

    if verdict == "phishing":

        return (
            "The analyzed message exhibits multiple phishing indicators "
            "including credential harvesting language and suspicious links."
        )

    return (
        "The analyzed message appears legitimate and does not contain "
        "significant phishing indicators."
    )


# ===============================
# MAIN ORCHESTRATOR
# ===============================

def run_agent(text: str, mode: str):

    # ---------------------------------
    # RULE MODE
    # ---------------------------------

    if mode == "rule":

        rule = rule_detect(text)
        score = rule.get("risk_score", 0)

        result = {
            **rule,
            "decision_breakdown": {
                "rule_engine": score,
                "ml_model": 0,
                "llm_model": 0,
                "weighted_score": score,
                "hybrid_final": score
            }
        }

    # ---------------------------------
    # ML MODE
    # ---------------------------------

    elif mode == "ml":

        ml = ml_detect(text)
        score = ml.get("risk_score", 0)

        result = {
            **ml,
            "decision_breakdown": {
                "rule_engine": 0,
                "ml_model": score,
                "llm_model": 0,
                "weighted_score": score,
                "hybrid_final": score
            }
        }

    # ---------------------------------
    # HYBRID MODE (Rule + ML + LLM)
    # ---------------------------------

    elif mode == "hybrid":

        rule = rule_detect(text)
        ml = ml_detect(text)
        llm = analyze_with_llm(text)

        rule_score = rule.get("risk_score", 0)
        ml_score = ml.get("risk_score", 0)
        llm_score = llm.get("risk_score", 0)

        weighted_score = (
            rule_score * 0.3 +
            ml_score * 0.3 +
            llm_score * 0.4
        )

        risk = max(rule_score, ml_score, llm_score, weighted_score)

        verdict = "phishing" if risk >= 50 else "legitimate"

        result = {
            "risk_score": int(risk),
            "confidence": 0.94,
            "verdict": verdict,
            "mode": "hybrid",
            "reasons": (
                rule.get("reasons", [])
                + ml.get("reasons", [])
                + llm.get("reasons", [])
            ),

            "decision_breakdown": {
                "rule_engine": rule_score,
                "ml_model": ml_score,
                "llm_model": llm_score,
                "weighted_score": int(weighted_score),
                "hybrid_final": int(risk)
            }
        }

    # ---------------------------------
    # MOCK LLM MODE
    # ---------------------------------

    elif mode == "llm_mock":

        llm = analyze_with_mock_llm(text)
        score = llm.get("risk_score", 0)

        result = {
            **llm,
            "decision_breakdown": {
                "rule_engine": 0,
                "ml_model": 0,
                "llm_model": score,
                "weighted_score": score,
                "hybrid_final": score
            }
        }

    # ---------------------------------
    # REAL LLM MODEL MODE
    # ---------------------------------

    elif mode == "llm_model":

        llm = analyze_with_llm(text)
        score = llm.get("risk_score", 0)

        result = {
            **llm,
            "decision_breakdown": {
                "rule_engine": 0,
                "ml_model": 0,
                "llm_model": score,
                "weighted_score": score,
                "hybrid_final": score
            }
        }

    # ---------------------------------
    # OPENAI MODE
    # ---------------------------------

    elif mode == "openai":

        if analyze_with_openai is None:

            result = {
                "risk_score": 0,
                "confidence": 0,
                "verdict": "unknown",
                "mode": "openai",
                "reasons": ["OpenAI agent not configured"],
                "decision_breakdown": {}
            }

        else:

            result = analyze_with_openai(text)

    else:

        rule = rule_detect(text)
        score = rule.get("risk_score", 0)

        result = {
            **rule,
            "decision_breakdown": {
                "rule_engine": score,
                "ml_model": 0,
                "llm_model": 0,
                "weighted_score": score,
                "hybrid_final": score
            }
        }

    # ---------------------------------
    # Standardize Output
    # ---------------------------------

    result.setdefault("risk_score", 0)
    result.setdefault("confidence", 0.8)
    result.setdefault("verdict", "legitimate")
    result.setdefault("reasons", [])
    result.setdefault("mode", mode)

    # ---------------------------------
    # Threat Intelligence Agent
    # ---------------------------------

    result["threat_intel"] = threat_intel_agent(text)

    # ---------------------------------
    # MITRE Mapping
    # ---------------------------------

    result["mitre_mapping"] = generate_mitre_mapping(
        text,
        result["risk_score"]
    )

    # ---------------------------------
    # Compliance Mapping
    # ---------------------------------

    result["compliance_mapping"] = compliance_agent(
        result["risk_score"]
    )

    # ---------------------------------
    # Executive Summary
    # ---------------------------------

    result["executive_summary"] = executive_summary_agent(
        result["verdict"]
    )

    # ---------------------------------
    # Ensure Keys
    # ---------------------------------

    result.setdefault("remediation", [])
    result.setdefault("decision_breakdown", {})

    # ---------------------------------
    # Agent Reasoning Timeline
    # ---------------------------------

    timeline = []

    timeline.append({
        "agent": "Detection Agent",
        "message": f"Risk score calculated: {result['risk_score']}"
    })

    if result.get("threat_intel"):
        for intel in result["threat_intel"]:
            timeline.append({
                "agent": "Threat Intelligence Agent",
                "message": intel
            })

    if result.get("mitre_mapping"):
        for mitre in result["mitre_mapping"]:
            timeline.append({
                "agent": "MITRE Mapping Agent",
                "message": mitre
            })

    if result.get("compliance_mapping"):
        for comp in result["compliance_mapping"]:
            timeline.append({
                "agent": "Compliance Agent",
                "message": comp
            })

    timeline.append({
        "agent": "Report Agent",
        "message": "Executive summary generated"
    })

    result["agent_timeline"] = timeline

    return result