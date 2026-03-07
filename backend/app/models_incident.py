from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .database import Base


class Incident(Base):

    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    scan_id = Column(Integer, ForeignKey("scans.id"))

    severity = Column(String, default="medium")

    status = Column(String, default="open")

    analyst_notes = Column(String)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    scan = relationship("Scan")