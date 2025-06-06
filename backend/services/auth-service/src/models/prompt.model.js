import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userPrompt: {
      type: String,
      trim: true,
      required: true,
    },
    userResponse: {
      type: String,
      trim: true,
      required: true,
    },
    sessionId: {
      // it means which conversation this prompt belongs to
      type: String,
      required: true,
      index : true    // if conversation is long, it will be stored in index
    },
    resumeUrl : {   // cloudinary url
      type : String,
      trim : true
    }
  },
  {
    timestamps: true,
  },
);

const Prompt = new mongoose.model('Prompt', promptSchema);

export { Prompt };
