import bookService from "../services/book.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Create Book
const createBook = asyncHandler(async (req, res) => {

    const book = await bookService.createBook(req.body);

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            MESSAGES.BOOK.CREATED,
            book
        )
    );
});

// Get All Books
const getBooks = asyncHandler(async (req, res) => {

    const books = await bookService.getBooks(req.query);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.BOOK.FETCHED,
            books
        )
    );
});

// Get Book By Id
const getBookById = asyncHandler(async (req, res) => {

    const book = await bookService.getBookById(req.params.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.BOOK.FETCHED,
            book
        )
    );
});

// Update Book
const updateBook = asyncHandler(async (req, res) => {

    const book = await bookService.updateBook(
        req.params.id,
        req.body
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.BOOK.UPDATED,
            book
        )
    );
});

// Delete Book
const deleteBook = asyncHandler(async (req, res) => {

    await bookService.deleteBook(req.params.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.BOOK.DELETED,
            null
        )
    );
});

export default {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
};