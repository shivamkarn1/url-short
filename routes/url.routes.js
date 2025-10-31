import express, { Router } from "express";
import { handleGenerateNewShortUrl } from "../controllers/url.js";

const router = Router();

router.post("/", handleGenerateNewShortUrl);

export default router;
