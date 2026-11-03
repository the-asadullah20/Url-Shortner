from fastapi import APIRouter,HTTPException,status

from supabase import Client
from app.services.database import supabase
from app.schemas.user import UserRegister,UserLogin

def register_user(email,password):
    try:
        response=supabase.auth.sign_up({'email':email,'password':password})
        return response
    except Exception as e:
        raise HTTPException(status_code=400,details=str(e))
    

def login_with_password(email,password):
    try:
        response=supabase.auth.sign_in_with_password({'email':email,'password':password})
        return response
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))
    
def login_with_google(email=None):
    try:
        response=supabase.auth.sign_in_with_oauth({'provider':'google'})
        return response.url
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))
    
    