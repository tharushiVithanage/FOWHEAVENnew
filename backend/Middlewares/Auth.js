const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT Token is required", success: false });
  }

  try {
    const token = authHeader.split(" ")[1]; // Assuming the format is "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized, JWT Token is invalid or expired",
      success: false,
    });
  }
};

module.exports = ensureAuthenticated;
