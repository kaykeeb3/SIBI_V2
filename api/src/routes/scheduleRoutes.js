import express from "express";
import {
  criarAgendamento,
  listarAgendamentos,
  excluirAgendamento,
  atualizarAgendamento,
  marcarDevolvido,
} from "../controllers/scheduleController.js";
import { validarDadosAgendamento } from "../middlewares/scheduleMinddlewares.js";

const router = express.Router();

// Criar um novo agendamento
router.post("/", validarDadosAgendamento, criarAgendamento);

// Listar todos os agendamentos
router.get("/", listarAgendamentos);

// Excluir um agendamento
router.delete("/:id", excluirAgendamento);

// Atualizar um agendamento existente
router.put("/:id", validarDadosAgendamento, atualizarAgendamento);

// Rota para marcar um agendamento como devolvido
router.put("/:id/devolver", marcarDevolvido);

export default router;
