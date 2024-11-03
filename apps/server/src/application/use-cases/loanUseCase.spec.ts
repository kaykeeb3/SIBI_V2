import { Loan } from "@/core/domain/entities/loanEntity";
import * as loanService from "@/application/use-cases/loanUseCase";
import { LoanRepository } from "@/infra/repositories/loanRepository";
import { BookRepository } from "@/infra/repositories/bookRepository";
import { Book } from "@/core/domain/entities/bookEntity";

jest.mock("@/infra/repositories/loanRepository");
jest.mock("@/infra/repositories/bookRepository");

const mockLoanRepository = LoanRepository as jest.MockedClass<
  typeof LoanRepository
>;
const mockBookRepository = BookRepository as jest.MockedClass<
  typeof BookRepository
>;

describe("Loan Use Case", () => {
  const loanData = {
    name: "John Doe",
    seriesCourse: "8th Grade",
    startDate: new Date(),
    returnDate: new Date(),
    bookId: 1,
    returned: false, // Adicionando a propriedade 'returned' aqui
  };

  const bookData = {
    id: 1,
    name: "Book Title",
    number: 1234,
    author: "Author Name",
    gender: "Fiction",
    quantity: 3,
    isAvailable: true,
  };

  it("should create a loan if book quantity is available", async () => {
    mockBookRepository.prototype.getBookById.mockResolvedValue(
      new Book(
        bookData.id,
        bookData.name,
        bookData.number,
        bookData.author,
        bookData.gender,
        bookData.quantity,
        bookData.isAvailable
      )
    );

    mockLoanRepository.prototype.createLoan.mockResolvedValue(
      new Loan(
        1,
        loanData.name,
        loanData.seriesCourse,
        loanData.startDate,
        loanData.returnDate,
        loanData.returned,
        loanData.bookId
      )
    );

    const result = await loanService.createLoan(loanData);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned); // Verificando a propriedade 'returned'
  });

  it("should not create a loan if book quantity is unavailable", async () => {
    mockBookRepository.prototype.getBookById.mockResolvedValue(
      new Book(
        bookData.id,
        bookData.name,
        bookData.number,
        bookData.author,
        bookData.gender,
        0,
        bookData.isAvailable
      )
    );

    await expect(loanService.createLoan(loanData)).rejects.toThrow(
      "Book not available for loan"
    );
  });

  it("should get all loans", async () => {
    mockLoanRepository.prototype.getAllLoans.mockResolvedValue([
      new Loan(
        1,
        loanData.name,
        loanData.seriesCourse,
        loanData.startDate,
        loanData.returnDate,
        loanData.returned,
        loanData.bookId
      ),
    ]);

    const result = await loanService.getAllLoans();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe(loanData.name);
    expect(result[0].returned).toBe(loanData.returned); // Verificando a propriedade 'returned'
  });

  it("should get a loan by id", async () => {
    mockLoanRepository.prototype.getLoanById.mockResolvedValue(
      new Loan(
        1,
        loanData.name,
        loanData.seriesCourse,
        loanData.startDate,
        loanData.returnDate,
        loanData.returned,
        loanData.bookId
      )
    );

    const result = await loanService.getLoanById(1);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned); // Verificando a propriedade 'returned'
  });

  it("should update a loan", async () => {
    const updatedData = { ...loanData, name: "Jane Doe" };
    mockLoanRepository.prototype.updateLoan.mockResolvedValue(
      new Loan(
        1,
        updatedData.name,
        updatedData.seriesCourse,
        updatedData.startDate,
        updatedData.returnDate,
        updatedData.returned,
        updatedData.bookId
      )
    );

    const result = await loanService.updateLoan(1, { name: "Jane Doe" });
    expect(result.name).toBe(updatedData.name);
    expect(result.returned).toBe(updatedData.returned); // Verificando a propriedade 'returned'
  });

  it("should delete a loan", async () => {
    mockLoanRepository.prototype.deleteLoan.mockResolvedValue(
      new Loan(
        1,
        loanData.name,
        loanData.seriesCourse,
        loanData.startDate,
        loanData.returnDate,
        loanData.returned,
        loanData.bookId
      )
    );

    const result = await loanService.deleteLoan(1);
    expect(result).toBeInstanceOf(Loan);
    expect(result.name).toBe(loanData.name);
    expect(result.returned).toBe(loanData.returned); // Verificando a propriedade 'returned'
  });

  it("should return a book and delete the loan", async () => {
    mockLoanRepository.prototype.getLoanById.mockResolvedValue(
      new Loan(
        1,
        loanData.name,
        loanData.seriesCourse,
        loanData.startDate,
        loanData.returnDate,
        loanData.returned,
        loanData.bookId
      )
    );

    mockBookRepository.prototype.getBookById.mockResolvedValue(
      new Book(
        bookData.id,
        bookData.name,
        bookData.number,
        bookData.author,
        bookData.gender,
        2,
        bookData.isAvailable
      )
    );

    mockLoanRepository.prototype.updateLoan.mockResolvedValue(
      new Loan(
        1,
        loanData.name,
        loanData.seriesCourse,
        loanData.startDate,
        loanData.returnDate,
        true, // Atualizando a propriedade 'returned'
        loanData.bookId
      )
    );

    const result = await loanService.updateLoan(1, { returned: true });
    expect(result.returned).toBe(true);
    expect(mockLoanRepository.prototype.deleteLoan).toHaveBeenCalledWith(1);
  });
});
