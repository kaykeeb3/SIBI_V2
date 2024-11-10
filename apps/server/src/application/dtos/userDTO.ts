import { z } from "zod";

export const UserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  institution: z.string().min(1),
  limit: z.number().min(0).max(100),
  role: z.enum(["ADMIN", "USER"]),
  phone: z.string().optional(),
  profilePicture: z.string().url().optional(),
});

// Definindo o DTO parcial para atualização de perfil
export const PartialUserDTO = UserDTO.partial();

export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Exportando os tipos inferidos com nomes distintos
export type UserDTO = z.infer<typeof UserDTO>;
export type PartialUserDTO = z.infer<typeof PartialUserDTO>;
export type LoginDTO = z.infer<typeof LoginDTO>;
