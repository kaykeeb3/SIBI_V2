import { Router } from "express"; // Correção da importação

const authRoutes = (router) => {
  const { PrismaClient } = require("@prisma/client");
  const {
    authenticateToken,
    validateUserInput,
  } = require("../middlewares/authMiddleware");
  const { login, getUserProfile } = require("../controllers/authController");

  const prisma = new PrismaClient();

  router.post("/login", validateUserInput, async (req, res) => {
    try {
      const token = await login(req.body, prisma);
      prisma.$disconnect();
      res.json({ token });
    } catch (error) {
      console.log("Error during login:", error.message);
      prisma.$disconnect();
      res.status(500).json({ error: "Internal server error during login" });
    }
  });

  router.get("/home", authenticateToken, async (req, res) => {
    try {
      const userProfile = await getUserProfile(req.user.userId, prisma);
      prisma.$disconnect();
      res.json(userProfile);
    } catch (error) {
      console.log("Error fetching user profile:", error.message);
      prisma.$disconnect();
      res
        .status(500)
        .json({ error: "Internal server error fetching user profile" });
    }
  });

  return router;
};

export default authRoutes; // Correção da exportação
