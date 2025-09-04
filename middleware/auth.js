import jwt from "jsonwebtoken";

const SECRET_KEY = "mySecretKey123"; // sebaiknya pakai env var

// Middleware verifikasi token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ success: false, message: "Token required" });

  const token = authHeader.split(" ")[1]; // "Bearer token"

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Function untuk generate token (contoh login)
export const generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
};
