import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const userRouter = Router();

// for register we dont need jwt middlewar
userRouter.post('/register-user', registerUser);
userRouter.post('/login-user', loginUser);

export { userRouter };
