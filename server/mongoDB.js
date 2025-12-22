import mongoose from "mongoose";

export function connectDB() {
  try {
    const Connection = mongoose.connect(process.env.MONGODB_URL);
    if (Connection) {
      console.log("Yes we connected to mongoDB", Connection);
    }
  } catch (error) {
    console.log("Error in coonecting to MongoDB", error);
  }
}
