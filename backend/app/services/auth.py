import os

from fastapi import HTTPException

from app.services.database import supabase


def _as_dict(value):
    if value is None:
        return None
    if isinstance(value, dict):
        return value
    if hasattr(value, "model_dump"):
        return value.model_dump()
    if hasattr(value, "dict"):
        return value.dict()
    return None


def public_auth_response(response):
    """Shape Supabase auth objects into the JSON the frontend already reads."""
    data = _as_dict(response) or {}
    user = data.get("user") if isinstance(data.get("user"), dict) else _as_dict(getattr(response, "user", None))
    session = data.get("session") if isinstance(data.get("session"), dict) else _as_dict(getattr(response, "session", None))
    user = user or {}
    session = session or {}
    user_id = user.get("id")
    email = user.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Authentication did not return a user email")
    return {
        "user": {
            "id": str(user_id) if user_id else None,
            "email": email,
        },
        "access_token": session.get("access_token"),
        "refresh_token": session.get("refresh_token"),
        "token_type": session.get("token_type") or "bearer",
    }


def register_user(email, password):
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
        return public_auth_response(response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def login_with_password(email, password):
    try:
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        return public_auth_response(response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def login_with_google():
    try:
        redirect_to = (os.getenv("FRONTEND_URL") or "http://localhost:5173").rstrip("/")
        response = supabase.auth.sign_in_with_oauth(
            {
                "provider": "google",
                "options": {"redirect_to": redirect_to},
            }
        )
        url = getattr(response, "url", None)
        if not url and isinstance(response, dict):
            url = response.get("url")
        if not url:
            raise HTTPException(status_code=500, detail="Google sign-in URL was not returned")
        return url
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    