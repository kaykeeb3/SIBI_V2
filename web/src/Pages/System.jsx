import Logo from "../public/logo.png";

const System = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-full grid grid-cols-3 gap-x-10 gap-y-10 pt-5">
        <div className="w-full rounded-lg">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img
              className="w-[100%] h-[300px] max-w-80 max-h-80 rounded-full mt-2 border-[3px] border-green-500  p-[0.12rem]"
              src={Logo}
              alt="Foto do colaborador"
              width={0}
              height={0}
              sizes="100vw"
            />
            <h2 className="font-bold text-2xl text-gray-800 p-2 uppercase">
              Kayke Barbosa
            </h2>
          </div>
        </div>

        <div className="w-full rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              className="w-[100%] h-[300px] max-w-80 max-h-80 rounded-full mt-2 border-[3px] border-green-500  p-[0.12rem]"
              src={Logo}
              alt="Foto do colaborador"
              width={0}
              height={0}
              sizes="100vw"
            />
            <h2 className="font-bold text-2xl text-gray-800 p-2 uppercase">
              João Alison
            </h2>
          </div>
        </div>

        <div className="w-full rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              className="w-[100%] h-[300px] max-w-80 max-h-80 rounded-full mt-2 border-[3px] border-green-500  p-[0.12rem]"
              src={Logo}
              alt="Foto do colaborador"
              width={0}
              height={0}
              sizes="100vw"
            />
            <h2 className="font-bold text-2xl text-gray-800 p-2 uppercase">
              Romário Henrique
            </h2>
          </div>
        </div>

        <div className="w-full rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              className="w-[100%] h-[300px] max-w-80 max-h-80 rounded-full mt-2 border-[3px] border-green-500  p-[0.12rem]"
              src={Logo}
              alt="Foto do colaborador"
              width={0}
              height={0}
              sizes="100vw"
            />
            <h2 className="font-bold text-2xl text-gray-800 p-2 uppercase">
              Marcos Vinicius
            </h2>
          </div>
        </div>

        <div className="w-full rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              className="w-[100%] h-[300px] max-w-80 max-h-80 rounded-full mt-2 border-[3px] border-green-500  p-[0.12rem]"
              src={Logo}
              alt="Foto do colaborador"
              width={0}
              height={0}
              sizes="100vw"
            />
            <h2 className="font-bold text-2xl text-gray-800 p-2 uppercase">
              Bruno Rodrigues
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default System;
