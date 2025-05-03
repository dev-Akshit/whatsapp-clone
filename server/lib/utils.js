import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        // secure: process.env.NODE_ENV !== 'development',
        secure: true,
    });

    return token;
}