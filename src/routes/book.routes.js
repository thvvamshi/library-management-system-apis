import { Router } from "express";

import bookController from "../controllers/book.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
    createBookValidator,
    updateBookValidator,
    getBooksValidator,
} from "../validators/book.validator.js";

import { ROLES } from "../constants/index.js";

const router = Router();

// Book Routes //

// Create Book (Librarian Only)
router.post(
    "/",
    authenticate,
    authorize(ROLES.LIBRARIAN),
    createBookValidator,
    validate,
    bookController.createBook
);

// Get All Books (Authenticated Users)
router.get(
    "/",
    authenticate,
    getBooksValidator,
    validate,
    bookController.getBooks
);

// Get Book By Id (Authenticated Users)
router.get(
    "/:id",
    authenticate,
    bookController.getBookById
);

// Update Book (Librarian Only)
router.put(
    "/:id",
    authenticate,
    authorize(ROLES.LIBRARIAN),
    updateBookValidator,
    validate,
    bookController.updateBook
);

// Delete Book (Librarian Only)
router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.LIBRARIAN),
    bookController.deleteBook
);

export default router;