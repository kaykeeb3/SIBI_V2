import { FAQRepository } from "@/infra/repositories/FAQRepository";
import { GetFAQAnswer } from "./getFAQAnswerUseCase";

jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      startChat: jest.fn().mockReturnValue({
        sendMessage: jest.fn().mockResolvedValue({
          response: {
            text: jest.fn().mockResolvedValue("Resposta melhorada"),
          },
        }),
      }),
    }),
  })),
}));

jest.mock("@/infra/repositories/FAQRepository");

describe("GetFAQAnswer - Basic Tests", () => {
  let faqRepositoryMock: jest.Mocked<FAQRepository>;
  let getFAQAnswer: GetFAQAnswer;

  const normalizeText = (text: string) => text.trim().replace(/\s+/g, " ");

  beforeEach(() => {
    faqRepositoryMock = new FAQRepository() as jest.Mocked<FAQRepository>;
    faqRepositoryMock.searchByQuestion.mockResolvedValue(null);
    faqRepositoryMock.fetchAllFAQs.mockResolvedValue([
      {
        question: "Como posso resetar minha senha?",
        answer:
          'Para redefinir sua senha, procure por "Esqueci minha senha" na página de login, acesse as configurações da conta ou contate o suporte técnico.',
      },
    ]);
    faqRepositoryMock.storeFAQ = jest.fn();

    getFAQAnswer = new GetFAQAnswer(faqRepositoryMock);
  });

  it("should return an enhanced answer from existing FAQs", async () => {
    const question = "Como posso resetar minha senha?";
    const expectedAnswer = "Resposta melhorada";

    const response = await getFAQAnswer.execute(question);

    expect(normalizeText(response)).toBe(normalizeText(expectedAnswer));
    expect(faqRepositoryMock.storeFAQ).toHaveBeenCalledWith(
      question,
      expect.any(String)
    );
  });
});
