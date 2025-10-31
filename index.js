import express from "express";
import urlRoute from "./routes/url.routes.js";
import { connectDB } from "./connectDB.js";
import dotenv from "dotenv";

dotenv.config(); // load MONGODB_URL from .env

const app = express();
const PORT = 6000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running Great!" });
});

app.use("/api/url", urlRoute);
