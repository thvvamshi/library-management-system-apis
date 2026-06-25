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

// Member APIs

describe("Member APIs", () => {

    // Get Members

    describe("GET /api/members", () => {

        it("should return all members", async () => {

            const librarian = await createLibrarian();

            await createMember();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .get("/api/members")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data.length).toBe(1);

            expect(response.body.data[0].role)
                .toBe("member");

        });

        it("should deny access to member", async () => {

            const member = await createMember();

            const token = await loginMember(member);

            const response = await request(app)
                .get("/api/members")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(403);

            expect(response.body.success).toBe(false);

        });

        it("should reject unauthorized request", async () => {

            const response = await request(app)
                .get("/api/members");

            expect(response.status).toBe(401);

            expect(response.body.success).toBe(false);

        });

    });

    // Delete Member

    describe("DELETE /api/members/:id", () => {

        it("should delete member", async () => {

            const librarian = await createLibrarian();

            const member = await createMember();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .delete(`/api/members/${member._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

        });

        it("should return 404 for non-existing member", async () => {

            const librarian = await createLibrarian();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .delete("/api/members/685000000000000000000000")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(404);

        });

        it("should return 400 for invalid member id", async () => {

            const librarian = await createLibrarian();

            const token = await loginLibrarian(librarian);

            const response = await request(app)
                .delete("/api/members/123")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(400);

        });

        it("should prevent member from deleting another member", async () => {

            const member = await createMember();

            const anotherMember = await createMember({
                email: "member2@test.com",
            });

            const token = await loginMember(member);

            const response = await request(app)
                .delete(`/api/members/${anotherMember._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(403);

            expect(response.body.success).toBe(false);

        });

    });

});