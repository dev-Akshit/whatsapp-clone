import bcrypt, { genSalt } from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js'

import dotenv from 'dotenv';
dotenv.config();
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ msg: 'Username already exists' });
        }
        const salt = await genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,

            });
        } else {
            res.status(500).json({ msg: 'Invalid user data' });
        }


    } catch (error) {
        console.log("Error in signup controller", error.msg);
        res.status(500).json({ msg: 'Internal Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,

        });

    } catch (err) {
        console.error('Error in login controller:', err.msg);
        return res.status(500).json({ msg: 'Internal Server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ msg: 'Logged out successfully' });

    } catch (err) {
        console.error('Error in logout controller:', err.msg);
        return res.status(500).json({ msg: 'Internal Server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!req.file) {
            return res.status(400).json({ msg: 'ProfilePic required' });
        }
        const profilePicPath = req.file.path;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: profilePicPath },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            msg: 'Profile pic uploaded succesfully',
            user: updatedUser
        })
    } catch (err) {
        console.error('Error in updateProfile controller:', err.msg);
        return res.status(500).json({ msg: 'Internal Server error' });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        console.error('Error in checkAuth controller:', err.msg);
        return res.status(500).json({ msg: 'Internal Server error' });
    }
}