from fastapi import APIRouter
from controller.resume_controller import create_resume
from middleware.auth_middleware import verifyJwt
from fastapi import Request , Depends

resume_router = APIRouter()

@resume_router.get("/create-resume")
async def create_resume_helper(user_id :str = Depends(verifyJwt)):   
    
    return create_resume(user_id)