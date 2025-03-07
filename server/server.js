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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("joinRoom", ({ userId, receiverId }) => {
    const room = [userId, receiverId].sort().join("-");
    socket.join(room);
    console.log(`${userId} joined room: ${room}`);
  });
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    const room = [senderId, receiverId].sort().join("-");
    io.to(room).emit("receiveMessage", { senderId, text });
    console.log(`Message sent from ${senderId} to ${receiverId}: ${text}`);

    // Save message to database
    try{
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        // image: imageUrl,
      });
      await newMessage.save();
    } catch(err){
      console.error("Error in saving message to database:", err);
      console.log("Message not saved.");
    }
  });

  socket.on("disconnect", () => {
    console.log(`A User disconnected: ${socket.id}`);
  });
})


// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
