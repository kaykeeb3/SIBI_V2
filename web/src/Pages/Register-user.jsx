import { useState } from "react";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";

const Registerbook = () => {
  const [novaRequisicao, setNovaRequisicao] = useState({
    nome: "",
    serieCurso: "",
    dataInicio: "",
    dataDevolucao: "",
    livroId: 0,
  });

  const [mensagem, setMensagem] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaRequisicao({ ...novaRequisicao, [name]: value });
  };

  const handleNovaRequisicaoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/emprestimos", novaRequisicao);
      setMensagem({
        type: "success",
        text: "Requisição cadastrada com sucesso!",
      });
      setTimeout(() => {
        setMensagem("");
      }, 3000);
      setNovaRequisicao({
        nome: "",
        serieCurso: "",
        dataInicio: "",
        dataDevolucao: "",
        livroId: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar requisição:", error);
      setMensagem({
        type: "error",
        text: "Erro ao cadastrar requisição. Por favor, tente novamente.",
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
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Cadastrar Nova Requisição</h2>
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
          <form onSubmit={handleNovaRequisicaoSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Aluno:</label>
              <input
                type="text"
                name="nome"
                value={novaRequisicao.nome}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Série/Curso:</label>{" "}
              <input
                type="text"
                name="serieCurso"
                value={novaRequisicao.serieCurso}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Data de Início:</label>
              <input
                type="date"
                name="dataInicio"
                value={novaRequisicao.dataInicio}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Data de Devolução:</label>
              <input
                type="date"
                name="dataDevolucao"
                value={novaRequisicao.dataDevolucao}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">ID do Livro:</label>
              <input
                type="number"
                name="livroId"
                value={novaRequisicao.livroId}
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
        </div>
      </div>
    </>
  );
};

export default Registerbook;
