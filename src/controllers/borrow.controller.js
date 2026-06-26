import borrowService from "../services/borrow.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Borrow Book

const borrowBook = asyncHandler(async (req, res) => {

    const borrow = await borrowService.borrowBook(
        req.user.id,
        req.params.id,
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            MESSAGES.BORROW.BORROWED,
            borrow,
        ),
    );

});

// Return Book

const returnBook = asyncHandler(async (req, res) => {

    const borrow = await borrowService.returnBook(
        req.user.id,
        req.params.id,
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.BORROW.RETURNED,
            borrow,
        ),
    );

});

// My Borrowed Books

const getMyBorrowedBooks = asyncHandler(async (req, res) => {

    const books = await borrowService.getMyBorrowedBooks(
        req.user.id,
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            "Borrowed books retrieved successfully",
            books,
        ),
    );

});

export default {
    borrowBook,
    returnBook,
    getMyBorrowedBooks,
};