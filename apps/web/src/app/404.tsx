import { Link } from "react-router-dom";

import error from "@/public/assets/404.svg";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-gradient-to-r from-white to-zinc-300">
      <div className="">
        <img src={error} alt="Ops! deu algum erro." className="w-full" />
      </div>

      <h1 className="text-4xl font-bold text-black">
        A página não foi encontrada
      </h1>
      <p className="text-accent-foreground  hover:underline">
        Voltar para{" "}
        <Link className="text-foreground font-medium" to="/">
          início
        </Link>
        .
      </p>
    </div>
  );
}
