import os
'''
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_with_openai(text: str):

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a cybersecurity AI detecting phishing."},
                {"role": "user", "content": text}
            ]
        )

        analysis = response.choices[0].message["content"]

        verdict = "phishing" if "phishing" in analysis.lower() else "legitimate"

        return {
            "risk_score": 85 if verdict == "phishing" else 20,
            "confidence": 0.95,
            "verdict": verdict,
            "mode": "openai",
            "reasons": [analysis],
            "llm_explanation": "OpenAI GPT reasoning applied."
        }

    except Exception as e:
        return {
            "risk_score": 0,
            "confidence": 0,
            "verdict": "error",
            "mode": "openai",
            "reasons": [str(e)]
        }
'''
def analyze_with_openai(text: str):
    # Mock LLM reasoning
    if "password" in text.lower() or "verify" in text.lower():
        return {
            "risk_score": 85,
            "confidence": 0.92,
            "verdict": "phishing",
            "reasons": ["LLM detected credential harvesting pattern"]
        }

    return {
        "risk_score": 15,
        "confidence": 0.88,
        "verdict": "legitimate",
        "reasons": ["LLM detected normal communication"]
    }

