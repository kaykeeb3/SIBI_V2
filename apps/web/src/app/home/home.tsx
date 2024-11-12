import { useState, useEffect } from "react";
import { ChartPie } from "@/components/chart-pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  User,
  Calendar,
  Package,
  Loader2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchHomeData } from "@/services/home/home";
import { Chart } from "@/components/chart";

interface CountData {
  books: number;
  loans: number;
  schedules: number;
  equipments: number;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CountData>({
    books: 0,
    loans: 0,
    schedules: 0,
    equipments: 0,
  });

  const [previousData, setPreviousData] = useState<CountData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const homeData = await fetchHomeData();

        const storedData = localStorage.getItem("previousData");
        const prevData = storedData ? JSON.parse(storedData) : null;

        setPreviousData(
          prevData || { books: 0, loans: 0, schedules: 0, equipments: 0 }
        );
        setData(homeData);

        localStorage.setItem("previousData", JSON.stringify(homeData));

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados para Home", error);
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const calculatePercentageChange = (
    current: number,
    previous: number
  ): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="mx-auto flex flex-col items-center w-5/6">
      <Card className="shadow-none border-none bg-transparent w-full">
        <div className="flex items-center justify-between p-4">
          <CardTitle className="text-3xl font-semibold text-black">
            Dashboard
          </CardTitle>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Customer Success" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="semanal">Relatórios Semanais</SelectItem>
                  <SelectItem value="mensal">Relatórios Mensais</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <CardContent className="w-full flex flex-col items-center">
          <div className="flex flex-col w-full">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* Cartão de Livros */}
              <Card className="aspect-video rounded-md bg-gradient-to-tl from-zinc-100 to-zinc-50 shadow-lg p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-green-500">
                <CardDescription className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-zinc-900">
                    Total de Livros Cadastrados
                  </CardTitle>
                  <Book size={24} className="text-green-500" />
                </CardDescription>

                {isLoading ? (
                  <Loader2 className="text-green-500 animate-spin" size={28} />
                ) : (
                  <div className="flex flex-col items-start">
                    <span className="text-3xl font-semibold">{data.books}</span>
                    {previousData && (
                      <span className="text-sm text-gray-500 flex items-center">
                        {calculatePercentageChange(
                          data.books,
                          previousData.books
                        ) > 0 ? (
                          <ArrowUp size={16} className="text-green-500 mr-1" />
                        ) : (
                          <ArrowDown size={16} className="text-red-500 mr-1" />
                        )}
                        {calculatePercentageChange(
                          data.books,
                          previousData.books
                        ).toFixed(2)}
                        %
                      </span>
                    )}
                  </div>
                )}
              </Card>

              {/* Cartão de Empréstimos */}
              <Card className="aspect-video rounded-md bg-gradient-to-tl from-zinc-100 to-zinc-50 shadow-lg p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-blue-500">
                <CardDescription className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-zinc-900">
                    Total de Empréstimos Ativos
                  </CardTitle>
                  <User size={24} className="text-blue-500" />
                </CardDescription>
                {isLoading ? (
                  <Loader2 className="text-blue-500 animate-spin" size={28} />
                ) : (
                  <div className="flex flex-col items-start">
                    <span className="text-3xl font-semibold">{data.loans}</span>
                    {previousData && (
                      <span className="text-sm text-gray-500 flex items-center">
                        {calculatePercentageChange(
                          data.loans,
                          previousData.loans
                        ) > 0 ? (
                          <ArrowUp size={16} className="text-green-500 mr-1" />
                        ) : (
                          <ArrowDown size={16} className="text-red-500 mr-1" />
                        )}
                        {calculatePercentageChange(
                          data.loans,
                          previousData.loans
                        ).toFixed(2)}
                        %
                      </span>
                    )}
                  </div>
                )}
              </Card>

              {/* Cartão de Agendamentos */}
              <Card className="aspect-video rounded-md bg-gradient-to-tl from-zinc-100 to-zinc-50 shadow-lg p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-yellow-500">
                <CardDescription className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-zinc-900">
                    Total de Agendamentos Cadastrados
                  </CardTitle>
                  <Calendar size={24} className="text-yellow-500" />
                </CardDescription>
                {isLoading ? (
                  <Loader2 className="text-yellow-500 animate-spin" size={28} />
                ) : (
                  <div className="flex flex-col items-start">
                    <span className="text-3xl font-semibold">
                      {data.schedules}
                    </span>
                    {previousData && (
                      <span className="text-sm text-gray-500 flex items-center">
                        {calculatePercentageChange(
                          data.schedules,
                          previousData.schedules
                        ) > 0 ? (
                          <ArrowUp size={16} className="text-green-500 mr-1" />
                        ) : (
                          <ArrowDown size={16} className="text-red-500 mr-1" />
                        )}
                        {calculatePercentageChange(
                          data.schedules,
                          previousData.schedules
                        ).toFixed(2)}
                        %
                      </span>
                    )}
                  </div>
                )}
              </Card>

              {/* Cartão de Equipamentos */}
              <Card className="aspect-video rounded-md bg-gradient-to-tl from-zinc-100 to-zinc-50 shadow-lg p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-purple-500">
                <CardDescription className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-zinc-900">
                    Total de Equipamentos Cadastrados
                  </CardTitle>
                  <Package size={24} className="text-purple-500" />
                </CardDescription>
                {isLoading ? (
                  <Loader2 className="text-purple-500 animate-spin" size={28} />
                ) : (
                  <div className="flex flex-col items-start">
                    <span className="text-3xl font-semibold">
                      {data.equipments}
                    </span>
                    {previousData && (
                      <span className="text-sm text-gray-500 flex items-center">
                        {calculatePercentageChange(
                          data.equipments,
                          previousData.equipments
                        ) > 0 ? (
                          <ArrowUp size={16} className="text-green-500 mr-1" />
                        ) : (
                          <ArrowDown size={16} className="text-red-500 mr-1" />
                        )}
                        {calculatePercentageChange(
                          data.equipments,
                          previousData.equipments
                        ).toFixed(2)}
                        %
                      </span>
                    )}
                  </div>
                )}
              </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-6">
              {/* Gráficos */}
              <Card className="lg:col-span-2 rounded-md bg-white shadow-lg">
                <CardContent className="p-4">
                  {isLoading ? (
                    <Loader2 className="text-gray-500 animate-spin" size={40} />
                  ) : (
                    <div>
                      <Chart />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-md bg-white shadow-lg">
                <CardContent className="p-4">
                  {isLoading ? (
                    <Loader2 className="text-gray-500 animate-spin" size={40} />
                  ) : (
                    <ChartPie />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
