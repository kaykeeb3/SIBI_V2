import React from "react";
import Header from "../components/Header";
import Request from "../public/request.svg";
import Sytem from "../public/sytem.svg";
import Book from "../public/book.svg";
import RegisterBook from "../public/register-book.svg";
import User from "../public/user.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Header />
      <div className="h-full mt-16">
        <div className="w-full flex items-center justify-center">
          <div className="h-full grid grid-cols-4 gap-x-28 gap-y-12 pt-5 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
            {/* Livros */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[235px] h-[235px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600"
            >
              <Link to="/books">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Book} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-bold text-zinc-800 uppercase text-xl md:text-2xl lg:text-3xl xl:text-2xl">
                    Livros
                  </h2>
                </div>
              </Link>
            </motion.div>

            {/* Requisições */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-[235px] h-[235px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600"
            >
              <Link to="/request">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Request} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-bold text-zinc-800 uppercase text-xl md:text-2xl lg:text-3xl xl:text-2xl">
                    Requisições
                  </h2>
                </div>
              </Link>
            </motion.div>

            {/* Sistema */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-[235px] h-[235px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600"
            >
              <Link to="/system">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Sytem} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-bold text-zinc-800 uppercase text-xl md:text-2xl lg:text-3xl xl:text-2xl">
                    Sistema
                  </h2>
                </div>
              </Link>
            </motion.div>

            {/* Cadastro de Livro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-[235px] h-[235px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600"
            >
              <Link to="/register-book">
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={RegisterBook}
                    className="w-[140px] h-[130px] mb-4"
                  />
                  <h2 className="text-center font-bold text-zinc-800 uppercase text-xl md:text-2xl lg:text-3xl xl:text-2xl">
                    Cadastrar Livro
                  </h2>
                </div>
              </Link>
            </motion.div>

            {/* Cadastro de Requisição */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-[235px] h-[235px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600"
            >
              <Link to="/register-user">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={User} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-bold text-zinc-800 uppercase text-xl md:text-2xl lg:text-3xl xl:text-2xl">
                    Cadastrar Requisição
                  </h2>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
