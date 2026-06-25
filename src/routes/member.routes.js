import { Router } from "express";

import memberController from "../controllers/member.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import { ROLES } from "../constants/index.js";

const router = Router();

// Member Routes

// Get All Members (Librarian Only)
router.get(
    "/",
    authenticate,
    authorize(ROLES.LIBRARIAN),
    memberController.getMembers
);

// Delete Member (Librarian Only)
router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.LIBRARIAN),
    memberController.deleteMember
);

export default router;