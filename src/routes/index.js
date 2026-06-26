import { Router } from "express";

import authRoutes from "./auth.routes.js";
import bookRoutes from "./book.routes.js";
import memberRoutes from "./member.routes.js";

const router = Router();

// Authentication Routes
router.use("/auth", authRoutes);

// Book Routes
router.use("/books", bookRoutes);

// Member Routes
router.use("/members", memberRoutes);


export default router;
