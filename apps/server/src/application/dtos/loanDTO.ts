import { z } from "zod";

export const loanSchema = z.object({
  name: z.string().min(1).max(100),
  seriesCourse: z.string().min(1).max(100),
  startDate: z.date(),
  returnDate: z.date(),
  returned: z.boolean().default(false),
  bookId: z.number().positive(),
});

export type LoanDTO = z.infer<typeof loanSchema>;
