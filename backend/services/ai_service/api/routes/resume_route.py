# ✅ routes/resume_route.py
from fastapi import APIRouter, Request, Depends
from api.middleware.auth_middleware import verifyJWT
from ..utils.apiResponse import ApiResponse
from ..utils.apiError import ApiError

resume_router = APIRouter()

@resume_router.get("/")
def resume():
    return {"resume": "resume"}

@resume_router.get("/create-resume")
async def create_resume(user_payload=Depends(verifyJWT)):
    if "error" in user_payload:
        return {"error": user_payload["error"]}
    
    return ApiResponse.send(
        201,
        {
            "message": "JWT verified ",
            "user": user_payload
        },
    )
