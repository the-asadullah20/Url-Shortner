import os
from dotenv import load_dotenv
from upstash_redis import Redis

load_dotenv()

redis_client=Redis(
    url=os.getenv("UPSTASH_REDIS_REST_URL"),
    token=os.getenv("UPSTASH_REDIS_REST_TOKEN")
)

def redis_check(key):
    try:
        return redis_client.get(key)
    except Exception as e:
        print(f"Redis GET error: {e}")
        return None

def redis_set(key,value,expiry=3600):
    try:
        redis_client.set(key,value,ex=expiry)
        return True
    except Exception as e:
        print(f"Redis SET error: {e}")
        return False