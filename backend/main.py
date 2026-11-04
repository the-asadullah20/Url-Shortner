from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from app.endpoints import auth, health, urls

app = FastAPI(title="Linqo API", version="1.0.0")


def _frontend_origins() -> list[str]:
    """Browser origins allowed to call the API. Wildcard + credentials is rejected by browsers."""
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ]
    frontend_url = (os.getenv("FRONTEND_URL") or "").strip().rstrip("/")
    if frontend_url:
        origins.append(frontend_url)
    extra = os.getenv("FRONTEND_ORIGINS") or ""
    origins.extend(origin.strip().rstrip("/") for origin in extra.split(",") if origin.strip())
    return list(dict.fromkeys(origins))


# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=_frontend_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(health.router)
app.include_router(urls.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
