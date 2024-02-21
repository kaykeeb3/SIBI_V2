import { useState } from "react";
import { motion } from "framer-motion"; // Importação da biblioteca de animação
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";

const Registerbook = () => {
  const [novoLivro, setNovoLivro] = useState({
    nome: "",
    autor: "",
    genero: "",
    quantidade: 0,
    numero: 0, // Adicionando o campo 'numero'
  });

  const [mensagem, setMensagem] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLivro({ ...novoLivro, [name]: value });
  };

  const handleNovoLivroSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://sibi-api.vercel.app/livros", novoLivro);
      setMensagem({ type: "success", text: "Livro cadastrado com sucesso!" });
      setTimeout(() => {
        setMensagem("");
      }, 3000);
      setNovoLivro({
        nome: "",
        numero: "",
        autor: "",
        genero: "",
        quantidade: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      setMensagem({
        type: "error",
        text: "Erro ao cadastrar livro. Por favor, tente novamente.",
      });
      setTimeout(() => {
        setMensagem("");
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-8 pb-11 flex items-center justify-center h-screen">
        <ButtonReturn />
        {/* Adicionando animação ao formulário */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Configuração de entrada
          animate={{ opacity: 1, y: 0 }} // Configuração de animação
          exit={{ opacity: 0, y: 50 }} // Configuração de saída
          transition={{ duration: 0.5 }} // Duração da transição
          className="bg-white p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="text-xl font-bold mb-4">Cadastrar Novo Livro</h2>
          {mensagem && (
            <div className="text-center mb-4">
              <p
                className={
                  mensagem.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {mensagem.text}
              </p>
            </div>
          )}
          <form onSubmit={handleNovoLivroSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Nome:</label>
              <input
                type="text"
                name="nome"
                value={novoLivro.nome}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Número:</label>{" "}
              {/* Adicionando o campo 'numero' */}
              <input
                type="number"
                name="numero"
                value={novoLivro.numero}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Autor:</label>
              <input
                type="text"
                name="autor"
                value={novoLivro.autor}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Gênero:</label>
              <input
                type="text"
                name="genero"
                value={novoLivro.genero}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                value={novoLivro.quantidade}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 w-full py-2 rounded-lg hover:bg-green-600"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Registerbook;
