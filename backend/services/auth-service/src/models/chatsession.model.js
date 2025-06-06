import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const chatSession = new mongoose.model('chatSession', chatSessionSchema);

export { chatSession };
