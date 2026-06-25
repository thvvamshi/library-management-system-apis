import request from "supertest";

import app from "../src/app.js";

import {
    createLibrarian,
    createMember,
} from "./helpers/user.helper.js";

import {
    loginLibrarian,
    loginMember,
} from "./helpers/auth.helper.js";

import {
    createBook,
} from "./helpers/book.helper.js";

// Book APIs

describe("Book APIs", () => {

    // Create Book

    describe("POST /api/books", () => {

        it("should create a new book", async () => {

            const librarian = await createLibrarian();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .post("/api/books")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Atomic Habits",
                    author: "James Clear",
                    isbn: "9781234567890",
                    category: "Self Help",
                    quantity: 10,
                });

            expect(response.status).toBe(201);

            expect(response.body.success).toBe(true);

            expect(response.body.data.title)
                .toBe("Atomic Habits");
        });

        it("should reject duplicate isbn", async () => {

            const librarian = await createLibrarian();

            const token = await loginLibrarian(librarian);

            await createBook({
                isbn: "9781234567890",
            });

            const response = await request(app)
                .post("/api/books")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Atomic Habits",
                    author: "James Clear",
                    isbn: "9781234567890",
                    category: "Self Help",
                    quantity: 10,
                });

            expect(response.status).toBe(409);
        });

        it("should prevent member from creating books", async () => {

            const member = await createMember();

            const token = await loginMember(member);

            const response = await request(app)
                .post("/api/books")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Atomic Habits",
                    author: "James Clear",
                    isbn: "9781234567890",
                    category: "Self Help",
                    quantity: 10,
                });

            expect(response.status).toBe(403);
        });

    });

    // Get Books

    describe("GET /api/books", () => {

        it("should return all books", async () => {

            const member = await createMember();

            await createBook();

            const token = await loginMember(member);

            const response = await request(app)
                .get("/api/books")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.data.books.length)
                .toBe(1);
        });

        it("should search books", async () => {

            const member = await createMember();

            await createBook();

            const token = await loginMember(member);

            const response = await request(app)
                .get("/api/books?search=Atomic")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.data.books.length)
                .toBe(1);
        });

    });

    // Get Book By Id

    describe("GET /api/books/:id", () => {

        it("should return a book", async () => {

            const member = await createMember();

            const book = await createBook();

            const token = await loginMember(member);

            const response = await request(app)
                .get(`/api/books/${book._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.data._id)
                .toBe(book._id.toString());
        });

    });

    // Update Book

    describe("PUT /api/books/:id", () => {

        it("should update a book", async () => {

            const librarian = await createLibrarian();

            const book = await createBook();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .put(`/api/books/${book._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    quantity: 20,
                });

            expect(response.status).toBe(200);

            expect(response.body.data.quantity)
                .toBe(20);
        });

    });

    // Delete Book

    describe("DELETE /api/books/:id", () => {

        it("should delete a book", async () => {

            const librarian = await createLibrarian();

            const book = await createBook();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .delete(`/api/books/${book._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.success)
                .toBe(true);
        });

    });

});