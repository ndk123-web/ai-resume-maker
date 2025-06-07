import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';

// we need to rotate the token at each request to avoid token expiration

const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.headers['Authorization'].replace('Bearer ', '') ||
    req.cookies.accessToken.replace('Bearer ', '');
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, 'Access Token not Found');
  }

  try {
    const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    const userId = decoded._id;

    const isExistUser = await User.findById(userId).select('-password');

    if (!isExistUser) {
      throw new ApiError(401, 'User Not Exist');
    }

    // add the user in req object
    req.user = isExistUser;

    // now run further middleware or controller
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(400, 'User Access Token has been expired');
    }
    throw new ApiError(400, err.message);
  }
});

export { verifyJWT };
