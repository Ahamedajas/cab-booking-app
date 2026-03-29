const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("HEADERS:", req.headers); // 👈 ADD THIS

  const token = req.headers.authorization?.split(" ")[1];

  console.log("TOKEN:", token); // 👈 ADD THIS

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // 👈 ADD THIS

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;