from api.utils.generateResponse import generate_response
from api.utils.apiResponse import ApiResponse
from api.utils.apiError import ApiError

def handle_resume_creation(payload,user_payload):
    try:
        response = generate_response(prompt=payload.resumePrompt)
        if response:
            return ApiResponse.send(
                200,
                {
                    "user" : user_payload,
                    "message" : "JWT Verified",
                    "gemini_response" : response
                }
            )
        else:
            return ApiError.send(
                statusCode=401,
                message = "Could not verify JWT or GeminiApi Problem",
                data={
                    "userPrompt":payload.resumePrompt}
            )
    except Exception as e:
        print(e)
        return ApiError.send(
            statusCode=500,
            message = "Something went wrong in resume creation",
            data={}
        )