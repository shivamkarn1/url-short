import express from "express";
import urlRoute from "./routes/url.routes.js";
import { connectDB } from "./connectDB.js";
import dotenv from "dotenv";
import { URL } from "./models/url.model.js";
dotenv.config(); // load MONGODB_URL from .env

const app = express();
app.use(express.json({ limit: "20kb" }));
const PORT = 6000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running Great!" });
});
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ message: "short id not found" });
  }
  let redirectTo = entry.redirectURL || "";
  if (!/^https?:\/\//i.test(redirectTo)) {
    redirectTo = `https://${redirectTo}`;
  }

  return res.redirect(redirectTo);
});

app.use("/url", urlRoute);
