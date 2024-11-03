import express, { Router } from "express";
import { LoanController } from "@/interfaces/http/controllers/loanController";

const router: Router = express.Router();
const loanController = new LoanController();

router.post("/", loanController.create.bind(loanController));
router.get("/", loanController.getAll.bind(loanController));
router.get("/:id", loanController.getById.bind(loanController));
router.put("/:id", loanController.update.bind(loanController));
router.delete("/:id", loanController.remove.bind(loanController));

export default router;
