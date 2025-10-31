import express, { Router } from "express";
import {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
} from "../controllers/url.controller.js";

const router = Router();

router.get("/analytics/:shortId", handleGetAnalytics);
router.post("/", handleGenerateNewShortUrl);

export default router;
