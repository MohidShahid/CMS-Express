const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // Proceed if admin
    } else {
        res.status(403).json({ message: "Forbidden: Admin access required" });
    }
};

module.exports = verifyAdmin;