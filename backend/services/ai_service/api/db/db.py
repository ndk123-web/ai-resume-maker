import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
import os 

async def ping_server():

  client = AsyncIOMotorClient(os.getenv("MONGO_DB_URI"), server_api=ServerApi('1'))

  try:
      dbInstance = await client.admin.command('ping')
      print("Pinged your deployment. You successfully connected to MongoDB! ", dbInstance)
      return True  
  except Exception as e:
      print(e)
      return False
      
async def get_collection():
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"), server_api=ServerApi('1'))
    collections = await client['ai-resume'].list_collection_names()
    print("Collections: ",collections)
    return collections

async def get_users_data():
    cluseter = AsyncIOMotorClient(os.getenv("MONGO_URI"), server_api=ServerApi('1'))
    db = cluseter['ai-resume']
    collection = db['users']
    
    cursor = collection.find()
    users = []
    
    async for document in cursor:
        document['_id'] = str(document['_id'])
        users.append(document)
    
    print("Users: ",users)
    return users 
    