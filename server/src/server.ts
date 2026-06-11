import express from "express";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";
import UserRouter from "./api/user/routes";
import SourceRouter from "./api/source/routes";
import ChatRouter from "./api/chat/routes";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

app.use("/user", UserRouter);
app.use("/source", SourceRouter);
app.use("/chat", ChatRouter);

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
