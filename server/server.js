const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/db');
const authRoutes = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
