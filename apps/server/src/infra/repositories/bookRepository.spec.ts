import { BookRepository } from "@/infra/repositories/bookRepository";
import { Book } from "@/core/domain/entities/bookEntity";
import prisma from "@/infra/prisma/client";

jest.mock("@/infra/prisma/client", () => ({
  book: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockBookData = {
  id: 1,
  name: "Test Book",
  author: "Test Author",
  number: 2222,
  quantity: 10,
  gender: "Fiction",
};

const mockBook = new Book(
  mockBookData.id,
  mockBookData.name,
  mockBookData.number,
  mockBookData.author,
  mockBookData.gender,
  mockBookData.quantity
);

describe("Book Repository", () => {
  let bookRepository: BookRepository;

  beforeEach(() => {
    bookRepository = new BookRepository();
    jest.clearAllMocks();
  });

  it("should create a book", async () => {
    (prisma.book.findFirst as jest.Mock).mockResolvedValue(null); // Simula que não existe livro
    (prisma.book.create as jest.Mock).mockResolvedValue(mockBookData);

    const result = await bookRepository.createBook({
      name: mockBookData.name,
      author: mockBookData.author,
      number: mockBookData.number,
      quantity: mockBookData.quantity,
      gender: mockBookData.gender,
    });

    expect(prisma.book.findFirst).toHaveBeenCalledWith({
      where: { number: mockBookData.number },
    });
    expect(prisma.book.create).toHaveBeenCalledWith({
      data: {
        name: mockBookData.name,
        author: mockBookData.author,
        number: mockBookData.number,
        quantity: mockBookData.quantity,
        gender: mockBookData.gender,
      },
    });
    expect(result).toEqual(mockBook);
  });

  it("should throw an error when trying to create a book with an existing number", async () => {
    (prisma.book.findFirst as jest.Mock).mockResolvedValue(mockBookData); // Simula que já existe um livro

    await expect(
      bookRepository.createBook({
        name: mockBookData.name,
        author: mockBookData.author,
        number: mockBookData.number,
        quantity: mockBookData.quantity,
        gender: mockBookData.gender,
      })
    ).rejects.toThrow("A book with this number already exists");

    expect(prisma.book.findFirst).toHaveBeenCalledWith({
      where: { number: mockBookData.number },
    });
    expect(prisma.book.create).not.toHaveBeenCalled(); // Certifique-se de que create não foi chamado
  });

  it("should get all books", async () => {
    (prisma.book.findMany as jest.Mock).mockResolvedValue([mockBookData]);

    const result = await bookRepository.getAllBooks();

    expect(prisma.book.findMany).toHaveBeenCalled();
    expect(result).toEqual([mockBook]);
  });

  it("should get a book by id", async () => {
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBookData);

    const result = await bookRepository.getBookById(1);

    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockBook);
  });

  it("should throw an error when getting a book by an unknown id", async () => {
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(null); // Simula que o livro não foi encontrado

    await expect(bookRepository.getBookById(999)).rejects.toThrow(
      "Book not found"
    );
    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it("should update a book partially", async () => {
    const updatedData = { quantity: 15 };
    const updatedBookData = { ...mockBookData, ...updatedData };
    const updatedBook = new Book(
      updatedBookData.id,
      updatedBookData.name,
      updatedBookData.number,
      updatedBookData.author,
      updatedBookData.gender,
      updatedBookData.quantity
    );

    (prisma.book.update as jest.Mock).mockResolvedValue(updatedBookData);

    const result = await bookRepository.updateBook(1, updatedData);

    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
    expect(result).toEqual(updatedBook);
  });

  it("should delete a book", async () => {
    (prisma.book.delete as jest.Mock).mockResolvedValue(mockBookData);

    const result = await bookRepository.deleteBook(1);

    expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockBook);
  });
});
