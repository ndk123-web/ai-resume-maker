from api.utils.generateResponse import generate_response
from api.utils.apiResponse import ApiResponse
from api.utils.apiError import ApiError
import os
import re
from weasyprint import HTML

async def handle_resume_creation(user_prompt, user_payload):

    print("Resume Creation Begin")

    response = generate_response(prompt=user_prompt.resumePrompt)
    if not response:
        # Raise an exception, don't return ApiError.send()
        raise Exception("Could not verify JWT or GeminiApi Problem")

    print("PDF FIle Creation Begin")
    file_path =await handle_pdf_creation(response, user_payload)
    print("PDF FIle Creation Ends")

    print("Resume Creation Ends")

    return file_path


def handle_extract_html_string(response):
    print("Regex FIle Creation Begin")

    match = re.search(r"```html\n(.*?)```", response, re.DOTALL)
    if match:
        print("PDF FIle Creation Ends")
        return match.group(1).strip()
    # If HTML not found, raise exception or return empty string
    # You can choose which fits better
    raise Exception("HTML content not found in response")

async def handle_pdf_creation(response, user_payload):
    filename = user_payload['username'] + ".pdf"
    folder_path = os.path.join("api","public","resumes")

    os.makedirs(folder_path, exist_ok=True)

    file_path = os.path.join(folder_path, filename)

    html_content =  handle_extract_html_string(response)
    print("Weasy Print Started FIle Creation Begin")

    # Do not Write here await i spent 1 hour to debug this shit
    HTML(string=html_content).write_pdf(file_path)
    print("Weasy Print Started FIle Creation Ends")

    return file_path
