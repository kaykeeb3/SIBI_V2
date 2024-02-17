// livroRoutes.test.js

const request = require("supertest");
const express = require("express");
const { Router } = require("express");
const livroRoutes = require("../routes/bookRoutes");

// Mockando middlewares e controladores
jest.mock("../middlewares/authMiddleware", () => ({
  authenticateToken: (req, res, next) => next(),
}));

jest.mock("../middlewares/bookMiddleware", () => ({
  validateLivroInput: (req, res, next) => next(),
}));

jest.mock("../controllers/bookController", () => ({
  cadastrarLivro: jest.fn(),
}));

describe("POST /livros", () => {
  it("should create a new book", async () => {
    const mockLivro = {
      title: "Livro Teste",
      author: "Autor Teste",
      pages: 200,
    };
    require("../controllers/bookController").cadastrarLivro.mockResolvedValueOnce(
      mockLivro
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    app.use("/", livroRoutes); // Passe o livroRoutes para o aplicativo

    const response = await request(app).post("/livros").send(mockLivro);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ livro: mockLivro });
  });

  it("should return 500 when book creation fails", async () => {
    require("../controllers/bookController").cadastrarLivro.mockRejectedValueOnce(
      new Error("Error creating book")
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    app.use("/", livroRoutes); // Passe o livroRoutes para o aplicativo

    const response = await request(app)
      .post("/livros")
      .send({ title: "Livro Teste", author: "Autor Teste", pages: 200 });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
