from fastapi import FastAPI
from core.config import setup_cors
from routes.resume_routes import resume_router
from google import genai
from dotenv import load_dotenv
import os

# it will put all env key value into the enviroment variables
load_dotenv()

client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.0-flash", contents="Explain how AI works in a few words"
)
print("Output: ",response.text)
# My FastAPI App
app = FastAPI()

# All Middlewares settle here 
setup_cors(app)


# different routes will be here  
app.include_router(resume_router, prefix="/api/v1/resume")