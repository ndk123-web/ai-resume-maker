from fastapi import APIRouter , Request

resume_router = APIRouter()

@resume_router.get("/")
def resume():
    return {"resume": "resume"}

@resume_router.post("/create-resume")
def create_resume(request: Request):
    pass