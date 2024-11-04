import express, { Router } from "express";
import { AuthController } from "@/interfaces/http/controllers/authController";

const router: Router = express.Router();
const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/profile", authController.verifyAccess.bind(authController));
router.get("/verify", authController.verifyAccess.bind(authController));
router.get("/users", authController.getAllUsers.bind(authController));
router.get("/users/:id", authController.getUserById.bind(authController));
router.put("/users/:id", authController.updateUser.bind(authController));
router.delete("/users/:id", authController.deleteUser.bind(authController));

export default router;
