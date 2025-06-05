from fastapi import APIRouter
from controller.resume_controller import create_resume
from middleware.auth_middleware import verifyJwt
from fastapi import Request

resume_router = APIRouter()

@resume_router.get("/create-resume")
async def create_resume_helper(req : Request):   
    
    try:
        if verifyJwt(req):
            return {
                "message" : "authorized"
            }
        else:
            return {
                "message" : "unauthorized"
            }
    except Exception as e:
        return e
    
    return create_resume()