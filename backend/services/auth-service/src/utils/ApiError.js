class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = '') {
    
    // it calls the ApiError Constructor so that we can get the Ability to use the Error Class
    // Example -> new ApiError(404, 'Not Found') 
    super(message);
    
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Automatically returns a new object with this data like {
    //     statusCode : statusCode
    //     success : false
    //     errors : errors
    //     stack : stack
    // }

  }
}

export { ApiError };
