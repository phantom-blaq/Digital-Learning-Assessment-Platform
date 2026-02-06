import express from "express";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
