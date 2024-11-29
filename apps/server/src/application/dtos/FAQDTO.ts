import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(5, "A pergunta deve ter no mínimo 5 caracteres."),
  answer: z.string().min(10, "A resposta deve ter no mínimo 10 caracteres."),
});

export type FAQDTO = z.infer<typeof faqSchema>;
