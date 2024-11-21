import api from "@/lib/api";

interface BookData {
  id: number;
  name: string;
  number: number;
  author: string;
  gender: string;
  quantity: number;
  isAvailable: boolean;
}

export const getAllBooks = async (): Promise<BookData[]> => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw new Error("Erro ao buscar dados dos livros.");
  }
};

export const getBookById = async (id: number): Promise<BookData> => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o livro com id ${id}:`, error);
    throw new Error(`Erro ao buscar o livro com id ${id}.`);
  }
};

export const createBook = async (book: BookData): Promise<BookData> => {
  try {
    const response = await api.post("/books", book);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    throw new Error("Erro ao criar livro.");
  }
};

export const updateBookById = async (
  id: number,
  book: BookData
): Promise<BookData> => {
  try {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o livro com id ${id}:`, error);
    throw new Error(`Erro ao atualizar o livro com id ${id}.`);
  }
};

export const deleteBookById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir o livro com id ${id}:`, error);
    throw new Error(`Erro ao excluir o livro com id ${id}.`);
  }
};
