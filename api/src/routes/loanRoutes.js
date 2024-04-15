import express from "express";
import {
  listarEmprestimos,
  criarEmprestimo,
  atualizarEmprestimo,
  excluirEmprestimo,
  marcarDevolvido,
  listarEmprestimosAtrasados,
} from "../controllers/loanController.js";

const router = express.Router();

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
router.get("/atrasados", listarEmprestimosAtrasados);

export default router;
