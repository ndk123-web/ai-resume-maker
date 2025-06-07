import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';

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

// Register Controller
const registerUser = asyncHandler(async (req, res) => {
  const result = loginAndRegisterSchema.safeParse(req.body);

  // if validation fails
  if (!result.success) {
    throw new ApiError(401, 'Invalid Validation for register schema');
  }

  // create method automatically save the user
  const newUserInstance = await User.create({
    username: req.body.username.toLowerCase(),
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.username,
  });

  if (!newUserInstance) {
    throw new ApiError(501, 'Server Not Able to Register the User');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { message: 'Successfully registerd the User !' }));
});

// Sign in Controller
const loginUser = asyncHandler(async (req, res) => {
  const result = loginAndRegisterSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, 'Invalid Validation for Sign in');
  }

  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).select('+password');

  if (!user) {
    throw new ApiError(400, 'Invalid email or username');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Incorrect Password');
  }

  // we need to generate the accessToken and refresh token
  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id);
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, 'Server Unable to generate the accessToken or refresh Token');
  }

  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  loggedInUser.refreshToken = refreshToken;
  await loggedInUser.save();

  // it means that only server can modify the cookie
  // httpOnly : true means that the cookie cannot be accessed by JavaScript in the browser
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
    );
});

export { registerUser, loginUser };
