import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import booksRoute from "./routes/books.js";
import videoRoute from "./routes/video.js";
import { generateToken } from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Logging (dev format: method, url, status, response time)
app.use(morgan("dev"));

// Route login untuk ambil JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "12345") {
    const token = generateToken({ username });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// Books route
app.use("/api/books", booksRoute);
app.use("/api/video", videoRoute);

// 404
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Endpoint not found" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
