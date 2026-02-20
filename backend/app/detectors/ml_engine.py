
def detect(text):
    risk = 80 if "urgent" in text.lower() else 15
    verdict = "phishing" if risk > 50 else "legitimate"
    return {"risk_score": risk, "confidence": 0.85, "verdict": verdict}
