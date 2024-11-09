import api from "@/lib/api";

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

// Função para login
export const login = async (data: LoginParams) => {
  const response = await api.post("/auth/login", data);
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

// Função para cadastro
export const register = async (data: RegisterParams) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
