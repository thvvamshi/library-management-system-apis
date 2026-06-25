import { Router } from "express";

import authRoutes from "./auth.routes.js";
import bookRoutes from "./book.routes.js";

const router = Router();

// | Authentication Routes
router.use("/auth", authRoutes);

// | Book Routes
router.use("/books", bookRoutes);


export default router;