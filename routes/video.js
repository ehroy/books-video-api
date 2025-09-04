import express from "express";
import { getPlayVideo } from "../controllers/booksController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET atau POST sesuai kebutuhan
router.post("/play", verifyToken, getPlayVideo);

export default router;
