from pydantic import BaseModel

class userschema(BaseModel):
    userid:int
    Phno : int
    bank : str
    
class AdminCreate (BaseModel):
    AdminId : int
    role : str
    email : str
    password :str

class Usercreate (BaseModel):
    username : str
    email : str
    address: str
    password :str

class  LoginRequest(BaseModel):
    email : str
    password :str

class StoreCreate(BaseModel):
    storename :str
    address :int
    email :str

class RatingCreate(BaseModel):
    productId:str
    rating:int