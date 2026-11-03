from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.url import URLCreate
from app.services.url_save import create_short_url
from app.services.redirection import redirect_url
from app.services.qr_code import generate_qr_code
import os

router=APIRouter(tags=["URLs"])

@router.post("/shorten")
def shorten_url(data:URLCreate):
    response=create_short_url(str(data.original_url))

    short_url=f"{os.getenv('BASE_URL')}/{response['short_code']}"

    return {
        "short_url":short_url,
        "original_url":str(data.original_url)
    }

@router.get("/qr/{short_code}")
def get_qr_code(short_code:str):
    short_url=f"{os.getenv('BASE_URL')}/{short_code}"
    return StreamingResponse(generate_qr_code(short_url),media_type="image/png")

@router.get("/{short_code}")
def redirect(short_code:str):
    return redirect_url(short_code)

    return StreamingResponse(
        generate_qr_code(short_url),
        media_type="image/png"
    )