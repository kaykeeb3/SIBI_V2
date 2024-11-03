import { LoanRepository } from "@/infra/repositories/loanRepository";
import { BookRepository } from "@/infra/repositories/bookRepository";
import { Loan } from "@/core/domain/entities/loanEntity";

const loanRepository = new LoanRepository();
const bookRepository = new BookRepository();

export async function createLoan(
  data: Omit<Loan, "id"> & { returned?: boolean }
): Promise<Loan> {
  const book = await bookRepository.getBookById(data.bookId);
  if (!book || book.quantity <= 0) {
    throw new Error("Book not available for loan");
  }

  book.reduceQuantity();
  await bookRepository.updateBook(book.id, { quantity: book.quantity });

  // Define "returned" como false se não for fornecido
  const loanData = { ...data, returned: data.returned ?? false };

  const loan = await loanRepository.createLoan(loanData);
  return loan;
}

export async function getAllLoans(): Promise<Loan[]> {
  return await loanRepository.getAllLoans();
}

export async function getLoanById(id: number): Promise<Loan> {
  return await loanRepository.getLoanById(id);
}

export async function updateLoan(
  id: number,
  data: Partial<Omit<Loan, "id">>
): Promise<Loan> {
  const loan = await loanRepository.getLoanById(id);

  if (data.returned && loan.returned) {
    throw new Error("Loan has already been returned");
  }

  if (data.returned) {
    const book = await bookRepository.getBookById(loan.bookId);
    book.increaseQuantity();
    await bookRepository.updateBook(book.id, { quantity: book.quantity });

    await loanRepository.deleteLoan(id);
    return { ...loan, returned: true };
  }

  return await loanRepository.updateLoan(id, data);
}

export async function deleteLoan(id: number): Promise<Loan> {
  return await loanRepository.deleteLoan(id);
}
