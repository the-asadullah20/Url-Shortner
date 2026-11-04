from fastapi import APIRouter
from app.schemas.user import UserRegister,UserLogin
from app.services.auth import register_user,login_with_password,login_with_google

router=APIRouter(prefix="/auth",tags=["Authentication"])

@router.post("/register")
def register(data:UserRegister):
    return register_user(data.email,data.password)

@router.post("/login")
def login(data:UserLogin):
    return login_with_password(data.email,data.password)

@router.get("/google")
def google_login():
    return {"url":login_with_google()}