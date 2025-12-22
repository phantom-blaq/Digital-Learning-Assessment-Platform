import express from "express";

import { connectDB } from "./mongoDB.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();



connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Hello!! listening on port ${process.env.PORT}`)
})
