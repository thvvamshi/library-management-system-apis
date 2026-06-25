import logger from "../logger/logger.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Global Error Handler
const errorHandler = (err, req, res, next) => {

    const statusCode =
        err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const message =
        err.message || MESSAGES.COMMON.SERVER_ERROR;

    if (statusCode >= 500) {
        logger.error(
            `${req.method} ${req.originalUrl} -> ${statusCode}: ${message}`
        );

        if (process.env.NODE_ENV === "development") {
            logger.error(err.stack);
        }

    } else {
        logger.warn(
            `${req.method} ${req.originalUrl} -> ${statusCode}: ${message}`
        );
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;