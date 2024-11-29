import { FAQ } from "@/core/domain/entities/FAQEntity";
import { PrismaClient } from "@prisma/client";

export class FAQRepository {
  private prisma = new PrismaClient();

  // Busca uma resposta no banco de dados com base em palavras-chave
  async searchByQuestion(question: string): Promise<FAQ | null> {
    const keywords = question.toLowerCase().split(" ");
    const faqs = await this.prisma.fAQ.findMany();

    // Encontra a FAQ mais relevante com base nas palavras-chave
    let bestMatch: FAQ | null = null;
    let maxMatches = 0;

    faqs.forEach((faq) => {
      const matches = keywords.filter((word) =>
        faq.question.toLowerCase().includes(word)
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = faq;
      }
    });

    return bestMatch;
  }

  // Adiciona uma nova FAQ no banco de dados
  async storeFAQ(question: string, answer: string): Promise<FAQ> {
    return this.prisma.fAQ.create({
      data: {
        question,
        answer,
      },
    });
  }

  // Retorna todas as FAQs armazenadas
  async fetchAllFAQs(): Promise<FAQ[]> {
    return this.prisma.fAQ.findMany();
  }

  // Atualiza uma FAQ existente por ID
  async modifyFAQ(id: number, question: string, answer: string): Promise<FAQ> {
    return this.prisma.fAQ.update({
      where: { id },
      data: { question, answer },
    });
  }

  // Remove uma FAQ existente por ID
  async removeFAQ(id: number): Promise<FAQ> {
    return this.prisma.fAQ.delete({
      where: { id },
    });
  }
}
