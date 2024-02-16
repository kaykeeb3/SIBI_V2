// authRoutes.js

const express = require("express");
const router = express.Router();
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
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error during login" });
  }
});

router.get("/home", authenticateToken, async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.user.userId, prisma);
    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error fetching user profile" });
  }
});

module.exports = router;
