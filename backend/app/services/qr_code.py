import qrcode
from io import BytesIO

def generate_qr_code(short_url):
    qr=qrcode.make(short_url)
    buffer=BytesIO()
    qr.save(buffer,format='PNG')
    buffer.seek(0)
    return buffer
