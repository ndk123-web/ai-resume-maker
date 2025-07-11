import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';

import admin from '../utils/firebase.js';

// we need to rotate the token at each request to avoid token expiration

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Unauthorized');
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log("Decoded: ", decoded);
    if (!decoded) {
      throw new ApiError(401, 'Access Tpken Expired or invalid');
    }

    req.user = decoded;
    next();
  } catch (err) {
    throw ApiError(500, err.message);
  }
});

export { verifyJWT };
