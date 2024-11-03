import { BookRepository } from "@/infra/repositories/bookRepository";
import { Book } from "@/core/domain/entities/bookEntity";

const bookRepository = new BookRepository();

export async function createBook(data: Omit<Book, "id">): Promise<Book> {
  return await bookRepository.createBook(data);
}

export async function getAllBooks(): Promise<Book[]> {
  return await bookRepository.getAllBooks();
}

export async function getBookById(id: number): Promise<Book> {
  return await bookRepository.getBookById(id);
}

export async function updateBook(
  id: number,
  data: Partial<Omit<Book, "id">>
): Promise<Book> {
  return await bookRepository.updateBook(id, data);
}

export async function deleteBook(id: number): Promise<Book> {
  return await bookRepository.deleteBook(id);
}
