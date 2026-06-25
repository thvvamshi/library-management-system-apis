import request from "supertest";

import app from "../src/app.js";

import { ROLES } from "../src/constants/index.js";

import { createLibrarian } from "./helpers/user.helper.js";

// Authentication APIs

describe("Authentication APIs", () => {
  // Register

  describe("POST /api/auth/register", () => {
    it("should register a new member", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Vamshi",
        email: "vamshi@test.com",
        password: "password123",
      });

      expect(response.status).toBe(201);

      expect(response.body.success).toBe(true);

      expect(response.body.data.email).toBe("vamshi@test.com");

      expect(response.body.data.role).toBe(ROLES.MEMBER);
    });

    it("should not register duplicate email", async () => {
      await request(app).post("/api/auth/register").send({
        name: "Vamshi",
        email: "duplicate@test.com",
        password: "password123",
      });

      const response = await request(app).post("/api/auth/register").send({
        name: "Vamshi",
        email: "duplicate@test.com",
        password: "password123",
      });

      expect(response.status).toBe(409);

      expect(response.body.success).toBe(false);
    });

    it("should reject invalid email", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Vamshi",
        email: "invalid-email",
        password: "password123",
      });

      expect(response.status).toBe(400);
    });

    it("should reject missing password", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Vamshi",
        email: "vamshi@test.com",
      });

      expect(response.status).toBe(400);
    });

    it("should reject missing name", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "vamshi@test.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
    });
  });

  // Login

  describe("POST /api/auth/login", () => {
    let librarian;

    beforeEach(async () => {
      librarian = await createLibrarian();
    });

    it("should login librarian successfully", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: librarian.email,
        password: "password123",
      });

      expect(response.status).toBe(200);

      expect(response.body.success).toBe(true);

      expect(response.body.data.token).toBeDefined();
    });

    it("should reject wrong password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: librarian.email,
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
    });

    it("should reject unknown user", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "unknown@test.com",
        password: "password123",
      });

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
    });

    it("should reject empty request body", async () => {
      const response = await request(app).post("/api/auth/login").send({});

      expect(response.status).toBe(400);

      expect(response.body.success).toBe(false);
    });
  });
});
