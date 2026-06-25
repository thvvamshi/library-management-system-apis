import ApiError from "../utils/ApiError.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Route Not Found
const notFound = (req, res, next) => {
    next(
        new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.COMMON.ROUTE_NOT_FOUND
        )
    );
};

export default notFound;