import mongoose from "mongoose";

import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";

import {
    HTTP_STATUS,
    MESSAGES,
    ROLES,
} from "../constants/index.js";

// Get Members
const getMembers = async () => {

    const members = await User.find({
        role: ROLES.MEMBER,
    })
        .select("-password")
        .sort({ createdAt: -1 });

    return members;
};

// Delete Member
const deleteMember = async (memberId) => {

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.MEMBER.NOT_FOUND
        );
    }

    const member = await User.findOne({
        _id: memberId,
        role: ROLES.MEMBER,
    });

    if (!member) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.MEMBER.NOT_FOUND
        );
    }

    await User.findByIdAndDelete(memberId);
};

export default {
    getMembers,
    deleteMember,
};