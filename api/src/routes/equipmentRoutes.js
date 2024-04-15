import express from "express";
import { validateEquipment } from "../middlewares/equipmentMiddleware.js";
import {
  cadastrarEquipamento,
  listarEquipamentos,
  obterEquipamentoPorId,
  atualizarEquipamento,
  excluirEquipamento,
} from "../controllers/equipmentController.js";

const router = express.Router();

router.post("/", validateEquipment, cadastrarEquipamento);
router.get("/", listarEquipamentos);
router.get("/:id", obterEquipamentoPorId);
router.put("/:id", validateEquipment, atualizarEquipamento);
router.delete("/:id", excluirEquipamento);

export default router;
