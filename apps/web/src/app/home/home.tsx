import { useState, useEffect } from "react";
import { ChartPie } from "@/components/chart-pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Book, User, Calendar, Package, Loader2 } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

interface CountData {
  books: number;
  loans: number;
  schedules: number;
  equipments: number;
  date: string;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CountData>({
    books: 0,
    loans: 0,
    schedules: 0,
    equipments: 0,
    date: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const homeData = await fetchHomeData();
        homeData.date = new Date().toISOString();
        setData(homeData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados para Home", error);
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const renderCard = (
    title: string,
    count: number,
    Icon: React.ComponentType<any>,
    iconColor: string
  ) => (
    <Card className="aspect-video rounded-md shadow-md p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-primary">
      <CardDescription className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold text-gray-800">
          {title}
        </CardTitle>
        <Icon size={28} className={iconColor} />
      </CardDescription>
      {isLoading ? (
        <Skeleton className="w-full h-16 animate-pulse bg-zinc-100 rounded-md" />
      ) : (
        <span className="text-4xl font-bold text-gray-900">{count}</span>
      )}
    </Card>
  );

  return (
    <div className="mx-auto flex flex-col items-center w-full px-4 sm:w-5/6">
      <Card className="shadow-none border-none bg-transparent w-full">
        <div className="flex items-center justify-between p-4">
          <CardTitle className="text-3xl font-semibold text-gray-900">
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
              {renderCard(
                "Total de Livros Cadastrados",
                data.books,
                Book,
                "text-green-500"
              )}
              {renderCard(
                "Total de Empréstimos Ativos",
                data.loans,
                User,
                "text-blue-500"
              )}
              {renderCard(
                "Total de Agendamentos Cadastrados",
                data.schedules,
                Calendar,
                "text-yellow-500"
              )}
              {renderCard(
                "Total de Equipamentos Cadastrados",
                data.equipments,
                Package,
                "text-purple-500"
              )}
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-6">
              <Card className="lg:col-span-2 rounded-md border-b-4 border-b-primary">
                <CardContent className="p-4">
                  {isLoading ? (
                    <Skeleton className="w-full h-40 animate-pulse bg-zinc-100 rounded-md" />
                  ) : (
                    <Chart />
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-md border-b-4 border-b-primary">
                <CardContent className="p-4">
                  {isLoading ? (
                    <Skeleton className="w-full h-40 animate-pulse bg-zinc-100 rounded-md border-b-4 border-b-primary" />
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
