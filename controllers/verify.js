require('dotenv').config();
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false, message: "No token provided" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        // If you need to make the decoded token available in subsequent middleware or routes, you can attach it to the request object
        req.decodedToken = decoded;
        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}

module.exports = verifyUser;
