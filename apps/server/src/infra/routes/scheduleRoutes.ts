import express, { Router } from "express";
import { ScheduleController } from "@/interfaces/http/controllers/scheduleController";

const router: Router = express.Router();
const scheduleController = new ScheduleController();

router.post("/", scheduleController.create.bind(scheduleController));
router.get("/", scheduleController.getAll.bind(scheduleController));
router.get("/:id", scheduleController.getById.bind(scheduleController));
router.put("/:id", scheduleController.update.bind(scheduleController));
router.delete("/:id", scheduleController.delete.bind(scheduleController));

export default router;
