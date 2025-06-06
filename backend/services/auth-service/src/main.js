import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApiError } from './utils/ApiError';

const app = express();

// all middlewares will be here
app.use(express.json({ limit: '30kb' })); // it means 30kb data will be allowed
app.use(express.urlencoded({ limit: '30kb', extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// This is a global error handler
app.use((req, res, next, err) => {
  res.status(500).json(new ApiError(500, 'Something Went Wrong in Server !'));
  next(err);
});

// all routes will be here

export default app;
