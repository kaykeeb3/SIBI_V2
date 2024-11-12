import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchHomeData } from "@/services/home/home";

// Definindo o tipo para o chartData
interface ChartData {
  label: string;
  books: number;
  loans: number;
  schedules: number;
  equipments: number;
}

const chartConfig = {
  books: {
    label: "Livros",
    color: "#22c55e",
  },
  loans: {
    label: "Empréstimos",
    color: "#3b82f6",
  },
  schedules: {
    label: "Agendamentos",
    color: "#eab308",
  },
  equipments: {
    label: "Equipamentos",
    color: "#a855f7",
  },
} satisfies ChartConfig;

export function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { books, loans, schedules, equipments } = await fetchHomeData();
        setChartData([
          {
            label: "Dados",
            books,
            loans,
            schedules,
            equipments,
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart width={600} height={300} data={chartData} barCategoryGap={8}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 14, fontWeight: "bold" }}
          tickMargin={15} // Adicionando margem para o texto
        />

        <YAxis />

        <Tooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        {/* Ajustando a largura das barras para ficarem mais próximas */}
        <Bar
          dataKey="books"
          fill="var(--color-books)"
          radius={2}
          barSize={40}
        />
        <Bar
          dataKey="loans"
          fill="var(--color-loans)"
          radius={2}
          barSize={40}
        />
        <Bar
          dataKey="schedules"
          fill="var(--color-schedules)"
          radius={2}
          barSize={40}
        />
        <Bar
          dataKey="equipments"
          fill="var(--color-equipments)"
          radius={2}
          barSize={40}
        />
      </BarChart>
    </ChartContainer>
  );
}
