from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message" : 'This is Root'
    }

# Need to Setup middlewares

# Need to Setup database initialization

# Need to setup routes here