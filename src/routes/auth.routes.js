import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
    registerValidator,
    loginValidator,
} from "../validators/auth.validator.js";

const router = Router();

// Register
router.post(
    "/register",
    registerValidator,
    validate,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidator,
    validate,
    authController.login
);

export default router;