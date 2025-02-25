const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/whatsappClone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Routes will go here (signup, login, etc.)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
