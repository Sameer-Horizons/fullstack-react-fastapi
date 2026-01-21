from fastapi import FastAPI
from sqlalchemy import Column ,Integer,String
from .Db import Base

from pydantic import BaseModel

class Bank(Base):
    __tablename__ = "banks"  

    userid=Column(Integer,primary_key=True,index=True)
    Phno = Column(Integer)
    bank = Column(String)

class AddAdmin(Base):
    __tablename__ = "admins"

    AdminId=Column(Integer,primary_key=True,index=True)
    role = Column(String)
    email = Column(String)
    password= Column(String)

class Addstore(Base):
    __tablename__ = "stores"

    storename = Column(String,primary_key=True,index=True)
    address = Column(Integer)
    email = Column(String)

class AddUser(Base):
    __tablename__ = "Adduser"
    
    username = Column(String,primary_key=True,index=True)
    email = Column(String)
    address = Column(String)
    password =Column(String)

class rating(Base):
    __tablename__ = "rating"

    productId=Column(String,primary_key=True,index=True)
    rating=Column(Integer)