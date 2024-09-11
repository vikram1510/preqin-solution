from models import Base, Commitment
from db import get_db, engine
from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from sqlalchemy.orm import Session
from sqlalchemy import func

from fastapi import FastAPI
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)


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


@app.get("/investors")
def get_aggregated_data(db: Session = Depends(get_db)):
    result = db.query(
        Commitment.investor_name,
        Commitment.investor_type,
        Commitment.investor_country,
        func.sum(Commitment.amount).label('total_commitment')
    ).group_by(
        Commitment.investor_name
    ).all()
    
    aggregated_data = [
        {
            "investor_name": row[0],
            "investor_type": row[1],
            "investor_country": row[2],
            "total_commitment": row[3]
        }
        for row in result
    ]
    return aggregated_data



@app.get("/asset-classes")
def get_asset_classes(
    investor_name: str = Query(None, description="Name of the investor"),
    db: Session = Depends(get_db)
):
    result = (
        db.query(
            Commitment.asset_class,
            func.sum(Commitment.amount).label('total_commitment')
        )
        .filter_by(investor_name=investor_name)
        .group_by(Commitment.asset_class)
        .all()
    )

    if not result:
        raise HTTPException(status_code=404, detail="No data found for the given investor")
    
    return [
        {"asset_class_name": row.asset_class, "total_commitment": row.total_commitment} 
        for row in result
    ]

