const jwt = require("jsonwebtoken");
const { User } = require("../models");
const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied, invalid token format" });
  }

  // Ensure JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured in .env");
    return res
      .status(500)
      .json({ error: "Internal server error: JWT secret is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Access denied, user not found" });
    }

    // Attach the full user object to the request
    req.user = user;
    next();
  } catch (err) {
    // Differentiate error types and log them
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Access denied, token has expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Access denied, invalid token" });
    }
    // Log other unexpected errors
    console.error("Authentication error:", err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

module.exports = authMiddleware;
