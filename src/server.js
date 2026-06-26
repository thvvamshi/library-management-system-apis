import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

// start server
const startServer = async () => {
    try {

        await connectDB();

        app.listen(env.PORT, () => {
            console.log(`🚀 Server running on port ${env.PORT}`);
            console.log(`🌍 Environment: ${env.NODE_ENV}`);
        });

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
};

startServer();