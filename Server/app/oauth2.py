from fastapi.security import OAuth2PasswordBearer
import app
from datetime import datetime,timedelta
import jwt
from sqlalchemy.orm import Session
from app import models
from app.database import get_db
from fastapi import Depends,HTTPException,status
from app.schemas import TokenData
from app.models import User

oauth2_scheme1=OAuth2PasswordBearer(tokenUrl='sign-in')
# oauth2_scheme2=OAuth2PasswordBearer(tokenUrl='sign-up')

SECRECT_KEY="00c3771882d7146c0d6b7b94376d64f1f4b36a5c3dc087577e790db9267a5430"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=60

def create_access_token(data:dict):
    to_encode=data.copy()
    expire=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    
    encoded_jwt=jwt.encode(to_encode,SECRECT_KEY,algorithm=ALGORITHM)
    
    return encoded_jwt





def verify_access_token(token:str,credentials_exception):
    
    try:
        payload=jwt.decode(token,SECRECT_KEY,algorithms=ALGORITHM)
        
        id:str=payload.get("user_id")
        name:str=payload.get("user_name")
        
        if id is None or name is None:
            raise credentials_exception
        token_data=TokenData(id=id,name=name)
        return token_data
    except jwt.PyJWTError:
        raise credentials_exception
    



def get_current_user1(db:Session=Depends(get_db),token:str=Depends(oauth2_scheme1)):
    credentials_exception=HTTPException(status_code=status.HTTP_401_UNAUTHORIZED ,detail=f"could not verify",headers={"WWW-Authenticate":"Bearer"})
    
    token=verify_access_token(token,credentials_exception)
    
    user=db.query(models.User).filter(models.User.id==int(token.id)).first()
    
    return user
    

    
