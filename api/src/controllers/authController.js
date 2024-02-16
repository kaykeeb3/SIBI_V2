const jwt = require("jsonwebtoken");

async function login({ nome, senha }, prisma) {
  try {
    const user = await prisma.user.findUnique({
      where: { nome, senha },
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token gerado:", token);

    return token; // Retorna apenas o token
  } catch (error) {
    console.error("Erro durante o login:", error);
    throw new Error(`Erro durante o login: ${error.message}`);
  }
}

async function getUserProfile(userId, prisma) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nome: true },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    console.error("Erro ao obter o perfil do usuário:", error);
    throw new Error(`Erro ao obter o perfil do usuário: ${error.message}`);
  }
}

module.exports = { login, getUserProfile };
