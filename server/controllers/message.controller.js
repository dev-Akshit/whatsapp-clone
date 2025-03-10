import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (err) {
        console.error("Error in getUsersForSideBar:", err);
        res.status(500).json({ msg: 'Internal Server Error' });

    }
}

export const getMessages = async (req, res) => {
    try {
        const { userId, receiverId } = req.params;
        // const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId }
            ]
        }).sort("createdAt");

        res.status(200).json(messages);

    } catch (err) {
        console.error("Error in getMessages controller:", err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, text } = req.params;

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            // image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (err) {
        console.error("Error in sendMessage controller:", err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }

}

export const sendImage = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const imageUrl = `/uploads/${req.file.filename}`;

        const newMessage = new Message({
            senderId,
            receiverId,
            image: imageUrl,
            messageType: 'image',
        });

        await newMessage.save();

        const roomId = [senderId, receiverId].sort().join("-");
        req.io.to(roomId).emit('receiveMessage', newMessage);

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error in sendImage controller:", err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};