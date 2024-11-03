import prisma from "@/infra/prisma/client";
import { Loan } from "@/core/domain/entities/loanEntity";
import { notifyClients } from "@/infra/socket/server";

type LoanInput = {
  name: string;
  seriesCourse: string;
  startDate: Date;
  returnDate: Date;
  bookId: number;
  returned: boolean;
};

export class LoanRepository {
  async createLoan(data: LoanInput): Promise<Loan> {
    const loan = await prisma.loan.create({
      data: {
        name: data.name,
        seriesCourse: data.seriesCourse,
        startDate: data.startDate,
        returnDate: data.returnDate,
        bookId: data.bookId,
        returned: data.returned,
      },
    });
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async updateLoan(id: number, data: Partial<LoanInput>): Promise<Loan> {
    const existingLoan = await this.getLoanById(id);

    if (existingLoan.returned && data.returned) {
      throw new Error("This loan has already been returned.");
    }

    if (data.returned !== undefined && data.returned) {
      // Atualiza o empréstimo como devolvido
      await prisma.loan.update({
        where: { id },
        data: { returned: true },
      });

      // Notifica os clientes via socket sobre a devolução
      notifyClients("loanReturned", existingLoan);

      return new Loan(
        existingLoan.id,
        existingLoan.name,
        existingLoan.seriesCourse,
        existingLoan.startDate,
        existingLoan.returnDate,
        true,
        existingLoan.bookId
      );
    }

    // Caso não esteja devolvendo, realiza a atualização normalmente
    const loan = await prisma.loan.update({ where: { id }, data });

    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async getAllLoans(): Promise<Loan[]> {
    const loans = await prisma.loan.findMany();
    return loans.map(
      (loan) =>
        new Loan(
          loan.id,
          loan.name,
          loan.seriesCourse,
          loan.startDate,
          loan.returnDate,
          loan.returned,
          loan.bookId
        )
    );
  }

  async getLoanById(id: number): Promise<Loan> {
    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) throw new Error("Loan not found");
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async deleteLoan(id: number): Promise<Loan> {
    const loan = await prisma.loan.delete({ where: { id } });
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async getOverdueLoans(): Promise<Loan[]> {
    const currentDate = new Date();
    const loans = await prisma.loan.findMany({
      where: {
        returned: false,
        returnDate: {
          lt: currentDate,
        },
      },
    });

    return loans.map(
      (loan) =>
        new Loan(
          loan.id,
          loan.name,
          loan.seriesCourse,
          loan.startDate,
          loan.returnDate,
          loan.returned,
          loan.bookId
        )
    );
  }
}
