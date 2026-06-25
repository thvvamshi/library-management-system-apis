import jwt from "jsonwebtoken";

import User from "../models/User.js";
import env from "../config/env.js";

import ApiError from "../utils/ApiError.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Authenticate User
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                MESSAGES.AUTH.UNAUTHORIZED
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                MESSAGES.AUTH.UNAUTHORIZED
            );
        }

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
};

export default authenticate;