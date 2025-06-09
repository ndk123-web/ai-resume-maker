from google import genai
import os
from fastapi import HTTPException

def generate_response(prompt: str):
    try:
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

        final_prompt = os.getenv("BASE_PROMPT") + prompt

        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=final_prompt
        )
        print("Response has come: \n")
        # print(response)
        return response.text

    except Exception as e:
        print("❌ Gemini Error:", e)
        return HTTPException(status_code=500,detail=e)