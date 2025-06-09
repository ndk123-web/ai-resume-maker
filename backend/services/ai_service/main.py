from fastapi import FastAPI
from api.routes.resume_route import resume_router
from fastapi.middleware.cors import CORSMiddleware
from api.db.db import ping_server
from api.utils.addMiddlewares import setupMiddlewares
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# setup middlewares
async def set_middlewares():
    await setupMiddlewares(app)   

# Setup DB CONNECTION
@app.on_event("startup")
async def startup_event():
    connected = await ping_server()
    if connected:
        print("✅ Connected to MongoDB successfully!")
    else:
        print("❌ MongoDB connection failed!")


# For Test
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Routes
app.include_router(resume_router, prefix="/api/v1/resumes")
