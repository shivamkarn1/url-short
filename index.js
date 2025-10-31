import express from "express";
import urlRoute from "./routes/url.routes.js";
const app = express();

const PORT = 6000;

app.listen("/", (_, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
  res.json({ message: "Server is running Great ! " });
});
