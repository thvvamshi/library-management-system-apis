import crypto from "crypto";

import User from "../../src/models/User.js";

import { ROLES } from "../../src/constants/index.js";

// Create Member
const createMember = async (overrides = {}) => {

    const user = {
        name: "Test Member",
        email: `member-${crypto.randomUUID()}@test.com`,
        password: "password123",
        role: ROLES.MEMBER,
        ...overrides,
    };

    return await User.create(user);
};

// Create Librarian
const createLibrarian = async (overrides = {}) => {

    const user = {
        name: "Test Librarian",
        email: `librarian-${crypto.randomUUID()}@test.com`,
        password: "password123",
        role: ROLES.LIBRARIAN,
        ...overrides,
    };

    return await User.create(user);
};

export {
    createMember,
    createLibrarian,
};