import bcrypt
import re
from app import models
import random

def get_user(email,db):
    # print("hi")
    user=db.query(models.User).filter(models.User.email==email).first()
    
    return user

def hash_password(password:str)->str:
    salt=bcrypt.gensalt()
    hashed_password=bcrypt.hashpw(password.encode('utf-8'),salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password:str,hashed_password:str):
    return bcrypt.checkpw(plain_password.encode('utf-8'),hashed_password.encode('utf-8'))


def extract_review_and_company(text):
    pattern=re.compile(r"(.*)\s+#(\w+)")
    
    match=pattern.match(text)
    
    if match:
        review=match.group(1).strip()
        company=match.group(2).strip()
        return review,company
    else:
        return None,None
    


def get_random_color():
    letters = "0123456789ABCDEF"
    color = "#"
    for i in range(6):
        color += random.choice(letters)
    return color
