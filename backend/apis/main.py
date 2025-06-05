from typing import Union
from fastapi import FastAPI
from core.config import setup_cors
from routes.resume_routes import resume_router

app = FastAPI()

# All Middlewares settle here 
setup_cors(app)

# different routes will be here  
app.include_router(resume_router, prefix="/api/v1/resume")