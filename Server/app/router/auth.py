
from fastapi import APIRouter,status,Depends,HTTPException
from sqlalchemy.orm import Session
from app import models, oauth2
from app.schemas import SignIn_Creds, SignUp_Creds
from app.database import get_db
from app.utils import validateEmails,utilities
from app.utils.utilities import verify_password

router=APIRouter(
    tags=['Auth']
)

# @router.post('/login')
@router.post("/sign-up",status_code=status.HTTP_201_CREATED)
def create_user(user:SignUp_Creds,db:Session=Depends(get_db)):
    # print("hi")
    # print(user.email,user.name,user)
    
    # now i have the data
    
    #check if password==confirm_password
    if user.password!=user.confirm_password:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail=f"passwords are diffrent")
    
    # confirm the wmail
    # if not validateEmails.validate_email_address(user.email):
    #     raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail=f"invalid email")
    
    # confirm the the user is new
    # user=db.query(models.User).filter(models.User.email==user.email).first()
    
    if utilities.get_user(user.email,db)!=None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"email already exist")
    
    # print("new guy")
    
    # now hash the password
    user.password=utilities.hash_password(user.password)
    
    # add to database
    new_user=models.User(name=user.name,password=user.password,email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # print(new_user.id,new_user.name)
    # access_token=oauth2.create_access_token(data={"user_id":str(new_user.id),"user_name":new_user.name,"token_type":"sign-up"})
    return {"ready_to_login":True}
    

@router.post('/sign-in',status_code=status.HTTP_200_OK)
def login(user:SignIn_Creds,db:Session=Depends(get_db)):
    
    # find email is present old user or new user
    # get user=> returns true if user exist
    user_in_db=utilities.get_user(user.email,db)
    if user_in_db==None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="user doesnt exist,sign-up")
    
    if not utilities.verify_password(user.password,user_in_db.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail=f"Incorrect email or password")
    
    access_token=oauth2.create_access_token(data={"user_id":str(user_in_db.id),"user_name":user_in_db.name})
    
    
    return {"access_token":access_token,"token_type":"bearer"}
    
    
    