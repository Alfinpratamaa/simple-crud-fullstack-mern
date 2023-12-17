
import mongoose from "mongoose";

const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI)
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;