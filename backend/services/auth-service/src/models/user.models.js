import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // index will be created for faster searching
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    avtar: {
      type: String, // cloudinary url
      required: true,
    },
    refreshToken: {
      type: String,
    },
    isPremium : {
      type : Boolean,
      default : false
    },
    bio : {
      type : String,
      default : ""
    }
  },
  {
    timestamps: true,
  },
);

// mongoose middleware
userSchema.pre('save', async function (next) {
  // Middleware for password hashing
  if (!this.isModified('password')) {
    return next();
  }

  if (!this.isModified('refreshToken')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10); // hash password of 10 iterations and replace the hashed password

  next(); // imporant because this is before save middleware
  // only trigger when password is modified and before save it works
});

// to check the password is correct or not
// it's simple method inside userSchema
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate the Access Token for user
// it's simple method inside userSchema
// this refers to the current user object
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

// Internally User get converted into users
const User = new mongoose.model('User', userSchema);

export { User };
