import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  RiBookLine,
  RiFileList2Line,
  RiUserSettingsLine,
} from "react-icons/ri";
import { FaRegAddressBook, FaDesktop } from "react-icons/fa";
import { FaComputer, FaHouseLaptop } from "react-icons/fa6";
import { IoReloadSharp } from "react-icons/io5";
import { BiIdCard } from "react-icons/bi";
import axios from "axios";
import Header from "../components/Header";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [livrosCount, setLivrosCount] = useState(0);
  const [emprestimosCount, setEmprestimosCount] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [requestsPerDay, setRequestsPerDay] = useState([]);
  const [requestsPerWeek, setRequestsPerWeek] = useState([]);
  const [requestsPerMonth, setRequestsPerMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genresCount, setGenresCount] = useState(0);
  const [requestsDelayedCount, setRequestsDelayedCount] = useState(0);
  const [livrosDisponiveisCount, setLivrosDisponiveisCount] = useState(0);
  const [equipamentosCount, setEquipamentosCount] = useState(0);
  const [agendamentosCount, setAgendamentosCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          livrosResponse,
          emprestimosResponse,
          genresResponse,
          requestsDelayedResponse,
          livrosDisponiveisResponse,
          equipamentosResponse,
          agendamentosResponse,
        ] = await Promise.all([
          axios.get("https://sibi-api.vercel.app/livros"),
          axios.get("https://sibi-api.vercel.app/emprestimos"),
          axios.get("https://sibi-api.vercel.app/livros"),
          axios.get("https://sibi-api.vercel.app/emprestimos/atrasados"),
          axios.get("https://sibi-api.vercel.app/livros/disponiveis"),
          axios.get("https://sibi-api.vercel.app/equipamentos"),
          axios.get("https://sibi-api.vercel.app/agendamentos"),
        ]);

        const livrosExcluindoMaterialAcademico = livrosResponse.data.filter(
          (livro) => livro.categoria !== "Material Acadêmico"
        );

        setLivrosCount(livrosExcluindoMaterialAcademico.length);
        setEmprestimosCount(emprestimosResponse.data.length);
        setTotalRequests(emprestimosResponse.data.length);

        const requestsPerDayObj = {};
        const requestsPerWeekObj = {};
        const requestsPerMonthObj = {};

        emprestimosResponse.data.forEach((request) => {
          const date = new Date(request.date);
          const day = date.getDate();
          const week = getWeekNumber(date);
          const month = date.getMonth() + 1;

          requestsPerDayObj[day] = (requestsPerDayObj[day] || 0) + 1;
          requestsPerWeekObj[week] = (requestsPerWeekObj[week] || 0) + 1;
          requestsPerMonthObj[month] = (requestsPerMonthObj[month] || 0) + 1;
        });

        setRequestsPerDay(Object.entries(requestsPerDayObj));
        setRequestsPerWeek(Object.entries(requestsPerWeekObj));
        setRequestsPerMonth(Object.entries(requestsPerMonthObj));
        setLoading(false);

        const currentDate = new Date();
        const delayedRequests = requestsDelayedResponse.data;
        setRequestsDelayedCount(delayedRequests.length);

        setGenresCount(genresResponse.data.length);

        setLivrosDisponiveisCount(
          livrosDisponiveisResponse.data.quantidadeLivrosDisponiveis
        );

        setEquipamentosCount(equipamentosResponse.data.length);

        setAgendamentosCount(agendamentosResponse.data.length);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }
    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    return result;
  }

  const getColor = (count) => {
    if (count > 4) return "text-green-600";
    if (count > 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getPeriodColor = (count) => {
    if (count > 4) return "bg-green-200";
    if (count > 3) return "bg-yellow-200";
    return "bg-zinc-200";
  };

  const getDelayedRequestsColor = (count) => {
    if (count >= 0 && count <= 2) return "bg-green-200";
    if (count >= 4 && count <= 5) return "bg-yellow-200";
    if (count >= 6 && count <= 10) return "bg-red-200";
    return "bg-gray-200";
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <div className="flex flex-col md:flex-row">
        <motion.div
          className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white flex flex-col z-50 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
          initial={{ x: -300 }}
          animate={{ x: isMenuOpen ? 0 : -300 }}
        >
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Menu</h2>
            <button onClick={toggleMenu}>
              <IoClose className="h-8 w-8 text-gray-400 hover:text-white" />
            </button>
          </div>
          <div className="divide-y">
            <div>
              <Link
                to="/books"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <RiBookLine className="w-6 h-6 mr-2" />
                  <span className="text-lg">Livros ({livrosCount})</span>
                </div>
              </Link>
              <Link
                to="/request"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <RiFileList2Line className="w-6 h-6 mr-2" />
                  <span className="text-lg">
                    Requisições ({emprestimosCount})
                  </span>
                </div>
              </Link>

              <Link
                to="/equipment"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <FaComputer className="w-6 h-6 mr-2" />
                  <span className="text-lg">
                    Equipamentos ({equipamentosCount})
                  </span>
                </div>
              </Link>
              <Link
                to="/schedule"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <FaHouseLaptop className="w-6 h-6 mr-2" />
                  <span className="text-lg">
                    Agendamentos ({agendamentosCount})
                  </span>
                </div>
              </Link>
            </div>
            <div>
              <Link
                to="/register-user"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <RiUserSettingsLine className="w-6 h-6 mr-2" />
                  <span className="text-lg">Cadastrar Requisição</span>
                </div>
              </Link>
              <Link
                to="/register-book"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <FaRegAddressBook className="w-6 h-6 mr-2" />
                  <span className="text-lg">Cadastrar Livro</span>
                </div>
              </Link>
              <Link
                to="/register-equipment"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <FaDesktop className="w-6 h-6 mr-2" />
                  <span className="text-lg">Cadastrar Equipamento</span>
                </div>
              </Link>
              <Link
                to="/register-schedule"
                className="p-4 hover:bg-blue-800 hover:text-white flex items-center transition duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <BiIdCard className="w-6 h-6 mr-2" />
                  <span className="text-lg">Cadastrar Agendamento</span>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="flex-grow p-8">
          <button
            className="fixed top-4 left-4 bg-blue-900 text-white p-2 rounded-md"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12M4 6h16M4 12h16m-7 6h7"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[80vh]">
              <IoReloadSharp className="text-zinc-700 animate-spin w-10 h-10 p-1 font-medium outline-none" />
              <h5 className="font-medium">Carregando...</h5>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className={`bg-white p-8 rounded-lg shadow-md`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Estatísticas</h2>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`bg-blue-200 rounded-lg p-4 hover:shadow-md transition duration-300 ease-in-out`}
                  >
                    <RiBookLine className="w-12 h-12 mb-2 text-blue-600" />
                    <p className="text-gray-800 font-semibold text-lg">
                      Livros Cadastrados
                    </p>
                    <p className="text-gray-600">{livrosCount}</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`bg-gray-200 rounded-lg p-4 ${getPeriodColor(
                      totalRequests
                    )} hover:shadow-md transition duration-300 ease-in-out`}
                  >
                    <RiFileList2Line className="w-12 h-12 mb-2 text-gray-800" />
                    <p
                      className={`font-semibold text-lg ${getColor(
                        totalRequests
                      )}`}
                    >
                      Requisições
                    </p>
                    <p className={`text-gray-600 ${getColor(totalRequests)}`}>
                      {totalRequests}
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`bg-green-200 rounded-lg p-4 hover:shadow-md transition duration-300 ease-in-out`}
                  >
                    <FaComputer className="w-12 h-12 mb-2 text-gray-800" />
                    <p className="text-gray-800 font-semibold text-lg">
                      Equipamentos Cadastrados
                    </p>
                    <p className="text-gray-600">{equipamentosCount}</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`bg-yellow-200 rounded-lg p-4 hover:shadow-md transition duration-300 ease-in-out`}
                  >
                    <FaHouseLaptop className="w-12 h-12 mb-2 text-gray-800" />
                    <p className="text-gray-800 font-semibold text-lg">
                      Agendamentos Realizados
                    </p>
                    <p className="text-gray-600">{agendamentosCount}</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className={`bg-white p-8 rounded-lg shadow-md`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Informações Adicionais
                </h2>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-gray-200 rounded-lg p-4 ${getDelayedRequestsColor(
                    requestsDelayedCount
                  )} mt-4 hover:shadow-md transition duration-300 ease-in-out`}
                >
                  <RiFileList2Line className="w-12 h-12 mb-2 text-gray-800" />
                  <p className="text-gray-800 font-semibold text-lg">
                    Requisições Atrasadas
                  </p>
                  <p className="text-gray-600">{requestsDelayedCount}</p>
                </motion.div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">
                    Requisições por Período
                  </h3>
                  <p className="text-gray-700">
                    Total de Requisições: {totalRequests}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`bg-gray-200 rounded-lg p-4 ${getPeriodColor(
                        requestsPerDay.length
                      )} hover:shadow-md transition duration-300 ease-in-out`}
                    >
                      <h4
                        className={`font-semibold mt-4 mb-2 ${getColor(
                          requestsPerDay.length
                        )}`}
                      >
                        Por Dia
                      </h4>
                      <ul>
                        {requestsPerDay.map(([day, count]) => (
                          <li
                            key={day}
                            className={`text-gray-700 ${getColor(count)}`}
                          >{`Dia: ${count}`}</li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`bg-gray-200 rounded-lg p-4 ${getPeriodColor(
                        requestsPerWeek.length * 2
                      )} hover:shadow-md transition duration-300 ease-in-out`}
                    >
                      <h4
                        className={`font-semibold mt-4 mb-2 ${getColor(
                          requestsPerWeek.length * 2
                        )}`}
                      >
                        Por Semana
                      </h4>
                      <ul>
                        {requestsPerWeek.map(([week, count]) => (
                          <li
                            key={week}
                            className={`text-gray-700 ${getColor(count)}`}
                          >{`Semana: ${count}`}</li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`bg-gray-200 rounded-lg p-4 ${getPeriodColor(
                        requestsPerMonth.length * 3
                      )} hover:shadow-md transition duration-300 ease-in-out`}
                    >
                      <h4
                        className={`font-semibold mt-4 mb-2 ${getColor(
                          requestsPerMonth.length * 3
                        )}`}
                      >
                        Por Mês
                      </h4>
                      <ul>
                        {requestsPerMonth.map(([month, count]) => (
                          <li
                            key={month}
                            className={`text-gray-700 ${getColor(count)}`}
                          >{`Mês: ${count}`}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
