import api from "@/lib/api";

// Interface atualizada para incluir "date" e garantir consistência.
interface CountData {
  books: number;
  loans: number;
  schedules: number;
  equipments: number;
  date: string;
}

interface LoanData {
  name: string;
  seriesCourse: string;
  startDate: string;
  returnDate: string;
  returned: boolean;
  bookId: number;
}

interface ScheduleData {
  name: string;
  quantity: number;
  startDate: string;
  returnDate: string;
  weekDay: string;
  equipmentId: number;
  returned: boolean;
  type: string;
}

// Função para buscar todos os livros.
export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

// Função para buscar todos os empréstimos.
export const getAllLoans = async () => {
  const response = await api.get("/loans");
  return response.data;
};

// Função para buscar todos os agendamentos.
export const getAllSchedules = async () => {
  const response = await api.get("/schedules");
  return response.data;
};

// Função para buscar todos os equipamentos.
export const getAllEquipments = async () => {
  const response = await api.get("/equipments");
  return response.data;
};

// Função para buscar contagens de itens e registrar a data atual.
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
      date: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Erro ao buscar contagens:", error);
    throw new Error("Erro ao buscar contagens de dados.");
  }
};

// Função para buscar dados principais para a página inicial.
export const fetchHomeData = async (): Promise<CountData> => {
  return await getCounts();
};

// Função para buscar dados completos de empréstimos e agendamentos.
export const fetchLoanAndScheduleData = async (): Promise<{
  loans: LoanData[];
  schedules: ScheduleData[];
}> => {
  try {
    const [loansResponse, schedulesResponse] = await Promise.all([
      api.get("/loans"),
      api.get("/schedules"),
    ]);

    return {
      loans: loansResponse.data,
      schedules: schedulesResponse.data,
    };
  } catch (error) {
    console.error("Erro ao buscar dados de empréstimos e agendamentos:", error);
    throw new Error("Erro ao buscar dados completos.");
  }
};
