/* REVISAR O CÓDIGO DE TESTE: CORRIGIR BUGS NOS TESTE */

const { PrismaClient } = require("@prisma/client");
const {
  listarLivros,
  cadastrarLivro,
  editarLivro,
  deletarLivro,
} = require("../controllers/bookController");

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    book: {
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    loan: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  })),
}));
describe("listarLivros", () => {
  it("should return filtered books when both 'nome' and 'categoria' query parameters are provided", async () => {
    const mockBooks = [
      { id: 1, nome: "Livro 1", genero: "Ficção" },
      { id: 2, nome: "Livro 2", genero: "Aventura" },
    ];
    const mockReq = { query: { nome: "Livro", categoria: "Ficção" } };
    const mockRes = { json: jest.fn() };

    const prisma = new PrismaClient();
    prisma.book.findMany.mockResolvedValue(mockBooks);

    await listarLivros(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockBooks);
  });
});

describe("editarLivro", () => {
  it("should return updated book when book id exists", async () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nome: "Livro Atualizado",
        numero: "789",
        autor: "Autor Atualizado",
        genero: "Aventura",
        quantidade: "10",
      },
    };
    const mockRes = { json: jest.fn() };

    const prisma = new PrismaClient();
    prisma.book.update.mockResolvedValue({ id: 1, ...mockReq.body });

    await editarLivro(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockReq.body });
  });
});

describe("deletarLivro", () => {
  it("should delete all loans associated with the book before deleting the book", async () => {
    const mockReq = { params: { id: 1 } };
    const mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    const prisma = new PrismaClient();
    prisma.loan.findMany.mockResolvedValue([{ id: 1 }]);
    prisma.loan.deleteMany.mockResolvedValue();
    prisma.book.delete.mockResolvedValue({ id: 1 });

    await deletarLivro(mockReq, mockRes);

    expect(prisma.loan.deleteMany).toHaveBeenCalledWith({
      where: { livroId: 1 },
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Livro deletado com sucesso",
    });
  });
});
