import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Lightbulb, Eye, FileText, Ellipsis } from "lucide-react";
import { useState } from "react";
import { getAnswerFromChatBot } from "@/services/respond/chatBot-service";
import { motion } from "framer-motion";

export function ChatBot() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!message) return;

    setLoading(true);
    try {
      const answer = await getAnswerFromChatBot(message);
      setResponse(answer.answer);
    } catch (error) {
      setResponse("Desculpe, houve um erro ao tentar responder sua pergunta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="w-full px-36 mb-52">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <Card className="border-none shadow-none rounded-none bg-transparent flex flex-col items-center justify-center">
            <CardHeader className="shadow-none bg-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <CardTitle className="text-2xl font-semibold text-center text-zinc-800">
                  Como posso ajudar?
                </CardTitle>
              </motion.div>
            </CardHeader>

            <CardContent className="bg-zinc-200 w-2/4 px-0 py-0 rounded-2xl">
              <div className="flex justify-start w-full">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-auto shadow-none resize-none border-none focus-visible:ring-transparent rounded-lg bg-transparent text-zinc-700 w-full break-words"
                  placeholder="Envie uma mensagem para o Chat"
                />
              </div>
              <div className="flex items-center justify-end px-4 pb-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!message || loading}
                  className={`rounded-full shadow-none px-0 py-0 w-8 h-8 ${
                    !message
                      ? "bg-zinc-400 cursor-not-allowed"
                      : "bg-zinc-600 hover:bg-zinc-500"
                  }`}
                >
                  {<ArrowUp />}
                </Button>
              </div>
            </CardContent>

            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <CardContent className="bg-zinc-100 w-2/4 px-0 py-2 rounded-2xl">
                  <CardTitle className="flex items-center justify-center">
                    <Ellipsis className="animate-ping transition-all" />
                  </CardTitle>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center justify-center "
              >
                <CardContent className="w-2/4 px-0 py-2 rounded-2xl">
                  <CardDescription className="text-center text-zinc-600 text-sm mt-4">
                    {response}
                  </CardDescription>
                </CardContent>
              </motion.div>
            )}

            {/* Botões exibidos apenas quando não há resposta */}
            {!loading && !response && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center justify-center gap-4 mt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button className="flex items-center justify-center bg-transparent hover:bg-zinc-200 hover:border-none transition-all shadow-none border border-zinc-300 rounded-2xl">
                    <Lightbulb className="text-yellow-500" />
                    <span className="text-zinc-700 text-xs">Dúvidas</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button className="flex items-center justify-center bg-transparent hover:bg-zinc-200 hover:border-none transition-all shadow-none border border-zinc-300 rounded-2xl">
                    <Eye className="text-blue-500" />
                    <span className="text-zinc-700 text-xs">Visualizar</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button className="flex items-center justify-center bg-transparent hover:bg-zinc-200 hover:border-none transition-all shadow-none border border-zinc-300 rounded-2xl">
                    <FileText className="text-orange-500" />
                    <span className="text-zinc-700 text-xs">Documentos</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button className="flex items-center justify-center bg-transparent hover:bg-zinc-200 hover:border-none transition-all shadow-none border border-zinc-300 rounded-2xl">
                    <span className="text-zinc-700 text-xs">Mais</span>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
      <CardFooter className="flex items-center justify-center text-xs text-zinc-500 bottom-0 fixed">
        O ChatBoot pode cometer erros. Considere verificar informações
        importantes.
      </CardFooter>
    </div>
  );
}
