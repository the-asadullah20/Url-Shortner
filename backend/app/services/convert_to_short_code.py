import string
import secrets

CHARACTERS=string.ascii_letters+string.digits
BASE=len(CHARACTERS)

def convert_to_short_code(number):
    if number==0:
        return CHARACTERS[0]

    short_code=""

    while number>0:
        remainder=number%BASE
        short_code=CHARACTERS[remainder]+short_code
        number=number//BASE

    return short_code

def generate_short_code():
    number=secrets.randbelow(62**6)
    return convert_to_short_code(number)

