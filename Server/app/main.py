# print("jai sri ram")
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import auth, feed
from sqlalchemy.orm import Session
from . import models
from .database import engine,SessionLocal,get_db
# from .schemas import SignUp_Creds
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:5173",  # Replace with your frontend URL
    # Add more origins if needed
]

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Adjust allowed methods as needed
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(feed.router)


@app.get("/")
def read_root():
    return {"jai Sri Rama":"Jai Sri Hanuman"}


@app.get("/users")
def get_all_users(db:Session=Depends(get_db)):
    print()
    users=db.query(models.User).all()
    
    return users