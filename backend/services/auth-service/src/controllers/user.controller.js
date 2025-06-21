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
    title: (prompts.length > 0 && prompts[0].userPrompt.substring(0, 15)) || 'New Chat',
    createdAt: new Date(),
  });

  console.log('New Chat Session: ', newChatSession);

  if (!newChatSession) {
    throw new ApiError(400, 'Chat Session Not created');
  }

  res.status(200).json(new ApiResponse(200, prompts, 'Created Chat Session successfully'));
});

const getUserChatHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log('Firebase User in ChatHistory: ', user);

  const existUser = await User.findOne({ uid: user.uid });
  if (!existUser) {
    throw new ApiError(400, 'User Not registered');
  }

  // 1. Get all sessions of the user
  const sessions = await chatSession.find({ user: existUser._id });

  // 2. Loop through sessions, get associated prompts
  const history = await Promise.all(
    sessions.map(async (session) => {
      const prompts = await Prompt.find({ sessionId: session.sessionId, user: existUser._id }).sort(
        { createdAt: 1 },
      );

      if (prompts.length === 0) return null; // skip empty sessions

      return {
        sessionId: session.sessionId,
        title: session.title || 'Untitled Chat',
        lastPrompt: prompts[0].userPrompt,
        lastResponse: prompts[0].userResponse,
        createdAt: prompts[0].createdAt,
        updatedAt: prompts[0].updatedAt,
      };
    }),
  );

  // 3. Filter out null values (empty sessions)
  const filteredHistory = history.filter(Boolean);

  res.status(200).json(new ApiResponse(200, filteredHistory, 'Filtered Chat History with Prompts'));
});

const getCurrentSessionChats = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log('Firebase User in getCurrentSessionChats: ', user);
  const { sessionId } = req.body;
  console.log('SessionId in getCurrentSessionChats: ', sessionId);

  const existUser = await User.findOne({ uid: user.uid });
  if (!existUser) {
    throw new ApiError(400, 'User Not registered');
  }

  const currentSessionChats = await Prompt.find({
    $and: [{ user: existUser._id }, { sessionId: sessionId }],
  });

  if (!currentSessionChats) {
    throw new ApiError(400, 'Chat Session Not created');
  }

  console.log('Current Session Chats: ', currentSessionChats);

  res
    .status(200)
    .json(new ApiResponse(200, currentSessionChats, 'Succcessfully fetched Current Session Chats'));
});

const deleteChat = asyncHandler(async (req, res) => {
  const user = req.user;
  const { sessionId } = req.query;

  const existUser = await User.findOne({ uid: user.uid });
  if (!existUser) {
    throw new ApiError(400, 'User Not registered');
  }

  const deleteSession = await chatSession.findOneAndDelete({
    $and: [{ user: existUser._id }, { sessionId: sessionId }],
  });

  if (!deleteSession) {
    throw new ApiError(400, 'Chat Session Not deleted');
  }

  const deletePrompts = await Prompt.deleteMany({
    $and: [{ user: existUser._id }, { sessionId: sessionId }],
  });

  if (!deletePrompts) {
    throw new ApiError(400, 'Chat Session Not deleted');
  }

  console.log('Deleted Chat Session: ', deleteSession);

  res.status(200).json(new ApiResponse(200, deleteSession, 'Succcessfully deleted Chat Session'));
});

export {
  registerUser,
  loginUser,
  deleteChat,
  createChatSession,
  getUserChatHistory,
  getCurrentSessionChats,
};
