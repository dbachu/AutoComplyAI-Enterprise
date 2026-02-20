
from .rule_engine import detect as rule_detect
from .ml_engine import detect as ml_detect

def detect(text):
    r = rule_detect(text)
    m = ml_detect(text)
    risk = (r["risk_score"] + m["risk_score"]) / 2
    verdict = "phishing" if risk > 50 else "legitimate"
    return {"risk_score": risk, "confidence": 0.92, "verdict": verdict}
