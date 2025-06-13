import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true, // Firebase UID
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: false, // sometimes fullname might not be provided
    },
    avatar: {
      type: String, // Firebase photoURL or custom Cloudinary
      default: '',
    },
    provider: {
      type: String, // google / password / github etc.
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
export { User };
