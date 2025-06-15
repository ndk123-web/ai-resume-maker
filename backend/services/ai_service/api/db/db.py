# api/utils/db.py

import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ServerSelectionTimeoutError
from pymongo.server_api import ServerApi
from api.utils.apiError import ApiError

# Create global client instance
client = AsyncIOMotorClient(os.getenv("MONGO_DB_URI"), server_api=ServerApi("1"))
db = client["ai-resume"]

async def ping_server():
    try:
        client = AsyncIOMotorClient(os.getenv("MONGO_DB_URI"), server_api=ServerApi("1"))
        db = client["ai-resume"]
        db_instance = await client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB! ", db_instance)
        return True
    except Exception as e:
        print("Error when Ping to Mongo Server: ",str(e))
        return False

