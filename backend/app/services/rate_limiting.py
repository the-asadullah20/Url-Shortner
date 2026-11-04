from fastapi import HTTPException
from app.services.redis import redis_client

def check_rate_limit(ip,limit=10,window=60):
    key=f"rate_limit:{ip}"

    try:
        count=redis_client.incr(key)

        if count==1:
            redis_client.expire(key,window)

        if count>limit:
            raise HTTPException(status_code=429,detail="Too many requests")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Rate limiting error: {e}")
        raise HTTPException(status_code=503,detail="Rate limiting service unavailable")