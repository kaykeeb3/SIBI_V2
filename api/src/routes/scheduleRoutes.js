const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const {
  validarDadosAgendamento,
} = require("../middlewares/scheduleMinddlewares");

const {
  criarAgendamento,
  listarAgendamentos,
  excluirAgendamento,
  atualizarAgendamento,
  marcarDevolvido, // Adicionando a função para marcar como devolvido
} = scheduleController;

// Criar um novo agendamento
router.post("/", validarDadosAgendamento, criarAgendamento);

// Listar todos os agendamentos
router.get("/", listarAgendamentos);

// Excluir um agendamento
router.delete("/:id", excluirAgendamento);

// Atualizar um agendamento existente
router.put("/:id", validarDadosAgendamento, atualizarAgendamento); // Usar o middleware de validação antes de atualizar

// Rota para marcar um agendamento como devolvido
router.put("/:id/devolver", marcarDevolvido);

module.exports = router;
