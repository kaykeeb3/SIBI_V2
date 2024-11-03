import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface TokenPayload {
  id: number;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    // Verifica se o resultado contém o id
    return decoded && typeof decoded === "object" && "id" in decoded
      ? decoded
      : null;
  } catch {
    return null;
  }
}
