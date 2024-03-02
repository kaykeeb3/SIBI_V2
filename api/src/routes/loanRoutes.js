// loanRoutes.js

const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

// Destructuring das funções do loanController
const {
  listarEmprestimos,
  criarEmprestimo,
  atualizarEmprestimo,
  excluirEmprestimo,
  marcarDevolvido,
  listarEmprestimosAtrasados, // Adicionando a nova função do controller
} = loanController;

// Listar todos os empréstimos
router.get("/", listarEmprestimos);

// Criar um novo empréstimo
router.post("/", criarEmprestimo);

// Atualizar um empréstimo existente
router.put("/:id", atualizarEmprestimo);

// Excluir um empréstimo
router.delete("/:id", excluirEmprestimo);

// Marcar empréstimo como devolvido
router.put("/:id/devolver", marcarDevolvido);

// Listar empréstimos atrasados
router.get("/atrasados", listarEmprestimosAtrasados); // Nova rota para listar empréstimos atrasados

module.exports = router;
