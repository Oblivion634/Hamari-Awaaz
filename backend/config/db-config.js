import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    console.log("MongoDB Successfully Connected");
  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;
