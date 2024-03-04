const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { validateLivroInput } = require("../middlewares/bookMiddleware");

// Rota para listar todos os livros
router.get("/", bookController.listarLivros);

// Rota para cadastrar um novo livro
router.post("/", validateLivroInput, bookController.cadastrarLivro);

// Rota para editar um livro pelo ID
router.put("/:id", validateLivroInput, bookController.editarLivro);

// Rota para deletar um livro pelo ID
router.delete("/:id", bookController.deletarLivro);

// Rota para contar livros disponíveis
router.get("/disponiveis", bookController.contarLivrosDisponiveis);

module.exports = router;
