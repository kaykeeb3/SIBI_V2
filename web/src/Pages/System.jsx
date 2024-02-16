import React from "react";
import Header from "../components/Header";

import ButtonReturn from "../components/ButtonReturn";

const System = () => {
  return (
    <>
      <Header />
      <div className="container  bg-white">
        {/* Descrição do Projeto */}
        <div className="my-8 p-8">
          <div className="bg-orange-200 rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Bem-vindo ao Sistema de Biblioteca Gerardo José (SIBI)
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              O SIBI é um sistema administrativo desenvolvido para o
              gerenciamento completo de uma biblioteca de forma virtual.
              Atualmente, na sua versão 2.0 inicial, o SIBI foi concebido para
              solucionar problemas enfrentados e desenvolvido como trabalho
              voluntário em benefício da escola. Seu objetivo principal é
              proporcionar facilidade, segurança e praticidade no gerenciamento
              de bibliotecas.
            </p>
          </div>
        </div>

        {/* Colaboradores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
          {/* Colaborador 1 */}
          <div className="rounded-lg border border-gray-300 shadow-md overflow-hidden">
            <img
              className="w-full h-a object-cover object-center"
              src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/kb.jpg"
              alt="Foto de Kayke Barbosa"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Kayke Barbosa
              </h2>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                dapibus velit id enim blandit suscipit.
              </p>
            </div>
          </div>

          {/* Colaborador 2 */}
          <div className="rounded-lg border border-gray-300 shadow-md overflow-hidden">
            <img
              className="w-full h-auto object-cover object-center"
              src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/ja.jpg"
              alt="Foto de João Alison"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                João Alison
              </h2>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                dapibus velit id enim blandit suscipit.
              </p>
            </div>
          </div>

          {/* Colaborador 3 */}
          <div className="rounded-lg border border-gray-300 shadow-md overflow-hidden">
            <img
              className="w-full h-auto object-cover object-center"
              src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/rh.jpg"
              alt="Foto de Romário Henrique"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Romário Henrique
              </h2>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                dapibus velit id enim blandit suscipit.
              </p>
            </div>
          </div>

          {/* Colaborador 4 */}
          <div className="rounded-lg border border-gray-300 shadow-md overflow-hidden">
            <img
              className="w-full h-auto object-cover object-center"
              src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/mv.jpg"
              alt="Foto de Marcos Vinicius"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Marcos Vinicius
              </h2>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                dapibus velit id enim blandit suscipit.
              </p>
            </div>
          </div>

          {/* Colaborador 5 */}
          <div className="rounded-lg border border-gray-300 shadow-md overflow-hidden">
            <img
              className="w-full h-auto object-cover object-center"
              src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/br.jpg"
              alt="Foto de Bruno Rodrigues"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Bruno Rodrigues
              </h2>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                dapibus velit id enim blandit suscipit.
              </p>
            </div>
          </div>
        </div>
        <ButtonReturn />
      </div>
    </>
  );
};

export default System;
