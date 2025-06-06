import express from 'express';
import app from './main.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { connectDB } from './db/db.js';

// Only After Database Connection, We can Start our express app
connectDB()
  .then(() => {
    app.on('error', (err) => {
      console.log('Error in Creating Express App: ', err);
    });

    app.listen(process.env.DEVELOPMENT_PORT || 3000, () => {
      console.log(`Express App Listening on http://localhost:${process.env.DEVELOPMENT_PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error in Creating Express App Check Database: ', err);
  });


// app.get(
//   '/',
//   (req, res, next) => {
//     next();
//   },
//   (req, res) => {
//     res.status(200).json(new ApiResponse(200, { data: 'This is Data' }, 'Success'));
//   },
// );
