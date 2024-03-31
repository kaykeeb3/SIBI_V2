import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment"; // Import Moment.js

const RegisterUser = () => {
  const getCurrentDate = () => {
    return moment().format("YYYY-MM-DD");
  };

  const [novaRequisicao, setNovaRequisicao] = useState({
    nome: "",
    serieCurso: "",
    dataInicio: getCurrentDate(),
    dataDevolucao: getCurrentDate(),
    livroId: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaRequisicao({ ...novaRequisicao, [name]: value });
  };

  const handleNovaRequisicaoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/emprestimos", novaRequisicao);
      toast.success("Requisição cadastrada com sucesso!");
      setNovaRequisicao({
        nome: "",
        serieCurso: "",
        dataInicio: getCurrentDate(),
        dataDevolucao: getCurrentDate(),
        livroId: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar requisição:", error);
      toast.error("Erro ao cadastrar requisição. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-20 pb-14 flex items-center justify-center">
        <ButtonReturn />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full space-y-4"
        >
          <h2 className="text-xl font-bold">Cadastrar Nova Requisição</h2>
          <form onSubmit={handleNovaRequisicaoSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Aluno:</label>
                <input
                  type="text"
                  name="nome"
                  value={novaRequisicao.nome}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Série/Curso:</label>{" "}
                <input
                  type="text"
                  name="serieCurso"
                  value={novaRequisicao.serieCurso}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Data de Início:</label>
                <input
                  type="date"
                  name="dataInicio"
                  value={novaRequisicao.dataInicio}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Data de Devolução:</label>
                <input
                  type="date"
                  name="dataDevolucao"
                  value={novaRequisicao.dataDevolucao}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">ID do Livro:</label>
              <input
                type="number"
                name="livroId"
                value={novaRequisicao.livroId}
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
          <ToastContainer position="bottom-right" />
        </motion.div>
      </div>
    </>
  );
};

export default RegisterUser;
