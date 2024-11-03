import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/shared/utils/tokenManager";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token is missing" });
  }

  const [, token] = authHeader.split(" ");

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = payload;
  next();
}
