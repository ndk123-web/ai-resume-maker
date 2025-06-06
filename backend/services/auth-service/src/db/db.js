import mongoose from 'mongoose';

// async function always returns a promise
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`,
    );

    console.log(`MongoDB connection Successful :  ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

export { connectDB };
