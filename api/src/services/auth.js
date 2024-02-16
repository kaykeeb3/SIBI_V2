// auth.js

import axios from "axios";

// Função para fazer login e retornar o token
async function login() {
  try {
    const response = await axios.post("http://localhost:3000/login");
    const { token } = response.data;
    localStorage.setItem("token", token); // Armazenar o token no localStorage
    return token;
  } catch (error) {
    console.error("Erro durante o login:", error.response.data.error);
    throw new Error("Falha ao obter o token");
  }
}

// Função para fazer solicitações autenticadas com o token armazenado no localStorage
async function fetchUserProfile() {
  try {
    const token = localStorage.getItem("token"); // Obter o token do localStorage
    const response = await axios.get("http://localhost:3000/home", {
      headers: { Authorization: `Bearer ${token}` }, // Incluir o token no cabeçalho Authorization
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao obter o perfil do usuário:",
      error.response.data.error
    );
    throw new Error("Erro interno do servidor");
  }
}

// Exemplo de uso
(async () => {
  try {
    const token = await login(); // Realizar o login e obter o token
    console.log("Token:", token);
    const userProfile = await fetchUserProfile(); // Obter o perfil do usuário autenticado
    console.log("Perfil do usuário:", userProfile);
  } catch (error) {
    console.error("Erro:", error.message);
  }
})();

export { login, fetchUserProfile };
