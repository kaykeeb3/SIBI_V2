import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ButtonReturn from "../components/ButtonReturn";

const System = () => {
  return (
    <>
      <Header />
      <div className="container">
        {/* Descrição do Projeto */}
        <div className="my-8 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-orange-200 rounded-lg p-6 shadow-md"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Bem-vindo ao Sistema de Biblioteca Gerardo José (SIBI)
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              O SIBI é uma plataforma administrativa inovadora projetada para
              oferecer um gerenciamento abrangente e eficiente de bibliotecas de
              forma virtual. Sua versão 2.0 inicial foi concebida como uma
              solução voluntária para superar os desafios enfrentados pelas
              bibliotecas, com um compromisso em beneficiar as instituições
              educacionais. Com a missão de proporcionar facilidade, segurança e
              praticidade no gerenciamento de bibliotecas, o SIBI foi
              desenvolvido com recursos avançados para atender às necessidades
              específicas dos usuários. Além de simplificar o processo de
              catalogação e organização de acervos, o sistema oferece
              funcionalidades adicionais, como geração de relatórios
              personalizados, acompanhamento de empréstimos e devoluções,
              integração com sistemas de gestão escolar e acesso remoto para
              usuários, promovendo assim uma experiência completa e eficaz de
              gestão bibliotecária. Com uma interface intuitiva e recursos de
              segurança robustos, o SIBI se destaca como uma ferramenta
              indispensável para bibliotecas modernas em busca de otimização e
              excelência na administração de seus recursos informativos.
            </p>
          </motion.div>
        </div>

        {/* Colaboradores */}
        <div className="flex items-center justify-center">
          <div className="w-[75%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-28 p-8">
              {/* Colaborador 1 */}
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-auto object-cover object-center p-2"
                  src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/kb.jpg"
                  alt="Foto de Kayke Barbosa"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Kayke Barbosa - Dev Full-Stack
                  </h2>
                  <p className="text-base text-gray-700">
                    Com vasta experiência e profundo conhecimento em tecnologias
                    de desenvolvimento web, o profissional é especializado em
                    uma ampla gama de ferramentas e frameworks essenciais para a
                    construção de aplicações modernas e eficientes. Domina
                    Node.js, um ambiente de execução JavaScript que permite o
                    desenvolvimento de aplicações de servidor escaláveis e de
                    alto desempenho. Além disso, possui expertise em React, um
                    poderoso framework JavaScript para a criação de interfaces
                    de usuário dinâmicas e interativas. Seu conhecimento
                    avançado em MySQL o capacita a projetar e gerenciar bancos
                    de dados relacionais de forma eficaz, garantindo a
                    integridade e segurança dos dados. Destaca-se também em
                    Prisma, uma ferramenta de ORM (Object-Relational Mapping)
                    moderna e eficiente, que simplifica a interação com bancos
                    de dados em aplicações Node.js. Além dessas tecnologias
                    principais, possui habilidades em uma variedade de outras
                    ferramentas e bibliotecas, incluindo JWT para autenticação
                    segura, Express para construção de APIs RESTful, e Tailwind
                    CSS para desenvolvimento de interfaces responsivas e
                    elegantes. Com um conjunto diversificado de habilidades,
                    esse profissional está preparado para enfrentar os desafios
                    mais complexos no desenvolvimento de software, entregando
                    soluções de alta qualidade e desempenho para seus clientes e
                    projetos
                  </p>
                </div>
              </motion.div>

              {/* Colaborador 2 */}
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-auto object-cover object-center p-2"
                  src="https://sibigerardojose.000webhostapp.com/View/Sobre/img/mv.jpg"
                  alt="Foto de Marcos Vinicius"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Marcos Vinicius - UX Designer
                  </h2>
                  <p className="text-base text-gray-700">
                    Com uma paixão pela criação de experiências digitais
                    memoráveis e intuitivas, esse profissional é especializado
                    em diversas áreas do design de interface e experiência do
                    usuário (UI/UX). Possui habilidades avançadas em Figma, uma
                    poderosa ferramenta de design colaborativo que permite
                    criar, prototipar e colaborar em projetos de design de forma
                    eficiente e eficaz. Seu conhecimento em UI/UX Design abrange
                    a compreensão profunda dos princípios de design, teoria das
                    cores, tipografia e layout, garantindo que suas criações
                    sejam visualmente atraentes e funcionais. Além disso, é
                    experiente em prototipação, utilizando ferramentas como
                    InVision ou Adobe XD para transformar ideias em protótipos
                    interativos e testáveis. Além de sua especialização
                    principal, este profissional também tem experiência em
                    outras áreas relacionadas, como design de interação,
                    usabilidade, acessibilidade e design responsivo. Com sua
                    habilidade em entender as necessidades dos usuários e
                    traduzi-las em interfaces intuitivas e agradáveis, ele é
                    capaz de criar produtos digitais que se destacam no mercado
                    e proporcionam uma experiência excepcional aos usuários
                    finais
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <ButtonReturn />
    </>
  );
};

export default System;
