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

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = new Map();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const emitOnlineUsers = () => {
  io.emit("onlineUsers", Array.from(onlineUsers.keys()));
}

// Socket.io
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user online
  socket.on("userOnline", (userId) => {
    if (userId && !onlineUsers.has(userId)) {
      onlineUsers.set(userId, socket.id);
      emitOnlineUsers();
      console.log("User online:", onlineUsers);
    }
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

      // Update messages in database
      await Message.updateMany(
        query,
        { $set: { status: 'seen' } }
      );

      // Get IDs of updated messages
      const messages = await Message.find(query).select('_id');
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
    } catch (err) {
      console.error('Error marking messages as seen:', err);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    emitOnlineUsers();
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});