import { useState, useEffect } from "react";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import Search from "../public/search.svg";
import { HiPencilAlt } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";

const Request = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todos");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [devolvidos, setDevolvidos] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, category]);

  useEffect(() => {
    const storedDevolvidos = JSON.parse(
      localStorage.getItem("devolvidos") || "[]"
    );
    setDevolvidos(storedDevolvidos);
  }, []);

  const fetchData = async (onlyReturned = false) => {
    setLoading(true);
    try {
      let params = {};
      if (searchTerm) {
        params.nome = searchTerm;
      }
      if (category !== "Todos") {
        params.serieCurso = category;
      }
      if (onlyReturned) {
        params.devolvido = true;
      }
      const response = await axios.get("http://localhost:3000/emprestimos", {
        params,
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const handleDelete = async (request) => {
    try {
      await axios.delete(`http://localhost:3000/emprestimos/${request.id}`);
      setRequests(requests.filter((r) => r.id !== request.id));
      setDevolvidos([...devolvidos, request]);
      localStorage.setItem(
        "devolvidos",
        JSON.stringify([...devolvidos, request])
      );
    } catch (error) {
      console.error("Erro ao excluir empréstimo:", error);
    }
  };

  const handleReturn = async (request) => {
    try {
      await axios.put(
        `http://localhost:3000/emprestimos/${request.id}/devolver`
      );
      setRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      ); // Remove o empréstimo da lista após devolução
      setDevolvidos([...devolvidos, request]);
      localStorage.setItem("devolvidos", JSON.stringify(devolvidos));
    } catch (error) {
      console.error("Erro ao marcar como devolvido:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalVisible(false);
  };

  const handleUpdateRequest = async (updatedRequest) => {
    try {
      const formattedRequest = {
        ...updatedRequest,
        dataInicio: new Date(updatedRequest.dataInicio).toISOString(),
        dataDevolucao: new Date(updatedRequest.dataDevolucao).toISOString(),
      };

      await axios.put(
        `http://localhost:3000/emprestimos/${updatedRequest.id}`,
        formattedRequest
      );
      setRequests((prevRequests) =>
        prevRequests.map((r) =>
          r.id === updatedRequest.id ? updatedRequest : r
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar empréstimo:", error);
    }
  };

  const isOverdue = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  const handleFilterReturned = async () => {
    fetchData(true); // Buscar apenas requisições devolvidas
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-8 pb-11">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-[75%] py-6">
            <input
              type="text"
              placeholder="Pesquisar livro pelo nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 px-4 py-4 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center"
              onClick={handleSearch}
              disabled={loading}
            >
              <img src={Search} className="w-5 h-5" alt="Search icon" />
            </button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-green-500 rounded-md text-white px-6 py-3"
          >
            <option value="Todos">TODOS</option>
            <option value="1° ADM">1° ADM</option>
            <option value="1° INFOR">1° INFOR</option>
            <option value="1° REDES">1° REDES</option>
            <option value="1° TST">1° TST</option>
            <option value="2° ADM">2° ADM</option>
            <option value="2° INFOR">2° INFOR</option>
            <option value="2° REDES">2° REDES</option>
            <option value="2° TST">2° TST</option>
            <option value="3° ADM">3° ADM</option>
            <option value="3° CONT">3° CONT</option>
            <option value="3° INFOR">3° INFOR</option>
            <option value="3° TST">3° TST</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="animate-pulse bg-gray-200 p-6 rounded-lg shadow-md mb-6 h-40"></div>
          ) : (
            requests.map((request) => {
              if (devolvidos.some((devolvido) => devolvido.id === request.id)) {
                return null; // Ignora os empréstimos devolvidos
              }
              return (
                <div
                  key={request.id}
                  className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300 ${
                    isOverdue(request.dataDevolucao) ? "border-red-500" : ""
                  }`}
                >
                  <p className="font-bold text-lg mb-2">
                    ALUNO: {request.nome}
                  </p>
                  <p className="text-gray-600 mb-1">
                    SÉRIE/CURSO: {request.serieCurso}
                  </p>
                  <p className="text-gray-600">
                    DATA: {new Date(request.dataInicio).toLocaleDateString()} -{" "}
                    {new Date(request.dataDevolucao).toLocaleDateString()}
                  </p>
                  <div className="flex items-center justify-end mt-4 space-x-4">
                    <button onClick={() => handleEdit(request)}>
                      <HiPencilAlt
                        size={24}
                        className="text-yellow-300 hover:text-yellow-500"
                      />
                    </button>
                    <button onClick={() => handleDelete(request)}>
                      <RiDeleteBin5Fill
                        size={24}
                        className="text-red-500 hover:text-red-700"
                      />
                    </button>
                    {!devolvidos.some((r) => r.id === request.id) && (
                      <button onClick={() => handleReturn(request)}>
                        <GiConfirmed
                          size={24}
                          className="text-green-500 hover:text-green-700"
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <ButtonReturn />
      </div>
      {modalVisible && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Editar Empréstimo
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
                            value={selectedRequest.nome}
                            onChange={(e) =>
                              setSelectedRequest({
                                ...selectedRequest,
                                nome: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Série/Curso:
                          </label>
                          <input
                            type="text"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedRequest.serieCurso}
                            onChange={(e) =>
                              setSelectedRequest({
                                ...selectedRequest,
                                serieCurso: e.target.value,
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
                            value={selectedRequest.dataInicio}
                            onChange={(e) =>
                              setSelectedRequest({
                                ...selectedRequest,
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
                            value={selectedRequest.dataDevolucao}
                            onChange={(e) =>
                              setSelectedRequest({
                                ...selectedRequest,
                                dataDevolucao: e.target.value,
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
                  onClick={() => handleUpdateRequest(selectedRequest)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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
        </div>
      )}
    </>
  );
};

export default Request;
