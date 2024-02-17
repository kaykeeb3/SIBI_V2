/* REVISAR O CÓDIGO DE TESTE: CORRIGIR BUGS NOS TESTE */

const request = require("supertest");
const express = require("express");
const { Router } = require("express");
const loanRoutes = require("../routes/loanRoutes");

// Mockando controladores
jest.mock("../controllers/loanController", () => ({
  listarEmprestimos: jest.fn(),
  criarEmprestimo: jest.fn(),
  atualizarEmprestimo: jest.fn(), // Mock da função atualizarEmprestimo
}));

describe("Loan Routes", () => {
  const mockEmprestimo = {
    id: 1,
    livro: "Livro Teste",
    usuario: "Usuário Teste",
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  it("should list all loans", async () => {
    require("../controllers/loanController").listarEmprestimos.mockResolvedValueOnce(
      [mockEmprestimo]
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    router.use("/", loanRoutes); // Use o loanRoutes no router
    app.use("/", router); // Passe o router para o aplicativo

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([mockEmprestimo]);
  });

  it("should create a new loan", async () => {
    require("../controllers/loanController").criarEmprestimo.mockResolvedValueOnce(
      mockEmprestimo
    );

    const app = express();
    app.use(express.json());
    const router = Router();
    router.use("/", loanRoutes); // Use o loanRoutes no router
    app.use("/", router); // Passe o router para o aplicativo

    const response = await request(app).post("/").send(mockEmprestimo);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEmprestimo);
  });
});
