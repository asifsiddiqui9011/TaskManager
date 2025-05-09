// middleware/fetchUser.js
const jwt = require('jsonwebtoken');

// It's best to store your JWT secret in an environment variable in production.
const JWT_SECRET = process.env.JWT_SECRET || 'Task_Manager_Secret';

module.exports = (req, res, next) => {
  // Expecting the token in the Authorization header in the format "Bearer <token>"
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  // Remove "Bearer " prefix if present.
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the decoded payload (e.g., { id: userId }) to req.user
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Token is not valid." });
  }
};