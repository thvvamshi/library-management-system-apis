import memberService from "../services/member.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";

// Get Members
const getMembers = asyncHandler(async (req, res) => {

    const members = await memberService.getMembers();

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.MEMBER.FETCHED,
            members
        )
    );
});

// Delete Member
const deleteMember = asyncHandler(async (req, res) => {

    await memberService.deleteMember(req.params.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            MESSAGES.MEMBER.DELETED
        )
    );
});

export default {
    getMembers,
    deleteMember,
};