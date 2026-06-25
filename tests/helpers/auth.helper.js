import request from "supertest";

import app from "../../src/app.js";

// Login
const login = async ({ email, password }) => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password,
        });

    if (response.status !== 200) {
        throw new Error(response.body.message);
    }

    return response.body.data.token;
};

// Login Member
const loginMember = async (member) => {

    return await login({
        email: member.email,
        password: "password123",
    });
};

// Login Librarian
const loginLibrarian = async (librarian) => {

    return await login({
        email: librarian.email,
        password: "password123",
    });
};

export {
    login,
    loginMember,
    loginLibrarian,
};