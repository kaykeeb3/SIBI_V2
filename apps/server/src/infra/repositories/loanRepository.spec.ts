import { LoanRepository } from "@/infra/repositories/loanRepository";
import prisma from "@/infra/prisma/client";
import { Loan } from "@/core/domain/entities/loanEntity";

jest.mock("@/infra/prisma/client", () => ({
  loan: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Loan Repository", () => {
  const loanRepository = new LoanRepository();
  const loanData = {
    name: "John Doe",
    seriesCourse: "8th Grade",
    startDate: new Date(),
    returnDate: new Date(),
    bookId: 1,
    returned: false, // Adicionando a propriedade 'returned' aqui
  };

  it("should create a loan", async () => {
    (prisma.loan.create as jest.Mock).mockResolvedValue({
      id: 1,
      ...loanData,
    });

    const result = await loanRepository.createLoan(loanData);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned);
  });

  it("should get all loans", async () => {
    (prisma.loan.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        ...loanData,
      },
    ]);

    const result = await loanRepository.getAllLoans();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe(loanData.name);
    expect(result[0].returned).toBe(loanData.returned);
  });

  it("should get a loan by id", async () => {
    (prisma.loan.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      ...loanData,
    });

    const result = await loanRepository.getLoanById(1);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned);
  });

  it("should update a loan", async () => {
    (prisma.loan.update as jest.Mock).mockResolvedValue({
      id: 1,
      ...loanData,
    });

    const result = await loanRepository.updateLoan(1, loanData);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned);
  });

  it("should delete a loan", async () => {
    (prisma.loan.delete as jest.Mock).mockResolvedValue({
      id: 1,
      ...loanData,
    });

    const result = await loanRepository.deleteLoan(1);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned);
  });
});
