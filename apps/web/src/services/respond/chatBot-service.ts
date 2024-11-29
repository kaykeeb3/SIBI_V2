import api from "@/lib/api";

interface FaqResponse {
  answer: string;
}

export const getAnswerFromChatBot = async (
  question: string
): Promise<FaqResponse> => {
  try {
    const response = await api.post("/faq/respond", { question });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar resposta:", error);
    throw new Error("Erro ao buscar resposta.");
  }
};
