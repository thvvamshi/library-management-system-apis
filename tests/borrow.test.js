import request from "supertest";

import app from "../src/app.js";

import {
    createMember,
    createLibrarian,
} from "./helpers/user.helper.js";

import {
    loginMember,
    loginLibrarian,
} from "./helpers/auth.helper.js";

import {
    createBook,
} from "./helpers/book.helper.js";

import {
    createBorrow,
} from "./helpers/borrow.helper.js";

// Borrow APIs

describe("Borrow APIs", () => {

    // Borrow Book

    describe("POST /api/borrows", () => {

        it("should borrow a book", async () => {

            const member = await createMember();

            const book = await createBook();

            const token = await loginMember(member);

            const response = await request(app)
                .post("/api/borrows")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    bookId: book._id,
                });

            expect(response.status).toBe(201);

            expect(response.body.success).toBe(true);

        });

        it("should reject unavailable book", async () => {

            const member = await createMember();

            const token = await loginMember(member);

            const book = await createBook({
                quantity: 0,
                availableQuantity: 0,
            });

            const response = await request(app)
                .post("/api/borrows")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    bookId: book._id,
                });

            expect(response.status).toBe(400);

        });

    });

    // Return Book

    describe("PUT /api/borrows/:borrowId/return", () => {

        it("should return a borrowed book", async () => {

            const librarian =
                await createLibrarian();

            const member =
                await createMember();

            const book =
                await createBook();

            const borrow =
                await createBorrow({
                    member: member._id,
                    book: book._id,
                });

            const token =
                await loginLibrarian(librarian);

            const response = await request(app)
                .put(
                    `/api/borrows/${borrow._id}/return`
                )
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

        });

    });

    // Borrow History

    describe("GET /api/borrows", () => {

        it("should return member borrow history", async () => {

            const member =
                await createMember();

            const book =
                await createBook();

            await createBorrow({
                member: member._id,
                book: book._id,
            });

            const token =
                await loginMember(member);

            const response = await request(app)
                .get("/api/borrows")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

            expect(
                response.body.data.borrows.length
            ).toBe(1);

        });

    });

});