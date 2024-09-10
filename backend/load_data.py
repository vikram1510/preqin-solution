import csv
from sqlalchemy.orm import Session
from models import Commitment
from db import engine, SessionLocal, Base
from datetime import datetime

def load_data_from_csv(file_path: str):
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        with open(file_path, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                commitment = Commitment(
                    investor_name=row['Investor Name'],
                    investor_type=row['Investor Type'],
                    investor_country=row['Investor Country'],
                    date_added=datetime.strptime(row['Investor Date Added'], '%Y-%m-%d'),
                    last_updated=datetime.strptime(row['Investor Last Updated'], '%Y-%m-%d'),
                    asset_class=row['Commitment Asset Class'],
                    amount=float(row['Commitment Amount']),
                    currency=row['Commitment Currency']
                )
                db.add(commitment)
            db.commit()
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Create Tables
    Base.metadata.create_all(bind=engine) 

    # Load data
    load_data_from_csv('data.csv')
