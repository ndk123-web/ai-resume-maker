import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../model/user.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// we need to rotate the token at each request to avoid token expiration

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies.accessToken || req.headers['authorization']?.replace('Bearer ', '');
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    throw new ApiError(401, 'Unauthorized Access');
  }

  try {
    // First verify the access token
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedAccessToken._id).select('-password');

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Check if access token is about to expire (e.g., within 5 minutes)
    const tokenExpiryTime = decodedAccessToken.exp * 1000;
    const currentTime = Date.now();

    if (tokenExpiryTime - currentTime < 5 * 60 * 1000) {
      // Verify refresh token before rotating
      if (!refreshToken || !user.refreshToken) {
        throw new ApiError(401, 'Invalid refresh token');
      }

      // Verify if provided refresh token matches stored one
      if (refreshToken !== user.refreshToken) {
        // If mismatch, possible token reuse attack
        user.refreshToken = null; // Invalidate all refresh tokens
        await user.save({ validateBeforeSave: false });
        throw new ApiError(401, 'Possible token reuse detected');
      }

      // Generate new token pair
      const newAccessToken = user.generateAccessToken();
      const newRefreshToken = user.generateRefreshToken();

      // Update refresh token in DB (rotation)
      user.refreshToken = newRefreshToken;
      await user.save({ validateBeforeSave: false });

      // Set new cookies
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      console.log('Tokens rotated successfully');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token expired');
    }
    throw new ApiError(401, 'Invalid token');
  }
});
