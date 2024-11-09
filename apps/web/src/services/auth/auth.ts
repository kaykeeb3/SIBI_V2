import api from "@/lib/api";

interface LoginParams {
  email: string;
  password: string;
}

export const login = async (data: LoginParams) => {
  const response = await api.post("/auth/login", data);
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};
