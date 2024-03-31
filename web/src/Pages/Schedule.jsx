import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import Search from "../public/search.svg";
import { HiPencilAlt } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://sibi-api.vercel.app/agendamentos"
      );
      const filteredSchedules = response.data.filter((schedule) =>
        schedule.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSchedules(filteredSchedules);
      setNoResults(filteredSchedules.length === 0);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      toast.error("Erro ao buscar agendamentos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedSchedule(null);
    setModalVisible(false);
  };

  const handleUpdateSchedule = async () => {
    try {
      await axios.put(
        `https://sibi-api.vercel.app/agendamentos/${selectedSchedule.id}`,
        selectedSchedule
      );
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === selectedSchedule.id ? selectedSchedule : schedule
        )
      );
      handleCloseModal();
      toast.success("Agendamento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      toast.error("Erro ao atualizar agendamento.");
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`https://sibi-api.vercel.app/agendamentos/${id}`);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Erro ao excluir agendamento.");
    }
  };

  const handleMarkAsReturned = async (id) => {
    try {
      await axios.put(
        `https://sibi-api.vercel.app/agendamentos/${id}/devolver`,
        {
          ...selectedSchedule,
          devolvido: true,
        }
      );

      setSchedules(schedules.filter((schedule) => schedule.id !== id)); // Remover agendamento da lista após a devolução

      handleCloseModal();
      toast.success("Agendamento marcado como devolvido com sucesso!");
    } catch (error) {
      console.error("Erro ao marcar como devolvido:", error);
      toast.error("Erro ao marcar como devolvido.");
    }
  };

  const isPastDue = (date) => {
    return moment().isAfter(moment(date));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pb-11">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full py-6">
            <input
              type="text"
              placeholder="Pesquisar agendamento pelo nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 px-4 py-4 rounded-full focus:outline-none focus:border-blue-500"
            />
            <button
              className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center"
              onClick={handleSearch}
              disabled={loading}
            >
              <img src={Search} className="w-5 h-5" alt="Search icon" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noResults ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 font-bold"
            >
              Nenhum resultado encontrado.
            </motion.div>
          ) : loading ? (
            <div className="animate-pulse bg-gray-200 p-6 rounded-lg shadow-md mb-6 h-40"></div>
          ) : (
            schedules.map((schedule) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white p-6 rounded-lg shadow-md mb-6 border ${
                  isPastDue(schedule.dataDevolucao)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <p className="font-bold text-lg mb-2">{schedule.nome}</p>
                <p className="text-gray-600 mb-1">
                  Quantidade: {schedule.quantidade}
                </p>
                <p className="text-gray-600 mb-1">
                  Data de Início:{" "}
                  {moment(schedule.dataInicio).format("DD/MM/YYYY")}
                </p>
                <p className="text-gray-600 mb-1">
                  Data de Devolução:{" "}
                  {moment(schedule.dataDevolucao).format("DD/MM/YYYY")}
                </p>
                <p className="text-gray-600 mb-1">
                  Dia da Semana: {schedule.diaSemana}
                </p>
                <div className="flex items-center justify-end mt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <HiPencilAlt size={24} />
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <RiDeleteBin5Fill size={24} />
                    </button>
                    {!schedule.devolvido && (
                      <button
                        onClick={() => handleMarkAsReturned(schedule.id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <GiConfirmed size={24} />
                      </button>
                    )}
                  </div>
                  <div></div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        <ButtonReturn />
      </div>
      {modalVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 sm:items-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Editar Agendamento
                    </h3>
                    <div className="mt-2">
                      <form>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nome:
                          </label>
                          <input
                            type="text"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedSchedule.nome}
                            onChange={(e) =>
                              setSelectedSchedule({
                                ...selectedSchedule,
                                nome: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Quantidade:
                          </label>
                          <input
                            type="number"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedSchedule.quantidade}
                            onChange={(e) =>
                              setSelectedSchedule({
                                ...selectedSchedule,
                                quantidade: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Data de Início:
                          </label>
                          <input
                            type="date"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={moment(selectedSchedule.dataInicio).format(
                              "YYYY-MM-DD"
                            )}
                            onChange={(e) =>
                              setSelectedSchedule({
                                ...selectedSchedule,
                                dataInicio: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Data de Devolução:
                          </label>
                          <input
                            type="date"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={moment(
                              selectedSchedule.dataDevolucao
                            ).format("YYYY-MM-DD")}
                            onChange={(e) =>
                              setSelectedSchedule({
                                ...selectedSchedule,
                                dataDevolucao: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Dia da Semana:
                          </label>
                          <input
                            type="text"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedSchedule.diaSemana}
                            onChange={(e) =>
                              setSelectedSchedule({
                                ...selectedSchedule,
                                diaSemana: e.target.value,
                              })
                            }
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleUpdateSchedule}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={handleCloseModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Schedule;
