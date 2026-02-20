def analyze_with_mock_llm(text: str):

    reasoning = []

    if "http" in text.lower():
        reasoning.append("Detected external link.")
    if "urgent" in text.lower():
        reasoning.append("Urgency language used.")
    if "password" in text.lower():
        reasoning.append("Credential harvesting pattern.")

    risk = min(len(reasoning) * 30, 95)
    verdict = "phishing" if risk > 50 else "legitimate"

    return {
        "risk_score": risk,
        "confidence": 0.88,
        "verdict": verdict,
        "mode": "llm_mock",
        "reasons": reasoning,
        "llm_explanation": "LLM-style reasoning simulation applied."
    }
