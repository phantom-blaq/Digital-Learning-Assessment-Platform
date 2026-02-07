import express from "express";
const app = express();
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";

app.use(express.json());
app.use("/user", userRouter);
dotenv.config();

const port = process.env.PORT;
connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
