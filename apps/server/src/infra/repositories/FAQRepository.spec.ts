import { PrismaClient, FAQ } from "@prisma/client";
import { FAQRepository } from "./FAQRepository";

// Mock do PrismaClient
jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    fAQ: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("FAQRepository", () => {
  let faqRepository: FAQRepository;
  let prismaMock: PrismaClient;

  beforeEach(() => {
    faqRepository = new FAQRepository();
    prismaMock = new PrismaClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("storeFAQ", () => {
    it("deve adicionar uma nova FAQ ao banco", async () => {
      const newFAQ = {
        question: "Como resetar a senha?",
        answer: "Acesse as configurações",
        createdAt: new Date(), // Campo gerado automaticamente
      };

      const createdFAQ: FAQ = {
        id: 1,
        ...newFAQ,
        createdAt: new Date(), // Gerando o campo createdAt automaticamente
      };

      // Mock para resolver create com createdFAQ
      (prismaMock.fAQ.create as jest.Mock).mockResolvedValue(createdFAQ);

      const result = await faqRepository.storeFAQ(
        newFAQ.question,
        newFAQ.answer
      );

      // Verificando se o campo 'createdAt' existe e o ID é válido
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          question: newFAQ.question,
          answer: newFAQ.answer,
          createdAt: expect.any(Date),
        })
      );

      expect(prismaMock.fAQ.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          question: newFAQ.question,
          answer: newFAQ.answer,
        }),
      });
      expect(prismaMock.fAQ.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("modifyFAQ", () => {
    it("deve atualizar uma FAQ existente", async () => {
      const updatedFAQ = {
        id: 1,
        question: "Como redefinir senha?",
        answer: "Vá para configurações",
        createdAt: new Date(), // Este campo é gerado, mas não é importante no teste
      };

      // Mock para resolver update com updatedFAQ
      (prismaMock.fAQ.update as jest.Mock).mockResolvedValue(updatedFAQ);

      const result = await faqRepository.modifyFAQ(
        updatedFAQ.id,
        updatedFAQ.question,
        updatedFAQ.answer
      );

      // Verificando se o campo 'createdAt' existe e o ID é válido
      expect(result).toEqual(
        expect.objectContaining({
          id: updatedFAQ.id,
          question: updatedFAQ.question,
          answer: updatedFAQ.answer,
          createdAt: expect.any(Date),
        })
      );

      expect(prismaMock.fAQ.update).toHaveBeenCalledWith({
        where: { id: updatedFAQ.id },
        data: expect.objectContaining({
          question: updatedFAQ.question,
          answer: updatedFAQ.answer,
        }),
      });
      expect(prismaMock.fAQ.update).toHaveBeenCalledTimes(1);
    });
  });
});
