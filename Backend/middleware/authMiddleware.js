const jwt = require('jsonwebtoken');
const SECRET_KEY = "Glyptodon@2305";

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Store user info for next middleware
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;
