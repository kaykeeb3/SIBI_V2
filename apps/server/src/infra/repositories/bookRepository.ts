import prisma from "@/infra/prisma/client";
import { Book } from "@/core/domain/entities/bookEntity";

type BookInput = {
  name: string;
  number: number;
  author: string;
  gender: string;
  quantity: number;
};

export class BookRepository {
  async createBook(data: BookInput): Promise<Book> {
    const existingBook = await prisma.book.findFirst({
      where: { number: data.number },
    });

    if (existingBook) {
      throw new Error("A book with this number already exists");
    }

    const book = await prisma.book.create({
      data: {
        name: data.name,
        number: data.number,
        author: data.author,
        gender: data.gender,
        quantity: data.quantity,
      },
    });

    return new Book(
      book.id,
      book.name,
      book.number,
      book.author,
      book.gender,
      book.quantity
    );
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await prisma.book.findMany();
    return books.map(
      (book) =>
        new Book(
          book.id,
          book.name,
          book.number,
          book.author,
          book.gender,
          book.quantity
        )
    );
  }

  async getBookById(id: number): Promise<Book> {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) throw new Error("Book not found");
    return new Book(
      book.id,
      book.name,
      book.number,
      book.author,
      book.gender,
      book.quantity
    );
  }

  async updateBook(id: number, data: Partial<BookInput>): Promise<Book> {
    const book = await prisma.book.update({ where: { id }, data });
    return new Book(
      book.id,
      book.name,
      book.number,
      book.author,
      book.gender,
      book.quantity
    );
  }

  async deleteBook(id: number): Promise<Book> {
    const book = await prisma.book.delete({ where: { id } });
    return new Book(
      book.id,
      book.name,
      book.number,
      book.author,
      book.gender,
      book.quantity
    );
  }
}
