import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

import { HTTP_STATUS, MESSAGES, ROLES } from "../constants/index.js";

// Register User

const register = async (userData, role = ROLES.MEMBER) => {
  const { name, email, password } = userData;

  // Check Existing User

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.AUTH.USER_EXISTS);
  }

  // Create User

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Remove Password

  return await User.findById(user._id).select("-password");
};

// Login User

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_CREDENTIALS,
    );
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_CREDENTIALS,
    );
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export default {
  register,
  login,
};
