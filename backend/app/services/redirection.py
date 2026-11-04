from fastapi import HTTPException
from fastapi.responses import RedirectResponse
from app.services.database import supabase
from app.services.redis import redis_check,redis_set

def redirect_url(short_code):
    try:
        original_url=redis_check(short_code)

        if not original_url:
            response=supabase.table("urls").select("original_url").eq("short_code",short_code).execute()

            if not response.data:
                raise HTTPException(status_code=404,detail="Short URL not found")

            original_url=response.data[0]["original_url"]
            redis_set(short_code,original_url)

        return RedirectResponse(url=original_url,status_code=302)

    except HTTPException:
        raise
    except Exception as e:
        print(f"Redirection error: {e}")
        raise HTTPException(status_code=500,detail="Unable to redirect")