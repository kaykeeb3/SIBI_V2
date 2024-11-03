import { z } from "zod";

export const equipmentSchema = z.object({
  number: z.number().int().positive(),
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(50),
  quantity: z.number().int().positive(),
});

export type EquipmentDTO = z.infer<typeof equipmentSchema>;
