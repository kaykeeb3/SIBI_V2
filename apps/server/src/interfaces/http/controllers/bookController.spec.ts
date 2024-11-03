import { BookController } from "@/interfaces/http/controllers/bookController";
import { Request, Response } from "express";
import * as bookService from "@/application/use-cases/bookUseCase";

jest.mock("@/application/use-cases/bookUseCase");

describe("Book Controller", () => {
  const bookController = new BookController();
  const mockRequest = (body = {}, params = {}) =>
    ({
      body,
      params,
    }) as Request;

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a book", async () => {
    const book = { id: 1, name: "Test Book" };
    (bookService.createBook as jest.Mock).mockResolvedValue(book);
    const req = mockRequest(book);
    const res = mockResponse();

    await bookController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(book);
  });

  it("should get all books", async () => {
    const books = [{ id: 1, name: "Test Book" }];
    (bookService.getAllBooks as jest.Mock).mockResolvedValue(books);
    const req = mockRequest();
    const res = mockResponse();

    await bookController.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(books);
  });

  it("should get a book by id", async () => {
    const book = { id: 1, name: "Test Book" };
    (bookService.getBookById as jest.Mock).mockResolvedValue(book);
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();

    await bookController.getById(req, res);

    expect(res.json).toHaveBeenCalledWith(book);
  });

  it("should update a book", async () => {
    const updatedBook = { id: 1, name: "Updated Book" };
    (bookService.updateBook as jest.Mock).mockResolvedValue(updatedBook);
    const req = mockRequest(updatedBook, { id: 1 });
    const res = mockResponse();

    await bookController.update(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedBook);
  });

  it("should delete a book", async () => {
    const book = { id: 1, name: "Test Book" };
    (bookService.deleteBook as jest.Mock).mockResolvedValue(book);
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();

    await bookController.remove(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Book deleted",
      id: book.id,
    });
  });
});
