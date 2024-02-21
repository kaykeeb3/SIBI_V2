import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "../components/Header";
import { motion } from "framer-motion";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ nome: "", senha: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Se houver um token válido no localStorage, autentique automaticamente
      onLogin(token);
    }
  }, [onLogin]);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://sibi-api.vercel.app/login",
        credentials, // Envie as credenciais diretamente
        {
          headers: {
            "Content-Type": "application/json", // Defina o cabeçalho Content-Type como application/json
          },
        }
      );
      const token = response.data.token;

      // Armazene o token no localStorage
      localStorage.setItem("token", token);

      // Defina um temporizador para remover o token após uma hora
      setTimeout(() => {
        localStorage.removeItem("token");
      }, 3600000); // 1 hora em milissegundos

      onLogin(token);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        className="flex justify-center items-center h-screen"
        id="background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-96 bg-white/90 p-8 rounded-md shadow-md border border-green-500 h-[350px]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="nome"
            >
              Nome de Usuário:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              value={credentials.nome}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="senha"
            >
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              value={credentials.senha}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-green-500"
            />
          </div>
          <motion.button
            onClick={handleLogin}
            className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
