// authRoutes.test.js

const request = require("supertest");
const express = require("express");
const { Router } = require("express");
const authRoutes = require("../routes/authRoutes");

// Definindo um token de autorização mockado para uso nos testes
const mockToken = "mockToken";

// Mocking middlewares and controllers
jest.mock("../middlewares/authMiddleware", () => ({
  authenticateToken: (req, res, next) => {
    req.user = { userId: "mockUserId" }; // Definindo um usuário mockado para uso nos testes
    next();
  },
  validateUserInput: (req, res, next) => next(),
}));

jest.mock("../controllers/authController", () => ({
  login: jest.fn(),
  getUserProfile: jest.fn(),
}));

describe("POST /login", () => {
  it("should return a token when login succeeds", async () => {
    require("../controllers/authController").login.mockResolvedValueOnce(
      mockToken
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    app.use("/", authRoutes(router)); // Passe a instância do Router para o authRoutes

    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: mockToken });
  });

  it("should return 500 when login fails", async () => {
    require("../controllers/authController").login.mockRejectedValueOnce(
      new Error("Login failed")
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    app.use("/", authRoutes(router)); // Passe a instância do Router para o authRoutes

    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: "Internal server error during login",
    });
  });
});

describe("GET /home", () => {
  it("should return user profile when authenticated", async () => {
    const mockProfile = { username: "testuser", email: "test@example.com" };
    require("../controllers/authController").getUserProfile.mockResolvedValueOnce(
      mockProfile
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    app.use("/", authRoutes(router)); // Passe a instância do Router para o authRoutes

    const response = await request(app)
      .get("/home")
      .set("Authorization", `Bearer ${mockToken}`); // Passando o token de autorização mockado

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockProfile);
  });

  it("should return 500 when profile fetching fails", async () => {
    require("../controllers/authController").getUserProfile.mockRejectedValueOnce(
      new Error("Fetching profile failed")
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    app.use("/", authRoutes(router)); // Passe a instância do Router para o authRoutes

    const response = await request(app)
      .get("/home")
      .set("Authorization", `Bearer ${mockToken}`); // Passando o token de autorização mockado

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: "Internal server error fetching user profile",
    });
  });
});
