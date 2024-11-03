import express, { Router } from "express";
import { EquipmentController } from "@/interfaces/http/controllers/equipmentController";

const router: Router = express.Router();
const equipmentController = new EquipmentController();

router.post("/", equipmentController.create.bind(equipmentController));
router.get("/", equipmentController.getAll.bind(equipmentController));
router.get("/:id", equipmentController.getById.bind(equipmentController));
router.put("/:id", equipmentController.update.bind(equipmentController));
router.delete("/:id", equipmentController.remove.bind(equipmentController));

export default router;
