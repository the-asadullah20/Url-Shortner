from app.services.database import supabase
from app.services.convert_to_short_code import generate_short_code

def check_collision(short_code):
    response=supabase.table('urls').select('short_code').eq('short_code',short_code).execute()
    return len(response.data) > 0

def resolve_collision(num_of_tries=10):
    for i in range(num_of_tries):
        short_code=generate_short_code()
        response=supabase.table('urls').select('short_code').eq('short_code',short_code).execute()
        if not check_collision(short_code):
            return short_code
        
    raise Exception('unable to generate the shorturl')
        