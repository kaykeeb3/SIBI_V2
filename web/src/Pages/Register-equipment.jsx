import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterEquipment = () => {
  const [newEquipment, setNewEquipment] = useState({
    nome: "",
    tipo: "",
    quantidade: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({ ...newEquipment, [name]: value });
  };

  const handleNewEquipmentSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos obrigatórios estão preenchidos
    if (
      !newEquipment.nome ||
      !newEquipment.tipo ||
      newEquipment.quantidade <= 0
    ) {
      toast.error(
        "Por favor, preencha todos os campos obrigatórios e certifique-se de que a quantidade é um número positivo."
      );
      return;
    }

    try {
      // Enviar os dados no formato JSON
      await axios.post(
        "http://localhost:3000/equipamentos",
        {
          nome: newEquipment.nome,
          tipo: newEquipment.tipo,
          quantidade: parseInt(newEquipment.quantidade), // Converte a quantidade para um número
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Equipamento cadastrado com sucesso!");
      setNewEquipment({
        nome: "",
        tipo: "",
        quantidade: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      toast.error("Erro ao cadastrar equipamento. Por favor, tente novamente.");
    }
  };

  // Lista de opções para o campo "tipo"
  const options = ["Televisão", "Projetor", "Periféricos"];

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
          <h2 className="text-xl font-bold">Cadastrar Novo Equipamento</h2>
          <form onSubmit={handleNewEquipmentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nome:</label>
              <input
                type="text"
                name="nome"
                value={newEquipment.nome}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tipo:</label>
              <select
                name="tipo"
                value={newEquipment.tipo}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              >
                <option value="">Selecione...</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                value={newEquipment.quantidade}
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

export default RegisterEquipment;
