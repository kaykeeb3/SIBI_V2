import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
} from "@/application/use-cases/authUseCase";
import { LoginDTO, UserDTO } from "@/application/dtos/userDTO";
import { verifyToken } from "@/shared/utils/tokenManager";
import { UserRepository } from "@/infra/repositories/userRepository";

const userRepository = new UserRepository();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const userData = UserDTO.parse(req.body);
      const user = await registerUser(userData);
      res.status(201).json({ user });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData = LoginDTO.parse(req.body);
      const token = await loginUser(loginData);

      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async verifyAccess(req: Request, res: Response) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token is required" });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    try {
      const user = await getUserDetails(decoded.id);
      res.status(200).json({
        name: user.name,
        role: user.role,
        profilePicture: user.profilePicture,
      });
    } catch (error: any) {
      res.status(404).json({ error: "User not found" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.getAllUsers();
      res.status(200).json({ users });
    } catch (error: any) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userRepository.getUserById(userId);
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(404).json({ error: error.message || "User not found" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = UserDTO.parse(req.body);
      const user = await userRepository.updateUser(Number(id), data);
      res.status(200).json({ user });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userRepository.deleteUser(Number(id));
      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  // Método para tratar erros de forma genérica
  private handleError(res: Response, error: any) {
    const status = error.status || 400;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ error: message });
  }
}
