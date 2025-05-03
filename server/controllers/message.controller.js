import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from 'cloudinary';

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
  
      if (!req.file) {
        console.error('No image file provided in request');
        return res.status(400).json({ msg: 'No image file provided' });
      }
  
      console.log('Uploading image to Cloudinary...');
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'whatsapp_clone' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Cloudinary upload failed');
          }
          return result;
        }
      ).end(req.file.buffer);
  
      console.log('Cloudinary upload result:', result);
  
      const newMessage = new Message({
        senderId,
        receiverId,
        image: result.secure_url,
        messageType: 'image',
        status: 'sent',
      });
  
      await newMessage.save();
      console.log('Saved message:', newMessage);
  
      const roomId = [senderId, receiverId].sort().join('-');
      req.io.to(roomId).emit('receiveMessage', newMessage);
  
      res.status(201).json(newMessage);
    } catch (err) {
      console.error('Error in sendImage controller:', err);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };