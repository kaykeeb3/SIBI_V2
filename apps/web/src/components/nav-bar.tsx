import { Link, useLocation } from "react-router-dom";
import { Blend, Home, IdCard, NotebookTextIcon, Tv } from "lucide-react";

import logo from "../public/assets/logo.svg";

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/books", icon: NotebookTextIcon, label: "Livros" },
  { to: "/loans", icon: Blend, label: "Empréstimos" },
  { to: "/equipments", icon: Tv, label: "Equipamentos" },
  { to: "/schedules", icon: IdCard, label: "Agendamentos" },
];

export function NavBar() {
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  return (
    <div className="h-screen bg-card-foreground flex flex-col items-center justify-start w-16 fixed top-0 left-0 z-20">
      <div className="flex flex-col items-center justify-start">
        <div className="p-2">
          <div className="flex items-center justify-center mb-8 mt-4">
            <Link to="/">
              <img src={logo} className="w-4" alt="Logo" />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-4 items-center">
            {navItems.map(({ to, icon: Icon, label }, index) => (
              <div className="relative group" key={index}>
                <Link to={to}>
                  <div
                    className={`transition-all p-3 rounded sm:p-2 ${
                      isActive(to) ? "bg-primary/40" : ""
                    } group-hover:scale-110 group-hover:bg-primary/30 transform duration-300 ease-in-out`}
                  >
                    <Icon
                      width={20}
                      className="text-zinc-300 group-hover:text-white transition-all duration-200"
                    />
                  </div>
                </Link>

                <div
                  className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-primary/90 text-white text-sm font-medium rounded py-1 px-3 shadow-lg transition-opacity duration-300"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
