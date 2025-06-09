# This function takes a prompt as a string and generates a response using the Gemini API.
# It first creates a Gemini client using the API key stored in the GEMINI_API_KEY environment variable.
# Then it constructs a final prompt by concatenating the BASE_PROMPT environment variable with the input prompt.
# It uses the Gemini client to generate content using the gemini-2.0-flash model and the final prompt.
# If the request is successful, it returns the generated text as a string.
# If there is an error, it prints the error to the console and raises an HTTPException with a 500 status code.

from google import genai
import os
from fastapi import HTTPException

async def generate_response(prompt: str):
    try:
        # Create a Gemini client using the API key stored in the environment variable.
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        
        # Construct the final prompt by concatenating the BASE_PROMPT environment variable with the input prompt.
        final_prompt = os.getenv("BASE_PROMPT") + prompt
        
        # Use the Gemini client to generate content using the gemini-2.0-flash model and the final prompt.
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=final_prompt
        )
        
        # Print the response to the console.
        print("Response has come: \n")
        # print(response)
        
        # Return the generated text as a string.
        return response.text

    except Exception as e:
        # Print the error to the console.
        print("❌ Gemini Error:", e)
        # Raise an HTTPException with a 500 status code.
        return HTTPException(status_code=500, detail=e)
