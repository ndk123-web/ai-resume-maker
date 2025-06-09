import os

from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from api.middleware.auth_middleware import verifyJWT
from api.utils.apiResponse import ApiResponse
from api.utils.apiError import ApiError
from api.controller.resume_controller import handle_resume_creation
from fastapi.responses import FileResponse
from api.utils.generateResponse import generate_response

# Define API router for resume endpoints
resume_router = APIRouter()

# Define a simple endpoint to test the API
@resume_router.get("/")
def resume():
    return {"resumes": "resumes"}


# Define a pydantic model to represent the resume prompt
class Resume(BaseModel):
    resumePrompt: str

# Define an endpoint to create a resume
@resume_router.post("/create-resume")
async def create_resume(
    # Use the pydantic model to validate the request body
    payload: Resume,
    # Use the middleware to verify the JWT token
    user_payload=Depends(verifyJWT)
):
    # If the middleware returns an error, return it
    if "error" in user_payload:
        return {"error": user_payload["error"]}

    try:
        # Print the user prompt
        print("User Prompt: ",payload.resumePrompt)

        # Generate a prompt to ask the AI if it wants to create a resume
        is_want_pdf_prompt = os.getenv("IS_WANT_PDF_PROMPT") + payload.resumePrompt
        print("First Final Prompt: ",is_want_pdf_prompt)

        # Get the AI response
        is_want_pdf_response = await generate_response(is_want_pdf_prompt.strip().lower())
        print("First Final Response: ",is_want_pdf_response)

        # If the AI response is "no", return a normal response
        if is_want_pdf_response.splitlines()[0].strip().lower() == "no":
            return ApiResponse.send(
                statusCode=200,
                message="Normal Response",
                data={"response": is_want_pdf_response[3:].lower().strip()}
            )

        # If the AI response is "yes", create a resume
        else:
            # Call the controller to create the resume
            file_path = await handle_resume_creation(user_prompt=payload, user_payload=user_payload)

            # If the controller returns an error, return it
            if not file_path:
                return ApiError.send(statusCode=500,message="Failed to create resume",data=[])

            # If the controller returns a file path, return it as a file response
            return FileResponse(file_path,media_type="application/pdf")


    except Exception as e:
        # Catch any other exceptions and return an error
        return ApiError.send(
            statusCode=500,
            message=str(e),
            data={"error": str(e)}
        )

