// routes/equipmentRoutes.js
const express = require("express");
const router = express.Router();
const {
  cadastrarEquipamento,
  listarEquipamentos,
  obterEquipamentoPorId,
  atualizarEquipamento,
  excluirEquipamento,
} = require("../controllers/equipmentController");
const { validateEquipment } = require("../middlewares/equipmentMiddleware");

// Rota para cadastrar um novo equipamento
router.post("/", validateEquipment, cadastrarEquipamento);

// Rota para listar todos os equipamentos
router.get("/", listarEquipamentos);

// Rota para obter um equipamento pelo ID
router.get("/:id", obterEquipamentoPorId);

// Rota para atualizar um equipamento pelo ID
router.put("/:id", validateEquipment, atualizarEquipamento);

// Rota para excluir um equipamento pelo ID
router.delete("/:id", excluirEquipamento);

module.exports = router;
