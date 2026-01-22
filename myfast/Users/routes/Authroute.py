from fastapi import FastAPI, Depends, Response, HTTPException, status,APIRouter
from sqlalchemy.orm import Session
from ..Db import SessionLocal
from .. import models, schemas
from ..auth import auth
from ..Db import get_db
router = APIRouter( tags=["Auth"])
  
app = FastAPI()
@router.post("/register-admin")
def add_register(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    
    existing = db.query(models.AddAdmin).filter(
        (models.AddAdmin.email == admin.email) | (models.AddAdmin.AdminId == admin.AdminId)
    ).first()
    if existing:
        return {"success": False, "message": "Admin already exists"}
    new_admin = models.AddAdmin(
        AdminId=admin.AdminId,
        email=admin.email,
        password=auth.hash_pass(admin.password),
        role="admin"
    )
    db.add(new_admin)
    db.commit()
    return {"success": True, "message": "Admin created successfully"}

@router.post("/register&adduser")
def add_register(admin: schemas.Usercreate, db: Session = Depends(get_db)):
    
    existing = db.query(models.AddUser).filter(
        (models.AddUser.email == admin.email) | (models.AddUser.username == admin.username)
    ).first()
    
    if existing:
        return {"success": False, "message": "Admin already exists"}
    
    user_data = admin.model_dump()
    user_data["password"] = auth.hash_pass(user_data["password"]) 

    new_user = models.AddUser(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"success": True, "message": "User created successfully"}


@router.post("/login")
def login(data: schemas.LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(models.Admins).filter(models.Admins.email == data.email).first()
    if not user or not auth.verify_pass(data.password, user.password):
        return {"success": False, "message": "Invalid credentials"}
    token = auth.create_token(user.AdminId)
    
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=7 * 24 * 60 * 60,
        samesite="lax",
        secure=False  
    )
    return {"success": True}

@router.post("/add-store")
def add_store(store: schemas.StoreCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Addstore).filter( models.Addstore.email == store.email).first()
    if existing:
        return {"success": False, "message": "Email already exists"}

    new_store = models.Addstore(**store.model_dump())
    db.add(new_store)
    db.commit()
    return {"success": True}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("token")
    return {"success": True, "message": "Logged out"}

@router.post("/adding-admin")
def adding_admin(data: schemas.AdminCreate, response: Response, db: Session = Depends(get_db)):
    
    existing = db.query(models.AddAdmin).filter(models.AddAdmin.email == data.email).first()
    if existing:
        return {"success": False, "message": "Admin exist"}

    
    new_admin = models.AddAdmin(
        AdminId=data.AdminId,
        role=data.role,
        email=data.email,
        password=auth.hash_pass(data.password)
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    
    token = auth.create_token(new_admin.AdminId)
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=604800, 
        samesite="lax"
    )
    return {"success": True}

@router.post("/rating", status_code=status.HTTP_201_CREATED)
def save_rating(data: schemas.RatingCreate, db: Session = Depends(get_db)):
    try:
        new_rating = models.Rating(
            productId=data.productId,
            rating=data.rating
        )
        db.add(new_rating)
        db.commit()
        return {"message": "Rating saved"}
    except Exception as e:
        return {"error": "Error saving rating", "message": str(e), "success": False}
