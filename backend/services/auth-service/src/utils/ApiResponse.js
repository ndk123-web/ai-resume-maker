class ApiResponse{
    constructor(statusCode ,  data , message = "success" ){
        
        // It automatically creates a new object {} 

        this.statusCode = statusCode
        this.data = data
        this.message = message

        // It automatically returns a new object with this data like {
        //     statusCode : statusCode
        //     data : data
        //     message : message
        // }
    }
}

export { ApiResponse }
