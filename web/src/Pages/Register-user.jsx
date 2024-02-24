import { useState } from "react";
import { motion } from "framer-motion"; // Importação da biblioteca de animação
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Importação do ToastContainer e toast
import "react-toastify/dist/ReactToastify.css"; // Importação do CSS da biblioteca react-toastify

const Registerbook = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Adiciona um zero na frente se o mês ou o dia for menor que 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const [novaRequisicao, setNovaRequisicao] = useState({
    nome: "",
    serieCurso: "",
    dataInicio: getCurrentDate(), // Inicializa com a data atual
    dataDevolucao: getCurrentDate(), // Inicializa com a data atual
    livroId: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaRequisicao({ ...novaRequisicao, [name]: value });
  };

  const handleNovaRequisicaoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://sibi-api.vercel.app/emprestimos",
        novaRequisicao
      );
      toast.success("Requisição cadastrada com sucesso!"); // Utilizando toast.success para exibir mensagem de sucesso
      setNovaRequisicao({
        nome: "",
        serieCurso: "",
        dataInicio: getCurrentDate(), // Reinicializa com a data atual
        dataDevolucao: getCurrentDate(), // Reinicializa com a data atual
        livroId: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar requisição:", error);
      toast.error("Erro ao cadastrar requisição. Por favor, tente novamente."); // Utilizando toast.error para exibir mensagem de erro
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
          className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
        >
          <h2 className="text-xl font-bold">Cadastrar Nova Requisição</h2>
          <form onSubmit={handleNovaRequisicaoSubmit} className="space-y-3">
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
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
              >
                Cadastrar
              </button>
            </div>
          </form>
          {/* Renderizando o ToastContainer */}
          <ToastContainer position="bottom-right" />
        </motion.div>
      </div>
    </>
  );
};

export default Registerbook;
