Some FastAPI and Python Concepts for understanding the code
Absoluet and Relaitve Path pydantic types Request JSONResponse Response Depends APIRouter

from fastapi import FastAPI

## FastAPI 

1. `Pydantic ` : 
   - It Automatically Verify the Body Data which came from the `POST/PUT/PATCH`
   - Ex: 
     ```python 
     from pydantic import BaseModel
     from fastapi import FastAPI
     
     class bodyData(BaseModel):
        name : str 
        age : int 
     
     app = FastAPI()
     
     @app.post('/getData')
     def bodyFN(bodyData: bodyData):
        return {
            "name" : bodyData.name,
            "age" : bodyData.age     
        }
     ```

   2. `Type` : 
       - We can declare which type it should 
       - It is also the validation like pydantic
       - But FastAPI is more works with pydantic 
       - Ex:
         ```python
         def fullName(fname : str , lname : str):
            return fname + " " + lname
         
         fname = "ndk"
         lname = "kdm"
         
         fullnamee = fullName(fname,lname)
         print(fullnamee)
         ```