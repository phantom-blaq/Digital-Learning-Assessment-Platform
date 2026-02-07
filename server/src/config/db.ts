import mongoose from "mongoose";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
});

const env = envSchema.parse(process.env);

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
