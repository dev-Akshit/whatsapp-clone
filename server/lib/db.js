import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connect('mongodb://localhost:27017/whatsapp-clone')
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));

}

export default connectDB;
