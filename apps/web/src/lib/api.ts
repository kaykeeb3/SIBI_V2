import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Função para interceptar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado, deslogar usuário
      localStorage.removeItem("token");

      // Redirecionar para a página inicial
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
