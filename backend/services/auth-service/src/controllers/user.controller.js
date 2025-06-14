import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { Prompt } from '../models/prompt.model.js';
import { chatSession } from '../models/chatsession.model.js';

// use of zod here for validation
const loginAndRegisterSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email('Invalid Email'),
  password: z.string().min(6),
});

const generateAccessTokenRefreshToken = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "Did't find userId");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, 'User not Found in DB');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, 'Server Unable to generate the accessToken or refresh Token');
  }

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const firebaseUser = req.user; // from verifyJWT middleware
  console.log('Firebase User: ', firebaseUser);

  // Check if user already exists
  const existingUser = await User.findOne({ uid: firebaseUser.uid });
  if (existingUser) {
    throw new ApiError(400, 'User already registered');
  }

  // Create a new user in MongoDB
  const newUser = await User.create({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    fullname: firebaseUser.name || firebaseUser.email.split('@')[0],
    avatar: firebaseUser.picture || '',
    provider: firebaseUser.firebase.sign_in_provider,
  });

  res.status(201).json(new ApiResponse(201, newUser, 'User registered successfully'));
});

// Sign in Controller
const loginUser = asyncHandler(async (req, res) => {
  const firebaseUser = req.user; // from verifyJWT middleware
  console.log('Firebase User: ', firebaseUser);

  // Check if user already exists
  const existingUser = await User.findOne({ uid: firebaseUser.uid });
  if (!existingUser) {
    throw new ApiError(400, 'User Not registered');
  }

  res.status(201).json(new ApiResponse(201, existingUser, 'User Login successfully'));
});

const createChatSession = asyncHandler(async (req, res) => {
  const user = req.user; // from verifyJWT
  console.log('Firebase User: ', user);

  const { sessionId } = req.body;

  const existingUser = await User.findOne({ uid: user.uid });
  if (!existingUser) {
    throw new ApiError(400, 'User Not registered');
  }

  const existUniqueChatSession = await chatSession.find({
    $and: [{ user: existingUser._id }, { sessionId: sessionId }],
  });

  if (existUniqueChatSession.length > 0) {
    throw new ApiError(400, 'Chat Session already exist');
  }

  const prompts = await Prompt.find({
    $and: [{ user: existingUser._id }, { sessionId: sessionId }],
  });

  const newChatSession = await chatSession.create({
    user: existingUser._id,
    sessionId: sessionId,
    title: (prompts.length > 0 && prompts[0].userPrompt.substring(0, 15)) || 'untitled',
  });

  console.log('New Chat Session: ', newChatSession);

  if (!newChatSession) {
    throw new ApiError(400, 'Chat Session Not created');
  }

  res.status(200).json(new ApiResponse(200, newChatSession, 'Created Chat Session successfully'));
});

const getUserChatHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log('Firebase User in ChatHistory: ', user);

  const existUser = await User.findOne({ uid: user.uid });
  if (!existUser) {
    throw new ApiError(400, 'User Not registered');
  }

  const chatHistory = await chatSession.find({ user: existUser._id });

  res.status(200).json(new ApiResponse(200, chatHistory, 'Chat History'));
});

export { registerUser, loginUser, createChatSession, getUserChatHistory };
