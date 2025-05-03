import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import Message from './models/message.model.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
// app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Socket.io
const onlineUsers = new Map();

const emitOnlineUsers = () => {
  // console.log("Emitting online users:", Array.from(onlineUsers.keys()));
  io.emit("onlineUsers", Array.from(onlineUsers.keys()));
};

io.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id}`);

  // Handle user online
  socket.on("userOnline", (userId) => {
    if (!userId) return;
    
    onlineUsers.set(userId, socket.id);
    
    emitOnlineUsers();
  });

  // Send and receive text messages
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    if (!text) return;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      status: 'sent' // Initial status is 'sent'
    });

    try {
      const savedMessage = await newMessage.save();
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", savedMessage);
      }
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Send and receive image messages
  socket.on("sendImage", async (messageData) => {
    if (messageData.alreadySaved) {
      const receiverSocketId = onlineUsers.get(messageData.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", messageData);
      }
    } else {
      const newMessage = new Message({
        senderId: messageData.senderId,
        receiverId: messageData.receiverId,
        image: messageData.image,
        messageType: "image",
        status: 'sent'
      });
  
      try {
        const savedMessage = await newMessage.save();
        const receiverSocketId = onlineUsers.get(messageData.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", savedMessage);
        }
      } catch (err) {
        console.error("Error saving image message:", err);
      }
    }
  });

  // Mark messages as seen
  socket.on("markAsSeen", async ({ senderId, receiverId, messageId }) => {
    try {
      let query = {
        senderId: senderId,
        receiverId: receiverId,
        status: { $ne: 'seen' }
      };

      if (messageId) {
        query._id = messageId;
      }

      const updateResult = await Message.updateMany(
        query,
        { $set: { status: 'seen' } }
      );

      // Only proceed if messages were actually updated
      if (updateResult.modifiedCount > 0) {
        const messages = await Message.find({
          ...query,
          status: 'seen'
        }).select('_id');
        
        const messageIds = messages.map(msg => msg._id);
        
        // Send notification to sender that their messages were seen
        const senderSocketId = onlineUsers.get(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit('messageSeen', {
            messageIds,
            senderId,
            receiverId
          });
        }
      }
    } catch (err) {
      console.error('Error marking messages as seen:', err);
    }
  });

  // socket.on("logout", (userId) => {
  //   if (userId && onlineUsers.has(userId)) {
  //     console.log(`User ${userId} logged out manually`);
  //     onlineUsers.delete(userId);
  //     emitOnlineUsers();
  //   }
  // });

  // Handle user disconnect
  socket.on("disconnect", () => {
    let disconnectedUserId = null;
    
    // Find which user this socket belonged to
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        disconnectedUserId = userId;
        onlineUsers.delete(userId);
        break;
      }
    }
    
    if (disconnectedUserId) {
      console.log(`User ${disconnectedUserId} disconnected (socket: ${socket.id})`);
      emitOnlineUsers();
    } else {
      console.log(`Unknown user disconnected: ${socket.id}`);
    }
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});