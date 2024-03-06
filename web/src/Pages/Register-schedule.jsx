import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterSchedule = () => {
  const [newSchedule, setNewSchedule] = useState({
    nome: "",
    quantidade: 0,
    dataInicio: "",
    dataDevolucao: "",
    diaSemana: "",
    equipamentoId: "", // Mantido como string
    tipo: "", // Novo campo 'tipo'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleNewScheduleSubmit = async (e) => {
    e.preventDefault();

    // Formatar as datas para o formato 'YYYY-MM-DD'
    const formattedDataInicio = new Date(newSchedule.dataInicio)
      .toISOString()
      .split("T")[0];
    const formattedDataDevolucao = new Date(newSchedule.dataDevolucao)
      .toISOString()
      .split("T")[0];

    try {
      // Enviar os dados no formato JSON
      await axios.post(
        "https://sibi-api.vercel.app/agendamentos",
        {
          nome: newSchedule.nome,
          quantidade: parseInt(newSchedule.quantidade),
          dataInicio: formattedDataInicio,
          dataDevolucao: formattedDataDevolucao,
          diaSemana: newSchedule.diaSemana,
          equipamentoId: newSchedule.equipamentoId, // Mantido como string
          tipo: newSchedule.tipo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Agendamento criado com sucesso!");
      setNewSchedule({
        nome: "",
        quantidade: 0,
        dataInicio: "",
        dataDevolucao: "",
        diaSemana: "",
        equipamentoId: "", // Mantido como string
        tipo: "",
      });
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-20 px-4 flex items-center justify-center">
        <ButtonReturn />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full space-y-4"
        >
          <h2 className="text-xl font-bold">Cadastrar Novo Agendamento</h2>
          <form
            onSubmit={handleNewScheduleSubmit}
            className="grid grid-cols-3 gap-4"
          >
            <div className="col-span-3">
              <label className="block text-sm mb-1">Nome:</label>
              <input
                type="text"
                name="nome"
                value={newSchedule.nome}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm mb-1">Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                value={newSchedule.quantidade}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm mb-1">Data de Início:</label>
              <input
                type="date"
                name="dataInicio"
                value={newSchedule.dataInicio}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm mb-1">Data de Devolução:</label>
              <input
                type="date"
                name="dataDevolucao"
                value={newSchedule.dataDevolucao}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm mb-1">Dia da Semana:</label>
              <input
                type="text"
                name="diaSemana"
                value={newSchedule.diaSemana}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm mb-1">ID do Equipamento:</label>
              <input
                type="text"
                name="equipamentoId"
                value={newSchedule.equipamentoId}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm mb-1">Tipo:</label>
              <input
                type="text"
                name="tipo"
                value={newSchedule.tipo}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-3 flex justify-end">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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

export default RegisterSchedule;
