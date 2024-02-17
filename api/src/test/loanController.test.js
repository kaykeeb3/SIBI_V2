/* REVISAR O CÓDIGO DE TESTE: CORRIGIR BUGS NOS TESTE */

const {
  listarEmprestimos,
  criarEmprestimo,
  obterEmprestimos,
  atualizarEmprestimo,
  excluirEmprestimo,
  marcarDevolvido,
} = require("../controllers/loanController");

const { PrismaClient } = require("@prisma/client");

// Criar um mock para o PrismaClient
const prismaMock = new PrismaClient();

// Substituir os métodos do prisma pelo mock
prismaMock.loan.findMany = jest.fn();
prismaMock.loan.findUnique = jest.fn();
prismaMock.loan.create = jest.fn();
prismaMock.loan.update = jest.fn();
prismaMock.loan.delete = jest.fn();

describe("listarEmprestimos", () => {
  it("should return all loans when no query parameters are provided", async () => {
    const mockLoans = [
      { id: 1, nome: "Loan 1" },
      { id: 2, nome: "Loan 2" },
    ];

    // Simular a resolução da chamada ao método findMany do Prisma
    prismaMock.loan.findMany.mockResolvedValue(mockLoans);

    const mockReq = {};
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await listarEmprestimos(mockReq, mockRes);

    // Verificar se o método json do response foi chamado com os loans esperados
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining(mockLoans)
    );
  });

  it("should return loans filtered by name when nome query parameter is provided", async () => {
    const mockLoans = [
      { id: 1, nome: "Loan 1" },
      { id: 2, nome: "Loan 2" },
    ];

    // Simular a resolução da chamada ao método findMany do Prisma
    prismaMock.loan.findMany.mockResolvedValue(mockLoans);

    const mockReq = { query: { nome: "Loan" } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await listarEmprestimos(mockReq, mockRes);

    // Verificar se o método json do response foi chamado com os loans esperados
    expect(mockRes.json).toHaveBeenCalledWith(mockLoans);
  });
});

describe("criarEmprestimo", () => {
  it("should create a new loan", async () => {
    const mockReq = {
      body: {
        nome: "Loan",
        serieCurso: "Curso",
        dataInicio: "2024-02-17",
        dataDevolucao: "2024-02-24",
        livroId: "1",
      },
    };

    const mockCreatedLoan = {
      id: 1,
      nome: "Loan",
      serieCurso: "Curso",
      dataInicio: "2024-02-17",
      dataDevolucao: "2024-02-24",
      livroId: "1",
    };

    // Simular a resolução da chamada ao método create do Prisma
    prismaMock.loan.create.mockResolvedValue(mockCreatedLoan);

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await criarEmprestimo(mockReq, mockRes);

    // Verificar se o método json do response foi chamado com o loan criado
    expect(mockRes.json).toHaveBeenCalledWith(mockCreatedLoan);
  });
});

describe("obterEmprestimos", () => {
  it("should return a loan by id", async () => {
    const mockLoan = { id: 1, nome: "Loan 1" };

    // Simular a resolução da chamada ao método findUnique do Prisma
    prismaMock.loan.findUnique.mockResolvedValue(mockLoan);

    const mockReq = { params: { id: "1" } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await obterEmprestimos(mockReq, mockRes);

    // Verificar se o método json do response foi chamado com o loan esperado
    expect(mockRes.json).toHaveBeenCalledWith(mockLoan);
  });

  it("should return 404 when loan is not found", async () => {
    // Simular a resolução da chamada ao método findUnique do Prisma com retorno null
    prismaMock.loan.findUnique.mockResolvedValue(null);

    const mockReq = { params: { id: "1" } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await obterEmprestimos(mockReq, mockRes);

    // Verificar se o método status e json do response foram chamados corretamente
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Empréstimo não encontrado",
    });
  });
});

describe("atualizarEmprestimo", () => {
  it("should update a loan", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        nome: "Updated Loan",
        serieCurso: "Curso",
        dataInicio: "2024-02-17",
        dataDevolucao: "2024-02-24",
        livroId: "1",
      },
    };

    const mockUpdatedLoan = { id: 1, nome: "Updated Loan" };

    // Simular a resolução da chamada ao método findUnique do Prisma e update do Prisma
    prismaMock.loan.findUnique.mockResolvedValue({ id: 1, nome: "Loan 1" });
    prismaMock.loan.update.mockResolvedValue(mockUpdatedLoan);

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await atualizarEmprestimo(mockReq, mockRes);

    // Verificar se o método json do response foi chamado com o loan atualizado
    expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedLoan);
  });

  it("should return 404 when loan is not found during update", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        nome: "Updated Loan",
        serieCurso: "Curso",
        dataInicio: "2024-02-17",
        dataDevolucao: "2024-02-24",
        livroId: "1",
      },
    };

    // Simular a resolução da chamada ao método findUnique do Prisma com retorno null
    prismaMock.loan.findUnique.mockResolvedValue(null);

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await atualizarEmprestimo(mockReq, mockRes);

    // Verificar se o método status e json do response foram chamados corretamente
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Empréstimo não encontrado",
    });
  });

  it("should return 400 when invalid dates are provided during update", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        nome: "Updated Loan",
        serieCurso: "Curso",
        dataInicio: "invalid",
        dataDevolucao: "invalid",
        livroId: "1",
      },
    };

    const mockLoan = { id: 1, nome: "Loan 1" };

    // Simular a resolução da chamada ao método findUnique do Prisma
    prismaMock.loan.findUnique.mockResolvedValue(mockLoan);

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await atualizarEmprestimo(mockReq, mockRes);

    // Verificar se o método status e json do response foram chamados corretamente
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Datas fornecidas são inválidas",
    });
  });
});

describe("excluirEmprestimo", () => {
  it("should delete a loan", async () => {
    const mockReq = { params: { id: "1" } };

    // Simular a resolução da chamada ao método delete do Prisma
    prismaMock.loan.delete.mockResolvedValue({ id: 1 });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await excluirEmprestimo(mockReq, mockRes);

    // Verificar se o método json do response foi chamado corretamente
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Empréstimo deletado com sucesso",
    });
  });

  it("should handle error during deletion", async () => {
    const mockReq = { params: { id: "1" } };

    // Simular a rejeição da chamada ao método delete do Prisma
    prismaMock.loan.delete.mockRejectedValue(
      new Error("Erro durante a exclusão do empréstimo")
    );

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await excluirEmprestimo(mockReq, mockRes);

    // Verificar se o método status e json do response foram chamados corretamente
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Erro interno do servidor",
    });
  });
});

describe("marcarDevolvido", () => {
  it("should mark a loan as returned", async () => {
    const mockReq = { params: { id: "1" } };

    const mockLoan = { id: 1, nome: "Loan 1" };

    // Simular a resolução da chamada ao método update do Prisma
    prismaMock.loan.update.mockResolvedValue({ ...mockLoan, devolvido: true });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await marcarDevolvido(mockReq, mockRes);

    // Verificar se o método json do response foi chamado com o loan atualizado
    expect(mockRes.json).toHaveBeenCalledWith({ ...mockLoan, devolvido: true });
  });

  it("should handle error during marking as returned", async () => {
    const mockReq = { params: { id: "1" } };

    // Simular a rejeição da chamada ao método update do Prisma
    prismaMock.loan.update.mockRejectedValue(
      new Error("Erro ao marcar empréstimo como devolvido")
    );

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await marcarDevolvido(mockReq, mockRes);

    // Verificar se o método status e json do response foram chamados corretamente
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Erro interno do servidor",
    });
  });
});
