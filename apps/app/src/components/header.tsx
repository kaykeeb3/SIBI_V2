import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="container-fluid w-100 d-flex justify-content-end align-items-center py-2 px-5">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <img
          src="https://avatars.githubusercontent.com/u/104206837?v=4&size=40"
          alt="Foto de Perfil do usuário"
          className="rounded-circle w-auto"
        />

        <div className="text-white d-flex flex-column">
          <strong className="font-weight-bold">Olá, Kayke</strong>
          <span className="fs-7 font-weight-normal">EEEP Gerardo José</span>


        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button className="px-0 py-0 bg-transparent shadow-none border-0">
            <ChevronDown className="text-white w-75" />
          </button>
        </div>


      </div>
    </header>
  );
}
