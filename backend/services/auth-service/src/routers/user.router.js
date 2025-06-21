import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  registerUser,
  loginUser,
  createChatSession,
  getUserChatHistory,
  getCurrentSessionChats,
  deleteChat
} from '../controllers/user.controller.js';

const userRouter = Router();

// for register we dont need jwt middlewar
userRouter.post('/register-user', verifyJWT, registerUser);
userRouter.post('/login-user', verifyJWT, loginUser);
userRouter.post('/create-chat-session', verifyJWT, createChatSession);
userRouter.get('/get-user-chat-history', verifyJWT, getUserChatHistory);
userRouter.post('/get-current-session-chats', verifyJWT, getCurrentSessionChats);
userRouter.delete('/delete-chat',verifyJWT, deleteChat)

// testing jwt
userRouter.get('/test', verifyJWT, (req, res) => {
  return res.status(200).json(new ApiResponse(200, { message: 'Jwt verified' }));
});

export { userRouter };
