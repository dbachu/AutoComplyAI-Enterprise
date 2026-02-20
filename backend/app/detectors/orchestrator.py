
from .rule_engine import detect as rule_detect
from .ml_engine import detect as ml_detect
from .hybrid_engine import detect as hybrid_detect

def run_detection(text, mode):
    if mode == "ml":
        return ml_detect(text)
    if mode == "hybrid":
        return hybrid_detect(text)
    return rule_detect(text)
