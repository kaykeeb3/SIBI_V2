import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Blend,
  BotMessageSquare,
  ChartLine,
  Ellipsis,
  Home,
  IdCard,
  Library,
  Settings,
  Tv,
  Users,
} from "lucide-react";

import logo from "@/public/assets/logo.svg";

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/books", icon: Library, label: "Livros" },
  { to: "/loans", icon: Blend, label: "Empréstimos" },
  { to: "/equipments", icon: Tv, label: "Equipamentos" },
  { to: "/schedules", icon: IdCard, label: "Agendamentos" },
  { to: "/users", icon: Users, label: "Usuários" },
  { to: "/messages", icon: BotMessageSquare, label: "Chatbot" },
  { to: "/chart", icon: ChartLine, label: "Estáticas" },
  { to: "/about", icon: Ellipsis, label: "Saiba mais" },
];

export function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen bg-card-foreground flex flex-col justify-between w-14 fixed top-0 left-0 z-20">
      <div className="flex flex-col items-center justify-start">
        <div className="p-2">
          <div className="flex items-center justify-center mb-8 mt-4">
            <Link to="/">
              <img src={logo} className="w-4" alt="Logo" />
            </Link>
          </div>

          <div className="flex flex-col gap-4 items-center">
            {navItems.map(({ to, icon: Icon, label }, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                <Link to={to}>
                  <div
                    className={`transition-all p-3 rounded sm:p-2 ${
                      isActive(to) ? "bg-primary/20" : ""
                    } group-hover:scale-110 group-hover:bg-primary/20 transform duration-300 ease-in-out`}
                  >
                    <Icon
                      width={18}
                      className={`transition-all duration-200 ${
                        isActive(to)
                          ? "text-primary/50"
                          : "text-zinc-400 group-hover:text-primary/40"
                      }`}
                    />
                  </div>
                </Link>

                <div
                  className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-card-foreground text-white text-sm font-light rounded py-1 px-3 shadow-lg transition-opacity duration-300"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="relative group text-white flex items-center justify-center mb-5"
        initial={{ opacity: 0, scale: 0.8 }} // Animação inicial
        animate={{ opacity: 1, scale: 1 }} // Animação de carregamento
        exit={{ opacity: 0, scale: 0.8 }} // Animação de saída
        transition={{
          duration: 0.3,
          delay: navItems.length * 0.1, // Delay após o último item
        }}
      >
        <Link to="/settings">
          <div
            className={`transition-all p-3 rounded sm:p-2 group-hover:scale-110 ${
              isActive("/settings") ? "bg-primary/20" : ""
            } group-hover:bg-primary/20 transform duration-300 ease-in-out`}
          >
            <Settings
              width={18}
              className={`transition-all duration-200 ${
                isActive("/settings")
                  ? "text-primary/50"
                  : "text-zinc-400 group-hover:text-primary/40"
              }`}
            />
          </div>
        </Link>
        <div
          className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-card-foreground text-white text-sm font-light rounded py-1 px-3 shadow-lg transition-opacity duration-300"
          style={{ whiteSpace: "nowrap" }}
        >
          Configurações
        </div>
      </motion.div>
    </div>
  );
}
