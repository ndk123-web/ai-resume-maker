// asyncHandler is just the wrapper over the controller function
// so that for each controller function we dont need to write try catch block again and again and again
// this also known as higher order function which returns a function and takes a function as argument

// it returns middleware function
// and we are passing the controller function inside that mddleware
const asyncHandler = (controllerFn) => {
  return async (req, res, next) => {
    return Promise.resolve(controllerFn(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
