import os
import re
from api.utils.cloudinary import upload_image_from_url

from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from api.middleware.auth_middleware import verifyJWT
from api.utils.apiResponse import ApiResponse
from api.utils.apiError import ApiError
from api.controller.resume_controller import handle_resume_creation
from fastapi.responses import FileResponse
from api.utils.generateResponse import generate_response
from api.db.db import db 
from datetime import datetime
from bson import ObjectId

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
        
        prompt_collection = db['prompts']
        # Print the user prompt
        print("User Prompt: ",payload.resumePrompt)

        # Generate a prompt to ask the AI if it wants to create a resume
        is_want_pdf_prompt = os.getenv("IS_WANT_PDF_PROMPT") + payload.resumePrompt
        print("First Final Prompt: ",is_want_pdf_prompt)

        # Get the AI response
        is_want_pdf_response = await generate_response(is_want_pdf_prompt.strip().lower())
        print("First Final Response: ",is_want_pdf_response)

        # If the AI response is "no", return a normal response
        
        match = re.search(r"(yes|no)", is_want_pdf_response.strip().lower())
        decision = match.group(1) if match else None
        
        print("Decision: ",decision)
        
        if decision.strip().lower() == "no":
            
            userId = "684490318f5df116072f5feb"
            sessionId = "df1"
            
            insertPrompt = prompt_collection.insert_one({
                "user" : ObjectId(userId),
                "userPrompt" : payload.resumePrompt,
                "userResponse": is_want_pdf_response[3:].lower().strip(),
                "sessionId" : sessionId,
                "resumeUrl" : "",
                "createdAt" : datetime.now(),
                "updatedAt" : datetime.now()
            })
            
            print("Insert Prompt: ",insertPrompt)

            return ApiResponse.send(
                statusCode=200,
                message="Normal Response and Successsfully Inserted the Prompt in DB",
                data={"response": is_want_pdf_response[3:].lower().strip()}
            )

        # If the AI response is "yes", create a resume
        else:
            # Call the controller to create the resume
            file_path = await handle_resume_creation(user_prompt=payload, user_payload=user_payload)

            # If the controller returns an error, return it
            if not file_path:
                return ApiError.send(statusCode=500,message="Failed to create resume",data=[])
            
            cloud_url_path = await upload_image_from_url(file_path,user_payload["name"] + ".pdf")
            print("File Path: ",file_path)
            
            if not cloud_url_path:
                return ApiError.send(statusCode=500,message="Failed to upload resume to cloud",data=[])
            
            userId = "684490318f5df116072f5feb"
            sessionId = "df1"
            
            insertPrompt = prompt_collection.insert_one({
                "user" : ObjectId(userId),
                "userPrompt" : payload.resumePrompt,
                "userResponse": is_want_pdf_response[4:].lower().strip(),
                "sessionId" : sessionId,
                "resumeUrl" : cloud_url_path,
                "createdAt" : datetime.now(),
                "updatedAt" : datetime.now()
            })
            
            if not insertPrompt:
                return ApiError.send(statusCode=500,message="Failed to insert prompt in DB",data=[])
            
            # If the controller returns a file path, return it as a file response
            # return FileResponse(file_path,media_type="application/pdf")
            
            return ApiResponse.send(
                200,
                {
                    "cloudFileUrl": cloud_url_path,
                    "response": is_want_pdf_response.lower().strip()
                },
                "Successfully Inserted the Prompt in DB"
            )


    except Exception as e:
        # Catch any other exceptions and return an error
        return ApiError.send(
            statusCode=500,
            message=str(e),
            data={"error": str(e)}
        )


@resume_router.get("/test-jwt")
async def testJwt(user_payload=Depends(verifyJWT)):
    # print("User Payload: ",user_payload)
    return ApiResponse.send(
        200,
        data=user_payload,
        message="Successfully verify the data"
    )