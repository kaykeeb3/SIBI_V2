import React, { useState } from "react";
import { motion } from "framer-motion";
import ButtonReturn from "../components/ButtonReturn";
import Header from "../components/Header";

const Support = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    setSending(true);
    setSuccess(false); // Resetar o estado de sucesso ao enviar

    const phoneNumber = "+5588994013479";
    const whatsappMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`;

    // Simular um atraso para a exibição do indicador de envio
    setTimeout(() => {
      window.location.href = whatsappURL;
      setSending(false); // Resetar o estado de envio após a finalização
      setSuccess(true); // Definir o estado de sucesso após o envio
    }, 2000);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
    setError(false); // Remover a mensagem de erro ao digitar
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-12">
        <motion.h3
          className="text-3xl font-bold uppercase text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Suporte via Chat WhatsApp
        </motion.h3>
        <div className="max-w-xl mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Melhoria, Problema ou Dúvida:
          </label>
          <textarea
            value={message}
            onChange={handleChangeMessage}
            className={`resize-none outline-none border-[2px] rounded-md w-full px-3 py-2 mb-4 ${
              error && "border-red-500"
            }`}
            rows="5"
            placeholder="Digite sua mensagem aqui..."
          ></textarea>
          {error && (
            <p className="text-red-500 text-sm mb-4">
              Por favor, digite uma mensagem válida.
            </p>
          )}
          <motion.button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            disabled={sending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sending ? "Enviando..." : "Enviar Mensagem para WhatsApp"}
          </motion.button>
          {success && (
            <p className="text-green-500 text-sm mt-4">
              Mensagem enviada com sucesso!
            </p>
          )}
        </div>
        <ButtonReturn />
      </div>
    </>
  );
};

export default Support;
