import { LoanController } from "@/interfaces/http/controllers/loanController";
import { Request, Response } from "express";
import * as loanService from "@/application/use-cases/loanUseCase";

jest.mock("@/application/use-cases/loanUseCase");

describe("Loan Controller", () => {
  const loanController = new LoanController();

  const mockRequest = (data: any) =>
    ({
      body: data,
      params: { id: "1" },
    }) as Partial<Request>;

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it("should create a loan", async () => {
    const req = mockRequest({
      name: "John Doe",
      seriesCourse: "8th Grade",
      startDate: new Date(),
      returnDate: new Date(),
      bookId: 1,
    });
    const res = mockResponse();
    (loanService.createLoan as jest.Mock).mockResolvedValue(req.body);

    await loanController.create(req as Request, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("should get all loans", async () => {
    const req = mockRequest({});
    const res = mockResponse();
    (loanService.getAllLoans as jest.Mock).mockResolvedValue([]);

    await loanController.getAll(req as Request, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should get a loan by id", async () => {
    const req = mockRequest({});
    const res = mockResponse();
    (loanService.getLoanById as jest.Mock).mockResolvedValue(req.body);

    await loanController.getById(req as Request, res);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("should update a loan", async () => {
    const req = mockRequest({ name: "Jane Doe" });
    const res = mockResponse();
    (loanService.updateLoan as jest.Mock).mockResolvedValue(req.body);

    await loanController.update(req as Request, res);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("should remove a loan", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    // Mockando o retorno correto da função deleteLoan
    (loanService.deleteLoan as jest.Mock).mockResolvedValue({ id: 1 });

    await loanController.remove(req as Request, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Loan deleted", id: 1 });
  });
});
