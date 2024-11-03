import { BookRepository } from "@/infra/repositories/bookRepository";

jest.mock("@/infra/repositories/bookRepository");

const mockBook = {
  id: 1,
  name: "Test Book",
  author: "Test Author",
  number: 2222,
  quantity: 10,
  gender: "Fiction",
  isAvailable: true,
  reduceQuantity: () => {},
  increaseQuantity: () => {},
};

describe("Book Use Case", () => {
  let bookRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    bookRepository = new BookRepository() as jest.Mocked<BookRepository>;
  });

  it("should create a book", async () => {
    bookRepository.createBook.mockResolvedValue(mockBook);

    const result = await bookRepository.createBook({
      name: mockBook.name,
      author: mockBook.author,
      number: mockBook.number,
      quantity: mockBook.quantity,
      gender: mockBook.gender,
    });
    expect(result).toEqual(mockBook);
    expect(bookRepository.createBook).toHaveBeenCalledWith({
      name: mockBook.name,
      author: mockBook.author,
      number: mockBook.number,
      quantity: mockBook.quantity,
      gender: mockBook.gender,
    });
  });

  it("should get all books", async () => {
    bookRepository.getAllBooks.mockResolvedValue([mockBook]);

    const result = await bookRepository.getAllBooks();
    expect(result).toEqual([mockBook]);
    expect(bookRepository.getAllBooks).toHaveBeenCalled();
  });

  it("should get a book by id", async () => {
    bookRepository.getBookById.mockResolvedValue(mockBook);

    const result = await bookRepository.getBookById(1);
    expect(result).toEqual(mockBook);
    expect(bookRepository.getBookById).toHaveBeenCalledWith(1);
  });

  it("should update a book", async () => {
    const updatedBook = { ...mockBook, quantity: 15 };
    bookRepository.updateBook.mockResolvedValue(updatedBook);

    const result = await bookRepository.updateBook(1, { quantity: 15 });
    expect(result).toEqual(updatedBook);
    expect(bookRepository.updateBook).toHaveBeenCalledWith(1, { quantity: 15 });
  });

  it("should delete a book", async () => {
    bookRepository.deleteBook.mockResolvedValue(mockBook);

    const result = await bookRepository.deleteBook(1);
    expect(result).toEqual(mockBook);
    expect(bookRepository.deleteBook).toHaveBeenCalledWith(1);
  });
});
