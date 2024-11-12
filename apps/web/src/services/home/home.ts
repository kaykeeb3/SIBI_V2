import api from "@/lib/api";

interface CountData {
  books: number;
  loans: number;
  schedules: number;
  equipments: number;
}

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const getAllLoans = async () => {
  const response = await api.get("/loans");
  return response.data;
};

export const getAllSchedules = async () => {
  const response = await api.get("/schedules");
  return response.data;
};

export const getAllEquipments = async () => {
  const response = await api.get("/equipments");
  return response.data;
};

export const getCounts = async (): Promise<CountData> => {
  try {
    const [books, loans, schedules, equipments] = await Promise.all([
      getAllBooks(),
      getAllLoans(),
      getAllSchedules(),
      getAllEquipments(),
    ]);

    return {
      books: books.length,
      loans: loans.length,
      schedules: schedules.length,
      equipments: equipments.length,
    };
  } catch (error) {
    console.error("Erro ao buscar contagens:", error);
    throw new Error("Erro ao buscar contagens de dados.");
  }
};

export const fetchHomeData = async (): Promise<CountData> => {
  return await getCounts();
};
