import express from "express";
import { validateLivroInput } from "../middlewares/bookMiddleware.js";
import {
  listarLivros,
  cadastrarLivro,
  editarLivro,
  deletarLivro,
  contarLivrosDisponiveis,
} from "../controllers/bookController.js";

const router = express.Router();

// Rotas para operações CRUD de livros
router.get("/", listarLivros);
router.post("/", validateLivroInput, cadastrarLivro);
router.put("/:id", validateLivroInput, editarLivro);
router.delete("/:id", deletarLivro);
router.get("/disponiveis", contarLivrosDisponiveis);

export default router;
