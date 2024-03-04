const equipmentRoutes = require("./routes/equipmentRoutes");
const bookRoutes = require("./routes/bookRoutes");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("./middlewares/authMiddleware");
const { login, getUserProfile } = require("./controllers/authController");

const loanRoutes = require("./routes/loanRoutes"); // Importe as rotas de empréstimos

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/login", async (req, res) => {
  try {
    const token = await login(req.body, prisma);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Login bem-sucedido" });
  } catch (error) {
    console.error("Erro durante o login:", error.message);
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

app.get("/home", authenticateToken, async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.user.userId, prisma);
    res.json(userProfile);
  } catch (error) {
    console.error("Erro ao obter o perfil do usuário:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rotas para operações CRUD de livros
app.use("/livros", bookRoutes);

// Utilize as rotas de empréstimos
app.use("/emprestimos", loanRoutes);

// Rotas para operações CRUD de equipamentos
app.use("/equipamentos", equipmentRoutes);

app.use((err, req, res, next) => {
  console.error("Erro interno do servidor:", err.message);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT} 🚀`);
});
