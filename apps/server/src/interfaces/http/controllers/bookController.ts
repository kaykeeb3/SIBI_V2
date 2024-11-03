import { Request, Response } from "express";
import * as bookService from "@/application/use-cases/bookUseCase";

export class BookController {
  async create(req: Request, res: Response) {
    try {
      const book = await bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const book = await bookService.getBookById(Number(req.params.id));
      if (!book) {
        res.status(404).json({ error: "Book not found" });
        return;
      }
      res.json(book);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const book = await bookService.updateBook(
        Number(req.params.id),
        req.body
      );
      res.json(book);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const book = await bookService.deleteBook(Number(req.params.id));
      res.json({ message: "Book deleted", id: book.id });
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
