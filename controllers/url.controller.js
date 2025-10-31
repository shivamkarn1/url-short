import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  // handle missing body or missing url field
  if (!body || !body.url) {
    return res.status(400).json({ message: "url not given" });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ message: "short id not found" });
  }

  const visitHistory = Array.isArray(result.visitHistory)
    ? result.visitHistory
    : [];

  return res.json({
    totalClicks: visitHistory.length,
    analytics: visitHistory,
  });
}

export { handleGenerateNewShortUrl, handleGetAnalytics };
