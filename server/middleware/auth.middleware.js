import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ msg: 'Unauthorized - No token provided' });
        }
        

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user;

        next();
    } catch (err) {
        console.error("Error in protectRoute middleware: ", err);
        res.status(500).json({ msg: 'Internal Server error' });

    }
}