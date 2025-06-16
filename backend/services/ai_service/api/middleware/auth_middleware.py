# ✅ middleware/auth_middleware.py
from fastapi import Request
from jose import jwt
import os
from firebase_admin import auth
from api.utils.apiError import ApiError
from api.utils.apiResponse import ApiResponse

async def verifyJWT(request: Request):
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        if not token:
            return ApiError.send(
                statusCode=401,
                data = {},
                message = "Token Not Found"
            )
            
        decoded = auth.verify_id_token(token)
        if not decoded:
            return ApiError.send(
                401,
                data={},
                message="Invalid Token"
            )
        
        print("Verify By Firebase: ",decoded)
        return decoded
    except Exception as e:
        return {"error": str(e)}
