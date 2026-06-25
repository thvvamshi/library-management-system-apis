import mongoose from "mongoose";

import Book from "../models/Book.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

//  Create Book
const createBook = async (bookData) => {
  const { title, author, isbn, category, quantity } = bookData;

  const existingBook = await Book.findOne({ isbn });

  if (existingBook) {
    throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.BOOK.ALREADY_EXISTS);
  }

  const book = await Book.create({
    title,
    author,
    isbn,
    category,
    quantity,
    availableQuantity: quantity,
  });

  return book;
};

// Get All Books
const getBooks = async (queryParams) => {
  const { page = 1, limit = 10, search, category } = queryParams;

  const filter = {};

  if (search) {
    filter.$text = {
      $search: search,
    };
  }

  if (category) {
    filter.category = category;
  }

  const books = await Book.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const totalBooks = await Book.countDocuments(filter);

  return {
    books,
    pagination: {
      totalBooks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBooks / Number(limit)),
      limit: Number(limit),
    },
  };
};

//  Get Book By Id
const getBookById = async (bookId) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.BOOK.INVALID_ID);
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.BOOK.NOT_FOUND);
  }

  return book;
};

//  Update Book
const updateBook = async (bookId, updateData) => {
  const book = await getBookById(bookId);

  if (updateData.isbn && updateData.isbn !== book.isbn) {
    const existingBook = await Book.findOne({
      isbn: updateData.isbn,
    });

    if (existingBook) {
      throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.BOOK.ALREADY_EXISTS);
    }
  }

  if (
    updateData.quantity !== undefined &&
    updateData.quantity !== book.quantity
  ) {
    const borrowedBooks = book.quantity - book.availableQuantity;

    updateData.availableQuantity = updateData.quantity - borrowedBooks;

    if (updateData.availableQuantity < 0) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.BOOK.INVALID_QUANTITY,
      );
    }
  }

  Object.assign(book, updateData);

  await book.save();

  return book;
};

// Delete Book
const deleteBook = async (bookId) => {
  const book = await getBookById(bookId);

  if (book.availableQuantity !== book.quantity) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.BOOK.DELETE_BORROWED);
  }

  await Book.findByIdAndDelete(bookId);
};

export default {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
