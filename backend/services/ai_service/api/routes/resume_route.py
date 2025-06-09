import os

from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from api.middleware.auth_middleware import verifyJWT
from api.utils.apiResponse import ApiResponse
from api.utils.apiError import ApiError
from api.controller.resume_controller import handle_resume_creation
from fastapi.responses import FileResponse
from api.utils.generateResponse import generate_response

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

        print("User Prompt: ",payload.resumePrompt)

        is_want_pdf_prompt = os.getenv("IS_WANT_PDF_PROMPT") + payload.resumePrompt
        is_want_pdf_response = await generate_response(is_want_pdf_prompt.strip().lower())

        print("First Final Prompt: ",is_want_pdf_prompt)
        print("First Final Response: ",is_want_pdf_response)

        if is_want_pdf_response.splitlines()[0].strip().lower() == "no":
            return ApiResponse.send(
                statusCode=200,
                message="Normal Response",
                data={"response": is_want_pdf_response[3:].lower().strip()}
            )

        else:

            file_path = await handle_resume_creation(user_prompt=payload, user_payload=user_payload)
            print("User Prompt: ",payload.resumePrompt)

            if not file_path:
                return ApiError.send(statusCode=500,message="Failed to create resume",data=[])

            return FileResponse(file_path,media_type="application/pdf")


    except Exception as e:
        return ApiError.send(
            statusCode=500,
            message=str(e),
            data={"error": str(e)}
        )


