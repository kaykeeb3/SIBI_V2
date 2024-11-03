import { z } from "zod";

export const scheduleSchema = z.object({
  name: z.string().min(1).max(100),
  quantity: z.number().positive(),
  startDate: z.date(),
  returnDate: z.date(),
  weekDay: z.string().min(1).max(20),
  equipmentId: z.number().positive(),
  returned: z.boolean().default(false),
  type: z.string().optional(),
});

export type ScheduleDTO = z.infer<typeof scheduleSchema>;
