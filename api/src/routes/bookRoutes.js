// routes/bookRoutes.js

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validateLivroInput } = require("../middlewares/bookMiddleware");
const bookController = require("../controllers/bookController");

router.post(
  "/livros",
  authenticateToken,
  validateLivroInput,
  async (req, res) => {
    try {
      const livroData = req.body;
      const livroCadastrado = await bookController.cadastrarLivro(livroData);

      res.status(201).json({ livro: livroCadastrado });
    } catch (error) {
      console.log("Error during livro creation:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
