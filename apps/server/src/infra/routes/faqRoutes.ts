import { FAQController } from "@/interfaces/http/controllers/FAQController";
import express, { Router } from "express";

const faqRoutes: Router = express.Router();
const faqController = new FAQController();

faqRoutes.post("/", faqController.store.bind(faqController));
faqRoutes.get("/", faqController.fetchAll.bind(faqController));
faqRoutes.put("/:id", faqController.modify.bind(faqController));
faqRoutes.delete("/:id", faqController.remove.bind(faqController));
faqRoutes.post("/respond", faqController.handle.bind(faqController));

export default faqRoutes;
