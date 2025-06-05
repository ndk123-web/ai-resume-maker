from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app: FastAPI):
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Or specific domain
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
