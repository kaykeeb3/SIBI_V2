import { Request, Response } from "express";
import * as loanService from "@/application/use-cases/loanUseCase";

export class LoanController {
  async create(req: Request, res: Response) {
    try {
      const loan = await loanService.createLoan(req.body);
      res.status(201).json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const loans = await loanService.getAllLoans();
      res.json(loans);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const loan = await loanService.getLoanById(Number(req.params.id));
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      res.json(loan);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const loan = await loanService.updateLoan(
        Number(req.params.id),
        req.body
      );
      res.json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const loan = await loanService.deleteLoan(Number(req.params.id));
      res.json({ message: "Loan deleted", id: loan.id });
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
