import { body, query } from "express-validator";

// Create Book Validation
export const createBookValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required"),

    body("isbn")
        .trim()
        .notEmpty()
        .withMessage("ISBN is required"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
];

// Update Book Validation
export const updateBookValidator = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("author")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Author cannot be empty"),

    body("isbn")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("ISBN cannot be empty"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),

    body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
];

// Get Books Validation
export const getBooksValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than 0"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),

    query("search")
        .optional()
        .trim(),

    query("category")
        .optional()
        .trim(),
];