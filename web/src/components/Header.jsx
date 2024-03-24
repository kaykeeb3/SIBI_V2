import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("token");
    // Chama a função de logout passada como propriedade, se existir
    if (onLogout && typeof onLogout === "function") {
      onLogout();
    }
    // Recarrega a página após o logout
    window.location.reload();
  };

  return (
    <header className="bg-blue-900 text-white h-16">
      <div className="container mx-auto flex items-center justify-end py-4 px-6 ">
        <button onClick={handleLogout} className="text-lg">
          <div className="flex items-center justify-center p-2 gap-4 text-center font-medium">
            Sair <IoLogOutOutline className="w-5 h-5" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
