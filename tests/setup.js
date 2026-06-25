import mongoose from "mongoose";

import connectDB from "../src/config/db.js";

beforeAll(async () => {
    await connectDB();
});

beforeEach(async () => {

    const collections = mongoose.connection.collections;

    for (const key of Object.keys(collections)) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});