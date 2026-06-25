import crypto from "crypto";

import Book from "../../src/models/Book.js";

// Create Book
const createBook = async (overrides = {}) => {

    return await Book.create({
        title: "Atomic Habits",
        author: "James Clear",
        isbn: crypto.randomUUID(),
        category: "Self Help",
        quantity: 10,
        availableQuantity: 10,
        ...overrides,
    });
};

export {
    createBook,
};