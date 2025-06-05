
from fastapi import Request

def verifyJwt(req : Request):
    
    token = req.headers.get("Authorization")
    if not token:
        return "False"
    
    # jwt logic will be here 
    return "True" 