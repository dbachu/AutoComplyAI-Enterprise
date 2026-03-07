from pydantic import BaseModel

class ScanRequest(BaseModel):
    text: str
    mode: str = "rule"