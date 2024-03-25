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
        <button onClick={handleLogout}>
          <h3 className="flex items-center justify-center text-center p-2 gap-2 font-semibold hover:underline">
            SAIR <IoLogOutOutline className="w-5 h-5 text-zinc-50" />
          </h3>
        </button>
      </div>
    </header>
  );
};

export default Header;

{
  /*
   <div className="flex items-center justify-center p-2 gap-2 font-semibold hover:font-bold">
      SAIR <IoLogOutOutline className="w-7 h-7" />
    </div>
*/
}
