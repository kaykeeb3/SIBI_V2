import * as React from "react";
import { Pie, PieChart, Label, Tooltip as RechartsTooltip } from "recharts";
import { getAllLoans, getAllSchedules } from "@/services/home/home-service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  loans: {
    label: "Empréstimos",
    color: "hsl(var(--chart-1))",
  },
  schedules: {
    label: "Agendamentos",
    color: "hsl(var(--chart-5))",
  },
};

export function ChartPie() {
  const [loanCount, setLoanCount] = React.useState(0);
  const [scheduleCount, setScheduleCount] = React.useState(0);

  const fetchData = async () => {
    try {
      const loans = await getAllLoans();
      const schedules = await getAllSchedules();
      setLoanCount(loans.length);
      setScheduleCount(schedules.length);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const total = loanCount + scheduleCount;

  const chartData = [
    { name: "Empréstimos", value: loanCount, fill: chartConfig.loans.color },
    {
      name: "Agendamentos",
      value: scheduleCount,
      fill: chartConfig.schedules.color,
    },
  ];

  return (
    <Card className="rounded-md shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-black">
          Empréstimos e Agendamentos
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Total de empréstimos e agendamentos
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart width={200} height={200} className="mx-auto">
            <RechartsTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              animationDuration={1000}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan className="fill-foreground text-2xl font-bold">
                          {total.toLocaleString()}
                        </tspan>
                        <tspan className="fill-muted-foreground text-sm">
                          Total
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
