import Header from "../components/Header";
import Request from "../public/request.svg";
import Sytem from "../public/sytem.svg";
import Records from "../public/records.svg";
import Monitors from "../public/monitors.svg";
import Book from "../public/Book.svg";
import RegisterBook from "../public/register-book.svg";
import User from "../public/user.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <div className="h-full mt-16">
        <div className="max-[100%] flex items-center justify-center">
          <div className="h-full grid grid-cols-4 gap-x-32 gap-y-12 pt-5 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
            <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
              <Link to="/books">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Book} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Livros
                  </h2>
                </div>
              </Link>
            </div>

            <Link to="/request">
              <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Request} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Requisições
                  </h2>
                </div>
              </div>
            </Link>

            <Link to="/system">
              <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Sytem} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Sistema
                  </h2>
                </div>
              </div>
            </Link>

            {/*<Link to="/multimeans">
              <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Records} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Multimeios
                  </h2>
                </div>
              </div>
  </Link>*/}

            {/*<Link to="/monitors">
              <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={Monitors} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Monitores
                  </h2>
                </div>
              </div>
  </Link>*/}

            <Link to="/register-book">
              <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={RegisterBook}
                    className="w-[140px] h-[130px] mb-4"
                  />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Cadastrar Livro
                  </h2>
                </div>
              </div>
            </Link>
            <Link to="/register-user">
              <div className="w-[255px] h-[255px] bg-green-500 border border-zinc-950 rounded-lg hover:bg-green-600">
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={User} className="w-[140px] h-[130px] mb-4" />
                  <h2 className="text-center font-semibold text-zinc-800 text-2xl">
                    Cadastrar Requisição
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
