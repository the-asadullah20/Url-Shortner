from app.services.convert_to_short_code import convert_to_short_code
from app.services.collision import check_collision,resolve_collision
from app.services.database import supabase
import secrets

def create_short_url(original_url):
    number=secrets.randbelow(62**6)
    short_code=convert_to_short_code(number)

    if check_collision(short_code):
        short_code=resolve_collision()

    response=supabase.table("urls").insert({
        "original_url":original_url,
        "short_code":short_code
    }).execute()

    return response.data[0]