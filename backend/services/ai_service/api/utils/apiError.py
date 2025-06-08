
from fastapi.responses import JSONResponse

class ApiError: 
    @staticmethod
    def send(statusCode,data,message="Failed"):        
        return JSONResponse(
            status_code=statusCode,
            content={
                "statusCode": statusCode,
                "data": data,
                "message": message
            }
        )