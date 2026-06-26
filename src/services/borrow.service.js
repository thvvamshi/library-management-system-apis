import mongoose from "mongoose";

import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

// Borrow Book

const borrowBook = async (memberId, bookId) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.BOOK.INVALID_ID);
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.BOOK.NOT_FOUND);
  }

  if (book.availableQuantity <= 0) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.BORROW.BOOK_NOT_AVAILABLE,
    );
  }

  const existingBorrow = await Borrow.findOne({
    member: memberId,
    book: bookId,
    status: "borrowed",
  });

  if (existingBorrow) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "Book already borrowed by this member",
    );
  }

  const borrow = await Borrow.create({
    member: memberId,
    book: bookId,
  });

  book.availableQuantity -= 1;

  await book.save();

  return await Borrow.findById(borrow._id)
    .populate("member", "-password")
    .populate("book");
};

// Return Book
const returnBook = async (memberId, bookId) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.BOOK.INVALID_ID);
  }

  const borrow = await Borrow.findOne({
    member: memberId,
    book: bookId,
    status: "borrowed",
  });

  if (!borrow) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.BORROW.NOT_FOUND);
  }

  borrow.status = "returned";

  borrow.returnedAt = new Date();

  await borrow.save();

  await Book.findByIdAndUpdate(bookId, {
    $inc: {
      availableQuantity: 1,
    },
  });

  return await Borrow.findById(borrow._id)
    .populate("member", "-password")
    .populate("book");
};
// Borrow History
const getMyBorrowedBooks = async (memberId) => {

    return await Borrow.find({
        member: memberId,
        status: "borrowed",
    })
        .populate("book")
        .sort({
            createdAt: -1,
        });

};

export default {
    borrowBook,
    returnBook,
    getMyBorrowedBooks,
};