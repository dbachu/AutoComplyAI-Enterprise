
def detect(text):
    risk = 90 if "http" in text.lower() else 10
    verdict = "phishing" if risk > 50 else "legitimate"
    return {"risk_score": risk, "confidence": 0.9, "verdict": verdict}
