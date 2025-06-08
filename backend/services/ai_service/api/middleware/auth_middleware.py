# ✅ middleware/auth_middleware.py
from fastapi import Request
from jose import jwt
import os

def verifyJWT(request: Request):
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        decoded = jwt.decode(token, os.getenv("ACCESS_TOKEN_SECRET"), algorithms=["HS256"])
        return decoded
    except Exception as e:
        return {"error": str(e)}
