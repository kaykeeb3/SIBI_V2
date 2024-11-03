import express, { Router } from "express";
import { BookController } from "@/interfaces/http/controllers/bookController";

const router: Router = express.Router();
const bookController = new BookController();

router.post("/", bookController.create.bind(bookController));
router.get("/", bookController.getAll.bind(bookController));
router.get("/:id", bookController.getById.bind(bookController));
router.put("/:id", bookController.update.bind(bookController));
router.delete("/:id", bookController.remove.bind(bookController));

export default router;
