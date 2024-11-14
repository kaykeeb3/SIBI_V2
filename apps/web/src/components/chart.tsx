"use client";

import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchLoanAndScheduleData } from "@/services/home/home";
import { useEffect, useState } from "react";

interface LoanData {
  name: string;
  seriesCourse: string;
  startDate: string;
  returnDate: string;
  returned: boolean;
  bookId: number;
}

interface ScheduleData {
  name: string;
  quantity: number;
  startDate: string;
  returnDate: string;
  weekDay: string;
  equipmentId: number;
  returned: boolean;
  type: string;
}

interface ChartData {
  month: string;
  loans: number;
  schedules: number;
}

const chartConfig = {
  loans: {
    label: "Empréstimos",
    color: "hsl(var(--chart-1))",
  },
  schedules: {
    label: "Agendamentos",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { loans, schedules } = await fetchLoanAndScheduleData();
        const currentYear = new Date().getFullYear();

        // Filtra empréstimos e agendamentos para o ano atual
        const filteredLoans = loans.filter(
          (loan: LoanData) =>
            new Date(loan.startDate).getFullYear() === currentYear
        );
        const filteredSchedules = schedules.filter(
          (schedule: ScheduleData) =>
            new Date(schedule.startDate).getFullYear() === currentYear
        );

        // Processa os dados para exibir a quantidade mensal
        const processedData = Array.from({ length: 12 }, (_, monthIndex) => {
          const month = monthIndex + 1;
          const monthName = format(new Date(currentYear, monthIndex), "MMMM", {
            locale: ptBR,
          });

          const monthlyLoans = filteredLoans.filter(
            (loan) => new Date(loan.startDate).getMonth() === monthIndex
          ).length;

          const monthlySchedules = filteredSchedules.filter(
            (schedule) => new Date(schedule.startDate).getMonth() === monthIndex
          ).length;

          return {
            month: monthName,
            loans: monthlyLoans,
            schedules: monthlySchedules,
          };
        });

        setChartData(processedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="rounded-md shadow-none border-none">
      <CardHeader>
        <CardTitle>Gráfico de Empréstimos e Agendamentos</CardTitle>
        <CardDescription>
          Dados do ano {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[30vh] w-full">
          <LineChart
            data={chartData}
            margin={{
              left: 20,
              right: 20,
              top: 10,
              bottom: 70,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Line
              dataKey="loans"
              type="monotone"
              stroke={chartConfig.loans.color}
              strokeWidth={3}
              dot={false}
            />
            <Line
              dataKey="schedules"
              type="monotone"
              stroke={chartConfig.schedules.color}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
