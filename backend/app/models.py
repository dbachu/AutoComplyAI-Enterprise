from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from .database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    risk_score = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    mode = Column(String, nullable=False)
    verdict = Column(String, nullable=False)
    executive_summary = Column(Text)
    compliance_mapping = Column(Text)   # stored as JSON string
    mitre_mapping = Column(Text)        # stored as JSON string
    remediation = Column(Text)          # stored as JSON string
    created_at = Column(DateTime, nullable=False)
