import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const userRouter = Router();

userRouter.get('/', verifyJWT, (req, res) => {
  return res.status(200).json(new ApiResponse(200, { user: "Successfully it api/v1/users" }, 'Success'));
});

export { userRouter };
