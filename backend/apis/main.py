from fastapi import FastAPI
from weasyprint import HTML 
from jinja2 import Template

app = FastAPI()

@app.get("/")
async def root():
    return {
        "message" : "Hello this is FastAPI"
    }

@app.get("/create-resume")
def create_resume():
    pass 
    