import { FAQRepository } from "@/infra/repositories/FAQRepository";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { faqSchema } from "@/application/dtos/FAQDTO";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export class GetFAQAnswer {
  constructor(private faqRepository: FAQRepository) {}

  async execute(question: string): Promise<string> {
    if (this.isGreeting(question)) {
      return "Olá! Estou aqui para ajudar. Como posso assisti-lo hoje?";
    }

    if (!question.trim()) {
      throw new Error("Question cannot be empty.");
    }

    const faq = await this.faqRepository.searchByQuestion(question);
    if (faq) {
      return this.enhanceResponse(faq.answer);
    }

    const defaultMessage =
      "Não encontramos uma resposta para sua pergunta no momento.";

    try {
      const allFAQs = await this.faqRepository.fetchAllFAQs();
      const history = allFAQs.map((faq) => ({
        role: "user",
        parts: [{ text: `Q: ${faq.question} A: ${faq.answer}` }],
      }));

      history.push({
        role: "user",
        parts: [{ text: `Q: ${question}` }],
      });

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      if (!model) {
        throw new Error("Model not found.");
      }

      const chat = model.startChat({
        history: history,
        generationConfig: { maxOutputTokens: 150 },
      });

      if (!chat || !chat.sendMessage) {
        throw new Error("Chat session or sendMessage method not found.");
      }

      const result = await chat.sendMessage(question);
      const response = await result.response;
      if (!response || !response.text) {
        throw new Error("API response format is incorrect.");
      }

      const text = await response.text();

      const parsed = faqSchema.safeParse({ question, answer: text });
      if (!parsed.success) {
        throw new Error(
          "Generated FAQ failed validation: " + parsed.error.message
        );
      }

      await this.faqRepository.storeFAQ(
        parsed.data.question,
        parsed.data.answer
      );
      return this.enhanceResponse(parsed.data.answer);
    } catch (error: any) {
      console.error("Error calling Google Gemini AI:", error.message);
      return defaultMessage;
    }
  }

  private async enhanceResponse(response: string): Promise<string> {
    try {
      const enhancedResponse = await this.correctAndImproveText(response);
      return enhancedResponse;
    } catch (error) {
      console.error("Error enhancing response:", error);
      return response;
    }
  }

  private async correctAndImproveText(text: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Melhore a ortografia e a escolha das palavras para a seguinte resposta: '${text}', gerando apenas uma frase.`,
              },
            ],
          },
        ],
        generationConfig: { maxOutputTokens: 50 },
      });

      const result = await chat.sendMessage("");
      const improvedText = await result.response.text();
      return improvedText;
    } catch (error: any) {
      console.error(
        "Error calling Google Gemini AI for enhancement:",
        error.message
      );
      return text;
    }
  }

  private isGreeting(question: string): boolean {
    const greetings = ["oi", "olá", "bom dia", "boa tarde", "boa noite"];
    return greetings.some((greeting) =>
      question.toLowerCase().includes(greeting)
    );
  }
}
