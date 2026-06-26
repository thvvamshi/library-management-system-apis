const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",

    USER_EXISTS: "User already exists",
    INVALID_CREDENTIALS: "Invalid email or password",

    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
  },

  USER: {
    CREATED: "User created successfully",
    FETCHED: "Users retrieved successfully",
    UPDATED: "User updated successfully",
    DELETED: "User deleted successfully",

    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "User already exists",

    INVALID_ROLE: "Invalid user role",
    CANNOT_DELETE_ADMIN: "Admin cannot be deleted",
  },

  BOOK: {
    CREATED: "Book created successfully",
    FETCHED: "Books retrieved successfully",
    UPDATED: "Book updated successfully",
    DELETED: "Book deleted successfully",

    NOT_FOUND: "Book not found",
    ALREADY_EXISTS: "Book with this ISBN already exists",

    UNAVAILABLE: "Book is currently unavailable",

    INVALID_ID: "Invalid book id",
    INVALID_QUANTITY: "Quantity cannot be less than borrowed books",
    DELETE_BORROWED: "Cannot delete a borrowed book",
  },

  BORROW: {
    BORROWED: "Book borrowed successfully",
    RETURNED: "Book returned successfully",

    NOT_FOUND: "Borrow record not found",
    BOOK_NOT_AVAILABLE: "Book is not available",
    ALREADY_RETURNED: "Book has already been returned",
  },

  MEMBER: {
    FETCHED: "Members retrieved successfully",
    DELETED: "Member deleted successfully",
    NOT_FOUND: "Member not found",
  },

  COMMON: {
    SERVER_ERROR: "Internal Server Error",
    ROUTE_NOT_FOUND: "Route not found",
    VALIDATION_ERROR: "Validation failed",
  },
};

export default MESSAGES;