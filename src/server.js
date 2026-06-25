import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

// Start Server
const startServer = async () => {
    await connectDB();

    app.listen(env.PORT, () => {
        console.log(`🚀 Server running on http://localhost:${env.PORT}`);
        console.log(`🌍 Environment: ${env.NODE_ENV}`);
    });
};

startServer();