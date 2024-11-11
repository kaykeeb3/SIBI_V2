import api from "@/lib/api";
import socketService from "../socket/socket-service";

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

// Função para login
export const login = async (data: LoginParams) => {
  const response = await api.post("/auth/login", data);
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    socketService.connect();
  }

  return response.data;
};

// Função para logout
export const logout = () => {
  localStorage.removeItem("token");
  socketService.disconnect();
};

// Função para cadastro
export const register = async (data: RegisterParams) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil", error);
    throw error;
  }
};

// Função para atualizar o perfil do usuário
export const updateProfile = async (
  userId: string,
  data: ProfileUpdateParams
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const response = await api.put(`/auth/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
