def analyze_with_mock_llm(text):

    text_lower = text.lower()

    risk = 0
    reasons = []

    # phishing indicators

    if "verify" in text_lower:
        risk += 30
        reasons.append("Credential verification language detected")

    if "bank" in text_lower:
        risk += 30
        reasons.append("Financial institution reference detected")

    if "account" in text_lower:
        risk += 20
        reasons.append("Account access request detected")

    if "http://" in text_lower or "https://" in text_lower:
        risk += 30
        reasons.append("External link detected")

    if "urgent" in text_lower or "immediately" in text_lower:
        risk += 20
        reasons.append("Urgency language detected")

    # cap risk score
    risk = min(risk, 100)

    verdict = "phishing" if risk >= 50 else "legitimate"

    return {
        "risk_score": risk,
        "confidence": 0.85,
        "verdict": verdict,
        "reasons": reasons
    }