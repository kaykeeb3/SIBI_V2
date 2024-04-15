import axios from "axios"; // Correção da importação

async function login() {
  try {
    const response = await axios.post("https://sibi-api.vercel.app/login");
    const { token } = response.data;
    return token;
  } catch (error) {
    console.error("Erro durante o login:", error.message); // Alterado para console.error para melhorar a visibilidade do erro
    throw new Error("Unauthorized"); // Corrigido para lançar o erro com a mensagem correta
  }
}

async function fetchUserProfile() {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      throw new Error("Token não encontrado. Por favor, faça login primeiro.");
    }
    const response = await axios.get("https://sibi-api.vercel.app/home", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao obter o perfil do usuário:", error.message); // Alterado para console.error para melhorar a visibilidade do erro
    throw error; // Lança o erro original em vez de criar um novo com mensagem fixa
  }
}

function getTokenFromLocalStorage() {
  return process.env.TOKEN === "null" ? null : process.env.TOKEN; // Verifica se o token é "null" e retorna null, caso contrário, retorna o valor do token
}

export { login, fetchUserProfile, getTokenFromLocalStorage }; // Correção da exportação
