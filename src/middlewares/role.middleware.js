import ApiError from "../utils/ApiError.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Authorize Roles
const authorize = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    HTTP_STATUS.FORBIDDEN,
                    MESSAGES.AUTH.UNAUTHORIZED
                )
            );
        }

        next();
    };
};

export default authorize;