import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registerbook = () => {
  const [novoLivro, setNovoLivro] = useState({
    nome: "",
    autor: "",
    genero: "",
    quantidade: "",
    numero: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLivro({ ...novoLivro, [name]: value });
  };

  const handleNovoLivroSubmit = async (e) => {
    e.preventDefault();
    try {
      const livroParaEnviar = {
        ...novoLivro,
        quantidade: parseInt(novoLivro.quantidade),
        numero: parseInt(novoLivro.numero),
      };
      await axios.post("https://sibi-api.vercel.app/livros", livroParaEnviar);
      toast.success("Livro cadastrado com sucesso!");
      setNovoLivro({
        nome: "",
        numero: "",
        autor: "",
        genero: "",
        quantidade: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      toast.error("Erro ao cadastrar livro. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-20  px-4 flex items-center justify-center">
        <ButtonReturn />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full space-y-4"
        >
          <h2 className="text-xl font-bold">Cadastrar Novo Livro</h2>
          <form onSubmit={handleNovoLivroSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={novoLivro.nome}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Número:</label>
                <input
                  type="number"
                  name="numero"
                  value={novoLivro.numero}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Autor:</label>
                <input
                  type="text"
                  name="autor"
                  value={novoLivro.autor}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Gênero:</label>
                <input
                  type="text"
                  name="genero"
                  value={novoLivro.genero}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                value={novoLivro.quantidade}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </motion.div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};

export default Registerbook;
