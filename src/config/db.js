import mongoose from "mongoose";
import env from "./env.js";
import logger from "../logger/logger.js";

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);

        logger.info("MongoDB Connected Successfully");
    } catch (error) {
        logger.error(`MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;