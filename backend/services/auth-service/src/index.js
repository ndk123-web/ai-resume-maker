import express from 'express';
import app from './main.js';

// Only After Database Connection, We can Start our express app

app.on('error', (err) => {
  console.log('Error in Creating Express App: ', err);
});

app.listen(process.env.DEVELOPMENT_PORT || 3000, () => {
  console.log(`Express App Listening on http://localhost:${process.env.DEVELOPMENT_PORT}`);
});
