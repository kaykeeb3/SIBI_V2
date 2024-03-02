import { Link } from "react-router-dom";

export default function ButtonReturn() {
  return (
    <div className="fixed-button fixed left-0 bottom-0 p-4 z-50">
      <Link to="/">
        <div className="flex items-center justify-center w-28 h-10 rounded-md text-base text-white bg-blue-500 hover:bg-blue-600">
          Voltar
        </div>
      </Link>
    </div>
  );
}
