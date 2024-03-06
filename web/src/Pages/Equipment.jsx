import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import Search from "../public/search.svg";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Equipment() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEquipamentos() {
      try {
        setLoading(true);
        let url = `https://sibi-api.vercel.app/equipamentos?`;

        if (filtroNome) {
          url += `nome=${filtroNome}&`;
        }
        if (filtroCategoria !== "Todos") {
          url += `tipo=${filtroCategoria}&`;
        }

        const response = await axios.get(url);
        setEquipamentos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
        toast.error("Erro ao buscar equipamentos.");
      }
    }

    fetchEquipamentos();
  }, [filtroNome, filtroCategoria]);

  const handleFiltroNomeChange = (e) => {
    const nomeFiltro = e.target.value;
    setFiltroNome(nomeFiltro);
  };

  const handleFiltroCategoriaChange = (e) => {
    const categoriaFiltro = e.target.value;
    setFiltroCategoria(categoriaFiltro);
  };

  const handleEdit = (equipamento) => {
    setEquipamentoSelecionado(equipamento);
  };

  const handleDelete = async (equipamentoId) => {
    try {
      await axios.delete(
        `https://sibi-api.vercel.app/equipamentos/${equipamentoId}`
      );
      const updatedEquipamentos = equipamentos.filter(
        (equipamento) => equipamento.id !== equipamentoId
      );
      setEquipamentos(updatedEquipamentos);
      toast.success("Equipamento deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar equipamento:", error);
      toast.error("Erro ao deletar equipamento.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      await axios.put(
        `https://sibi-api.vercel.app/equipamentos/${equipamentoSelecionado.id}`,
        equipamentoSelecionado,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEquipamentoSelecionado(null);

      const updatedEquipamentos = equipamentos.map((equipamento) => {
        if (equipamento.id === equipamentoSelecionado.id) {
          return equipamentoSelecionado;
        }
        return equipamento;
      });
      setEquipamentos(updatedEquipamentos);
      toast.success("Equipamento editado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar edição do equipamento:", error);
      toast.error("Erro ao editar equipamento.");
    }
  };

  const handleCancelEdit = () => {
    setEquipamentoSelecionado(null);
  };

  // Função para filtrar equipamentos com base no nome e categoria selecionada
  const filteredEquipamentos = equipamentos.filter((equipamento) => {
    if (
      (filtroNome === "" ||
        equipamento.nome.toLowerCase().includes(filtroNome.toLowerCase())) &&
      (filtroCategoria === "Todos" || equipamento.tipo === filtroCategoria)
    ) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pb-11">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-[75%] py-6">
            <input
              type="text"
              placeholder="Pesquisar equipamento pelo nome..."
              value={filtroNome}
              onChange={handleFiltroNomeChange}
              className="w-full border border-gray-300 px-4 py-4 rounded-full focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center">
              <img src={Search} className="w-5 h-5" alt="Search icon" />
            </button>
          </div>
          <select
            value={filtroCategoria}
            onChange={handleFiltroCategoriaChange}
            className="bg-blue-500 rounded-md text-white px-4 py-3"
          >
            <option value="Todos">TODOS</option>
            <option value="Televisão">Televisão</option>
            <option value="Projetor">Projetor</option>
            <option value="Periféricos">Periféricos</option>
          </select>
        </div>
        <ButtonReturn />
        <div className="mt-8 grid grid-cols-3 gap-6">
          {loading ? (
            <div className="animate-pulse bg-gray-200 p-6 rounded-lg shadow-md mb-6 h-40"></div>
          ) : (
            filteredEquipamentos.map((equipamento) => (
              <motion.div
                key={equipamento.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white p-6 rounded-lg shadow-md mb-6 relative border border-gray-300 ${
                  equipamento.quantidade === 1
                    ? "border-red-500"
                    : equipamento.quantidade < 3
                    ? "border-yellow-500"
                    : "border-green-500"
                }`}
              >
                <p className="font-bold text-lg mb-2">{equipamento.nome}</p>
                <p className="text-gray-600 mb-1">ID: {equipamento.id}</p>
                <p className="text-gray-600 mb-1">Tipo: {equipamento.tipo}</p>
                <p className="text-gray-600">
                  Quantidade: {equipamento.quantidade}
                </p>
                <div className="absolute top-0 right-0 mt-2 mr-2 flex items-center space-x-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(equipamento)}
                  >
                    <RiEdit2Line className="w-8 h-8 p-1" />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(equipamento.id)}
                  >
                    <RiDeleteBin6Line className="w-8 h-8 p-1" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
        <div className="text-center mt-4">
          <ToastContainer position="bottom-right" />
        </div>
      </div>
      {equipamentoSelecionado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10"
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Editar Equipamento</h2>
            <div className="mb-4">
              <label className="block mb-1">Nome:</label>
              <input
                type="text"
                value={equipamentoSelecionado.nome}
                onChange={(e) =>
                  setEquipamentoSelecionado({
                    ...equipamentoSelecionado,
                    nome: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Tipo:</label>
              <input
                type="text"
                value={equipamentoSelecionado.tipo}
                onChange={(e) =>
                  setEquipamentoSelecionado({
                    ...equipamentoSelecionado,
                    tipo: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Quantidade:</label>
              <input
                type="number"
                value={equipamentoSelecionado.quantidade}
                onChange={(e) =>
                  setEquipamentoSelecionado({
                    ...equipamentoSelecionado,
                    quantidade: parseInt(e.target.value),
                  })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Salvar
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
