import app
from fastapi import status,APIRouter,Depends,HTTPException
from app import models
from app.database import get_db
from sqlalchemy.orm import Session
from app import oauth2
from app.schemas import Review
from app.utils.utilities import extract_review_and_company, get_random_color


router=APIRouter(
    tags=['feed'],
    prefix="/feed"
)

# @router.get("/",status_code=status.HTTP_200_OK)
# def get_feed(db:Session=Depends(get_db),get_current_user:int=Depends(oauth2.get_current_user1)):
#     # print("current user : ",get_current_user)
    
#     # i should return few things
#     # company,review, no of likes, did present user liked it or not
#     sending_data={
#         "post_id":-1,
#         "post_likes":-1,
#         "post_comapny":"",
#         "post_review":"",
#         "post_liked_by_user":False
#     }
#     feed=[]
    
#     posts=db.query(models.Post).all()
    
#     for post in posts:
#         post_data={
#             "post_id":post.id,
#             "post_company":post.company,
#             "post_review":post.review,
#             "post_owner_id":post.owner_id,
#             "post_created_at":post.created_at,
#             "post_no_of_likes":-1,
#             "post_liked_by_current_user":False,
#         }
        
#         likes=db.query(models.Like).filter(models.Like.post_id==post.id).all()
#         post_data["post_no_of_likes"]=len(likes)
        
#         certain_like=db.query(models.Like).filter(models.Like.post_id==post.id,models.Like.user_id==get_current_user.id).first()
        
#         if certain_like:
#             post_data["post_liked_by_current_user"]=True
        
#         feed.append(post_data)

#     # print("take this feed")
#     return feed

@router.get("/", status_code=status.HTTP_200_OK)
def get_feed(db: Session = Depends(get_db), get_current_user: int = Depends(oauth2.get_current_user1)):
    feed = []
    
    
    posts = db.query(models.Post).all()
    
    for post in posts:
        post_data = {
            "post_id": post.id,
            "post_company": post.company,
            "post_review": post.review,
            "post_owner_id": post.owner_id,
            "post_created_at": post.created_at,
            "post_no_of_likes": db.query(models.Like).filter(models.Like.post_id == post.id).count(),
            "post_liked_by_current_user": db.query(models.Like).filter(models.Like.post_id == post.id, models.Like.user_id == get_current_user.id).first() is not None,
            "post_random_color":post.color
        }
        
        feed.append(post_data)

    return feed

@router.post("/upload",status_code=status.HTTP_200_OK)
def upload_my_feed(review:Review,db: Session = Depends(get_db), get_current_user: int = Depends(oauth2.get_current_user1)):
    
    print()
    #  format :  review, #company
    '''
     {
        "fulltext":"the coffe was bitter #starbucks"
     }
     from this extract both 
     
    '''
    review,company=extract_review_and_company(review.review)
    
    if review==None or company ==None:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,detail=f"review is not of form required")
    
    
    new_review=models.Post(review=review,company=company,owner_id=get_current_user.id,color=get_random_color())
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    
    return {"uploaded":True}


@router.get("/{company}",status_code=status.HTTP_200_OK)
def get_certain_comapny(company:str,db: Session = Depends(get_db), get_current_user: int = Depends(oauth2.get_current_user1)):
    print()
    posts = db.query(models.Post).filter(models.Post.company==company).all()
    
    # print(get_random_color(),"hi")
    
    if not posts:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"{company} reviews are not found ")
    
    feed = []
    for post in posts:
        post_data = {
            "post_id": post.id,
            "post_company": post.company,
            "post_review": post.review,
            "post_owner_id": post.owner_id,
            "post_created_at": post.created_at,
            "post_no_of_likes": db.query(models.Like).filter(models.Like.post_id == post.id).count(),
            "post_liked_by_current_user": db.query(models.Like).filter(models.Like.post_id == post.id, models.Like.user_id == get_current_user.id).first() is not None,
            "post_random_color":post.color
        }
        
        # print(post_data["post_random_color"])
        
        feed.append(post_data)
        
    return feed
    
    
@router.post("/upvote/{post_id}",status_code=status.HTTP_200_OK)
def upvote(post_id:int,db: Session = Depends(get_db), get_current_user: int = Depends(oauth2.get_current_user1)):
    print()
    
    like=db.query(models.Like).filter(models.Like.post_id==post_id,models.Like.user_id==get_current_user.id).first()
    
    if like:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=f"already liked")
    
    new_like=models.Like(post_id=post_id,user_id=get_current_user.id)
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    
    return {"liked":True}


    