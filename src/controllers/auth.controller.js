import authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { HTTP_STATUS, MESSAGES, ROLES } from "../constants/index.js";

// Register User
const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        MESSAGES.AUTH.REGISTER_SUCCESS,
        user,
      ),
    );
});

// Login User
const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, MESSAGES.AUTH.LOGIN_SUCCESS, data));
});

// Register Librarian

const registerLibrarian = asyncHandler(async (req, res) => {
  const librarian = await authService.register(req.body, ROLES.LIBRARIAN);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(HTTP_STATUS.CREATED, MESSAGES.USER.CREATED, librarian),
    );
});

export default {
  register,
  login,
  registerLibrarian,
};
