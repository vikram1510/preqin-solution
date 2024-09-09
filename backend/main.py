from models import Base, Commitment
from db import get_db, engine
from fastapi import FastAPI, Depends, Query
from typing import Union
from sqlalchemy.orm import Session
from sqlalchemy import func

from fastapi import FastAPI
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

Base.metadata.create_all(bind=engine)
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/commitments")
def get_commitments_by_investor(
    investor_name: str = Query(None, description="Name of the investor"),
    asset_class: str = Query(None, description="Type of asset class"),
    db: Session = Depends(get_db)
):
    query = db.query(Commitment)
    if investor_name:
        query = query.filter_by(investor_name=investor_name)

    if asset_class:
        query = query.filter_by(asset_class=asset_class)
    
    commitments = query.all()
    return commitments


@app.get("/commitments/aggregate")
def get_aggregated_data(db: Session = Depends(get_db)):
    result = db.query(
        Commitment.id,
        Commitment.investor_name,
        Commitment.investor_type,
        Commitment.date_added,
        Commitment.investor_country,
        func.sum(Commitment.amount).label('total_commitment')
    ).group_by(
        Commitment.id,
        Commitment.investor_name,
        Commitment.investor_type,
        Commitment.date_added,
        Commitment.investor_country
    ).all()
    
    aggregated_data = [
        {
            "id": row[0],
            "investor_name": row[1],
            "investor_type": row[2],
            "date_added": row[3].strftime('%Y-%m-%d'),
            "investor_country": row[4],
            "total_commitment": row[5]
        }
        for row in result
    ]
    return aggregated_data
