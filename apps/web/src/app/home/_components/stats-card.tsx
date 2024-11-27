import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface StatsCardProps {
  title: string | (string | React.ReactNode)[];
  count: number;
  Icon: React.ComponentType<any>;
  iconColor: string;
  isLoading: boolean;
}

export function StatsCard({
  title,
  count,
  Icon,
  iconColor,
  isLoading,
}: StatsCardProps) {
  return (
    <Card className="aspect-video rounded-md shadow-md p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-primary">
      <CardDescription className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold text-zinc-800 break-words">
          {Array.isArray(title)
            ? title.map((t, index) => <span key={index}>{t}</span>)
            : title}
        </CardTitle>
        <Icon size={28} className={iconColor} />
      </CardDescription>
      {isLoading ? (
        <div className="w-full h-16 flex items-center justify-center">
          <Loader2 className="animate-spin text-gray-500" size={32} />
        </div>
      ) : (
        <span className="text-4xl font-bold text-gray-900">{count}</span>
      )}
    </Card>
  );
}
