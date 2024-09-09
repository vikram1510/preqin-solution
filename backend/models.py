from sqlalchemy import Column, Integer, String, Float, Date
from db import Base

class Commitment(Base):
    __tablename__ = "commitments"
    id = Column(Integer, primary_key=True, index=True)
    investor_name = Column(String, index=True)
    investor_type = Column(String)
    investor_country = Column(String)
    date_added = Column(Date)
    last_updated = Column(Date)
    asset_class = Column(String)
    amount = Column(Float)
    currency = Column(String)
