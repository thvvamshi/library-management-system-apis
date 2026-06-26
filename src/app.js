import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import morganMiddleware from "./config/morgan.js";
import swaggerSpec from "./docs/swagger.js";

import routes from "./routes/index.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

//  Global Middlewares

app.use(cors({origin: "*",}),);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morganMiddleware);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Management System API is running 🚀",
  });
});

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  API Routes
app.use("/api", routes);

// Not Found Handler
app.use(notFound);

// | Global Error Handler
app.use(errorHandler);

export default app;
