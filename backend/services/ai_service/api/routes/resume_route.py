# ✅ routes/resume_route.py
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from api.middleware.auth_middleware import verifyJWT
from api.utils.apiResponse import ApiResponse
from api.utils.apiError import ApiError
from api.controller.resume_controller import handle_resume_creation

resume_router = APIRouter()

@resume_router.get("/")
def resume():
    return {"resumes": "resumes"}


class Resume(BaseModel):
    resumePrompt: str

@resume_router.post("/create-resume")
async def create_resume(payload: Resume , user_payload=Depends(verifyJWT)):
    if "error" in user_payload:
        return {"error": user_payload["error"]}

    try:
        print("before handle_resume_creation")
        file_path = await handle_resume_creation(user_prompt=payload, user_payload=user_payload)
        print("After handle_resume_creation")
        print("User Prompt: ",payload.resumePrompt)

        if not file_path:
            return ApiError.send(statusCode=500,message="Failed to create resume",data=[])

        return ApiResponse.send(
            201,
            {
                "message": "JWT verified ",
                "user": user_payload,
                "file_path": file_path
            },
        )

    except Exception as e:
        return ApiError.send(
            statusCode=500,
            message=str(e),
            data={"error": str(e)}
        )


