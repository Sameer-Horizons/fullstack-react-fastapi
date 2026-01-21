from fastapi import FastAPI,Depends,Response,status
from sqlalchemy.orm import Session
from . import models, schemas
from fastapi.middleware.cors import CORSMiddleware
from .Db import engine,SessionLocal
from .schemas import userschema
from .auth import auth
from pwdlib import exceptions

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

@app.post("/post")
def add(request: userschema ,db: Session = Depends(get_db)):
    adduser = models.Bank(**request.model_dump())
    db.add(adduser)
    db.commit()
    db.refresh(adduser)
    return {"message": "User created", "user": adduser}

@app.post("/register-admin")
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

@app.post("/register&adduser")
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

# --- Login Logic (Admin) ---
@app.post("/login")
def login(data: schemas.LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(models.AddAdmin).filter(models.AddAdmin.email == data.email).first()
    
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
# --- Login Logic (User) ---
@app.post("/loginuser")
def login(data: schemas.LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(models.AddUser).filter(models.AddUser.email == data.email).first()
    
    if not user:
        return {"success": False, "message": "user not found"}
    try:
        if not auth.verify_pass(data.password, user.password):
            return {"success": False, "message": "Invalid credentials"}
    except exceptions.UnknownHashError:
        
        return {"success": False, "message": "Database error: invalid hash format"}

    token = auth.create_token(user.username)
    
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=7 * 24 * 60 * 60,
        samesite="lax",
        secure=False  
    )
    return {"success": True}
# --- Adding Store ---
@app.post("/add-store")
def add_store(store: schemas.StoreCreate, db: Session = Depends(get_db)):
    
    existing = db.query(models.Addstore).filter( models.Addstore.email == store.email).first()
    if existing:
        return {"success": False, "message": "Email already exists"}

    new_store = models.Addstore(**store.model_dump())

    db.add(new_store)
    db.commit()
    db.refresh(new_store)
    return {"success": True}
    

@app.get("/get-store")
def add_store(db: Session = Depends(get_db)):
    getstore = db.query(models.Addstore).all()
    return getstore

@app.get("/get-users")
def add_store(db: Session = Depends(get_db)):
    getstore = db.query(models.AddUser).all()
    return getstore

# --- Logout ---
@app.post("/logout")
def logout(response: Response):
    response.delete_cookie("token")
    return {"success": True, "message": "Logged out"}

# --- Adding Admin with Cookie ---
@app.post("/adding-admin")
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

# --- Rating Logic ---
@app.post("/rating", status_code=status.HTTP_201_CREATED)
def save_rating(data: schemas.RatingCreate, db: Session = Depends(get_db)):
    existing_rating = db.query(models.rating).filter(models.rating.productId == data.productId).first()
    
    if existing_rating:
        existing_rating.rating = data.rating  # Update existing
        db.commit()
        return {"message": "Rating updated"}
    new_rating = models.rating(productId=data.productId, rating=data.rating)
    db.add(new_rating)
    db.commit()
    return {"message": "Rating saved"}