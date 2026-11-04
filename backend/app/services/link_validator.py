import validators
import ipaddress
from urllib.parse import urlparse

def validate_url(url):
    if not validators.url(url):
        return False
    
    parsed=urlparse(url)
    
    if parsed.scheme not in ['http','https']:
        return False
    
    if not parsed.hostname:
        return False
    
    return True

def check_suspicious_url(url):
    parsed=urlparse(url)
    
    hostname=parsed.hostname
    
    if not hostname:
        return False
    
    if parsed.username or parsed.password:
        return True
    
    if hostname.lower()=='localhost':
        return True
    
    try:
        ip=ipaddress.ip_address(hostname)
        if not ip.is_global:
            return True
        
    except ValueError:
        pass
    
    return False
 
    
