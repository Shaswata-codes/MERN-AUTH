import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));

    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
    } else {
        await mongoose.connect('mongodb://localhost:27017/mernAuth');
    }
}

export default connectDB;