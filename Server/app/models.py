
from sqlalchemy import TIMESTAMP, Column, Integer, String,Text,ForeignKey
from .database import Base
from sqlalchemy.sql.expression import text


class User(Base):
    __tablename__="users"
    
    id=Column(Integer,primary_key=True,nullable=False)
    name=Column(String,primary_key=False,nullable=False)
    email=Column(String,nullable=False,unique=True)
    created_at=Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    password=Column(String,nullable=False)
    
class Post(Base):
    __tablename__="posts"
    
    id=Column(Integer,primary_key=True,nullable=False)
    review= Column(Text,nullable=False)
    company=Column(String,nullable=False)
    created_at=Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    color=Column(String,nullable=False)
    
    owner_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    
class Like(Base):
    __tablename__="likes"
    
    user_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False,primary_key=True)
    post_id=Column(Integer,ForeignKey("posts.id",ondelete="CASCADE"),nullable=False,primary_key=True)
    
