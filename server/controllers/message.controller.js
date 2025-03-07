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

        // let imageUrl;
        // if (image) {
        //     imageUrl = `http://localhost:5000/uploads/${image.filename}`;
        // }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            // image: imageUrl,
        });

        await newMessage.save();

        //socket.io here

        res.status(201).json(newMessage);

    } catch (err) {
        console.error("Error in sendMessage controller:", err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }

}
