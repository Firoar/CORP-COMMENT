import typing
from pydantic import BaseModel, EmailStr

class SignUp_Creds(BaseModel):
    name:str
    email:EmailStr
    password:str
    confirm_password:str
    
class SignIn_Creds(BaseModel):
    email:EmailStr
    password:str
    
class TokenData(BaseModel):
    id:typing.Optional[str]=None
    name:typing.Optional[str]=None
    
class Review(BaseModel):
    review:str