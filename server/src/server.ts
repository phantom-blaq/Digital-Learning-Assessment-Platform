import express from "express";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected Successfully");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

startServer();
