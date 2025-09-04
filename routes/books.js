import express from "express";
import { getBooks, getPlayVideo } from "../controllers/booksController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Semua books (butuh JWT)
router.get("/", verifyToken, getBooks);
router.post("/play", verifyToken, getPlayVideo);

export default router;
