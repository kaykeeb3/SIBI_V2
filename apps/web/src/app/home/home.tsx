import { useState, useEffect } from "react";
import { StatsCard } from "./_components/stats-card";
import { DashboardHeader } from "./_components/dashboard-header";
import { ChartPie } from "@/components/chart-pie";
import { Chart } from "@/components/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Book, User, Calendar, Package } from "lucide-react";
import { fetchHomeData } from "@/services/home/home-service";

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

  const [apiStatus, setApiStatus] = useState<string>("API parada");
  const [showApiStatus, setShowApiStatus] = useState<boolean>(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const checkApiStatus = () => {
    const lastUpdated = localStorage.getItem("lastUpdated");
    const currentTime = new Date();
    const lastUpdateTime = lastUpdated ? new Date(lastUpdated) : new Date(0);

    const timeDifference =
      (currentTime.getTime() - lastUpdateTime.getTime()) / (1000 * 60 * 60);

    if (timeDifference < 4) {
      setApiStatus("API rodando");
      setShowApiStatus(true);

      setTimeout(() => {
        setShowApiStatus(false);
      }, 60000);
    } else {
      setApiStatus("API parada");
      setShowApiStatus(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const cachedData = localStorage.getItem("homeData");
      const cachedTime = localStorage.getItem("lastUpdated");

      if (cachedData && cachedTime) {
        const cachedDataParsed = JSON.parse(cachedData);
        const lastUpdated = new Date(cachedTime);
        const currentTime = new Date();
        const timeDifference =
          (currentTime.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

        if (timeDifference < 4) {
          setData(cachedDataParsed);
          setIsLoading(false);
          checkApiStatus();
          return;
        }
      }

      try {
        const homeData = await fetchHomeData();
        homeData.date = new Date().toISOString();
        localStorage.setItem("homeData", JSON.stringify(homeData));
        localStorage.setItem("lastUpdated", new Date().toISOString());
        setData(homeData);
        setIsLoading(false);
        checkApiStatus();
      } catch (error) {
        console.error("Erro ao buscar dados para Home", error);
        setIsLoading(false);
      }
    };

    getData();

    const intervalId = setInterval(
      () => {
        checkApiStatus();
      },
      1000 * 60 * 60 * 4
    );

    const alertTimeout = setTimeout(() => {
      setIsAlertVisible(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(alertTimeout);
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center w-full px-20">
      <Card className="shadow-none border-none bg-transparent w-full mb-8">
        <DashboardHeader />
        <CardContent className="w-full flex flex-col items-center">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total de Livros Cadastrados"
              count={data.books}
              Icon={Book}
              iconColor="text-green-500"
              isLoading={isLoading}
            />
            <StatsCard
              title="Total de Empréstimos Ativos"
              count={data.loans}
              Icon={User}
              iconColor="text-blue-500"
              isLoading={isLoading}
            />
            <StatsCard
              title="Total de Agendamentos Cadastrados"
              count={data.schedules}
              Icon={Calendar}
              iconColor="text-yellow-500"
              isLoading={isLoading}
            />
            <StatsCard
              title="Total de Equipamentos Cadastrados"
              count={data.equipments}
              Icon={Package}
              iconColor="text-purple-500"
              isLoading={isLoading}
            />
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 w-full">
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
                  <Skeleton className="w-full h-40 animate-pulse bg-zinc-100 rounded-md" />
                ) : (
                  <ChartPie />
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {isAlertVisible && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center">
          <Alert className="flex flex-col items-center justify-center bg-gradient-to-t from-cyan-400 to-sky-500 rounded-none w-full h-7">
            <AlertDescription className="font-medium text-white text-center text-xs">
              A aplicação atualiza os dados totais dos gráficos e dos cards, com
              intervalos de 4 horas.{" "}
              {showApiStatus ? <b>({apiStatus})</b> : <b>({apiStatus})</b>}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
