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

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    const roomId = [senderId, receiverId].sort().join("-");
    const newMessage = new Message({ senderId, receiverId, text });

    try {
      await newMessage.save();
      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Send image message
  socket.on("sendImage", async ({ senderId, receiverId, imageUrl }) => {
    const roomId = [senderId, receiverId].sort().join("-");
    const newMessage = new Message({ senderId, receiverId, image: imageUrl, messageType: "image" });

    try {
      await newMessage.save();
      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (err) {
      console.error("Error saving image message:", err);
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
