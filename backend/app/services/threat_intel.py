import requests
import re


PHISHTANK_URL = "https://checkurl.phishtank.com/checkurl/"


def extract_urls(text):

    urls = re.findall(r'https?://\S+', text)

    return urls


def check_phishtank(url):

    try:

        res = requests.post(
            PHISHTANK_URL,
            data={"url": url}
        )

        data = res.json()

        return data.get("results", {}).get("valid", False)

    except Exception:

        return False


def enrich_threat_intel(text):

    urls = extract_urls(text)

    indicators = []

    for url in urls:

        if check_phishtank(url):

            indicators.append(
                f"Known phishing URL detected: {url}"
            )

    return indicators