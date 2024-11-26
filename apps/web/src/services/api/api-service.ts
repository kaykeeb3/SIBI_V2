import api from "@/lib/api";
import socketService from "../socket/socket-service";

/**
 * Interfaces para tipagem de dados
 */
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

interface BookData {
  id: number;
  name: string;
  number: number;
  author: string;
  gender: string;
  quantity: number;
  isAvailable: boolean;
}

interface EquipmentData {
  id: number;
  name: string;
  quantity: number;
  isAvailable: boolean;
}

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  institution: string;
  limit: number;
  role: string;
  email: string;
  password: string;
  phone: string;
  profilePicture: string;
}

interface ProfileUpdateParams {
  name: string;
  profilePicture: string;
}

/**
 * Tipos de status do sistema
 */
interface StatusResponse {
  libraryStatus: string;
  servicesStatus: string;
  api: string;
  webSystem: string;
  database: string;
  notifications: string;
  incidents: {
    date: string;
    dayOfWeek: string;
    message: string;
    icon: string;
  }[];
}

/**
 * Serviços de Autenticação
 */
export const login = async (data: LoginParams) => {
  const response = await api.post("/auth/login", data);
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    socketService.connect();
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  socketService.disconnect();
};

export const register = async (data: RegisterParams) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  try {
    const response = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
};

export const updateProfile = async (
  userId: string,
  data: ProfileUpdateParams
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.put(`/auth/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Serviços de Livros
 */
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

/**
 * Serviços de Equipamentos
 */
export const getAllEquipments = async (): Promise<EquipmentData[]> => {
  try {
    const response = await api.get("/equipments");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar equipamentos:", error);
    throw new Error("Erro ao buscar dados dos equipamentos.");
  }
};

/**
 * Serviços de Empréstimos e Agendamentos
 */
export const getAllLoans = async (): Promise<LoanData[]> => {
  try {
    const response = await api.get("/loans");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empréstimos:", error);
    throw new Error("Erro ao buscar dados dos empréstimos.");
  }
};

export const getAllSchedules = async (): Promise<ScheduleData[]> => {
  try {
    const response = await api.get("/schedules");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw new Error("Erro ao buscar dados dos agendamentos.");
  }
};

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

/**
 * Função para verificar o status da biblioteca e dos serviços
 */
export const getStatus = async (): Promise<StatusResponse> => {
  try {
    const counts = await getCounts();
    const { loans, schedules } = await fetchLoanAndScheduleData();

    const libraryStatus =
      counts.books > 0 && counts.equipments > 0 ? "Operacional" : "Erro";
    const servicesStatus =
      loans.length > 0 && schedules.length > 0
        ? "Operacional"
        : "Indisponibilidade parcial";
    const apiStatus =
      counts.books >= 0 && counts.equipments >= 0
        ? "Operacional"
        : "Erro na API";
    const webSystemStatus =
      counts.books > 0 && loans.length > 0
        ? "Operacional"
        : "Indisponibilidade parcial";
    const databaseStatus =
      counts.books > 0 && counts.equipments > 0
        ? "Operacional"
        : "Erro no Banco de Dados";
    const notificationsStatus = socketService.getConnectionStatus();

    const incidents = [];

    const date = new Date();
    const dayOfWeek = date.toLocaleDateString("pt-BR", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("pt-BR");

    if (notificationsStatus === "Erro") {
      incidents.push({
        date: formattedDate,
        dayOfWeek: dayOfWeek,
        message: "Erro nas notificações",
        icon: "!",
      });
    } else {
      incidents.push({
        date: formattedDate,
        dayOfWeek: dayOfWeek,
        message: "Notificações operacionais",
        icon: "✔",
      });
    }

    return {
      libraryStatus,
      servicesStatus,
      api: apiStatus,
      webSystem: webSystemStatus,
      database: databaseStatus,
      notifications: notificationsStatus,
      incidents: incidents,
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return {
      libraryStatus: "Erro",
      servicesStatus: "Erro",
      api: "Erro",
      webSystem: "Erro",
      database: "Erro",
      notifications: "Erro",
      incidents: [
        {
          date: "N/A",
          dayOfWeek: "N/A",
          message: "Erro ao carregar os dados.",
          icon: "!",
        },
      ],
    };
  }
};

/**
 * Serviços Gerais
 */
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

export const fetchHomeData = async (): Promise<CountData> => {
  return await getCounts();
};
