import { param } from "express-validator";

// Borrow Book

const borrowBookValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid book id"),

];

// Return Book

const returnBookValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid book id"),

];

export {
    borrowBookValidator,
    returnBookValidator,
};