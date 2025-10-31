import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ message: "Url not given" });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

export { handleGenerateNewShortUrl };
