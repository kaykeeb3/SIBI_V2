import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

interface CardItemProps {
  title: string;
  icon: string;
  description: string;
  details: string;
  status?: "success" | "progress" | "pending";
}

export function CardItem({
  title,
  icon,
  description,
  details,
  status = "progress",
}: CardItemProps) {
  const statusStyles = {
    success: "bg-green-500",
    progress: "bg-yellow-500",
    pending: "bg-red-500",
  };

  return (
    <div className="flex flex-col space-y-6">
      <Card className="flex flex-col border-none shadow-none rounded-none">
        <CardTitle className="text-2xl font-bold mb-1 px-4">{title}</CardTitle>
        <div className="text-zinc-800 mb-6">
          <CardDescription className="text-zinc-700 mb-2 font-normal px-4">
            <span>{description}</span>
          </CardDescription>
        </div>
        <div className="relative flex">
          <div className="absolute left-4 top-0 h-full w-[2px] bg-zinc-300" />
          <div
            className={`absolute left-0 top-6 w-8 h-8 ${statusStyles[status]} text-white flex items-center justify-center rounded-full`}
          >
            <span className="text-lg font-bold">{icon}</span>
          </div>
          <Card className="ml-12 bg-card-foreground text-zinc-200 p-4 rounded-lg shadow-lg relative w-full">
            <div className="absolute -left-2 top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-zinc-50" />
            <CardContent className="flex items-center space-x-2 px-0 py-0">
              <Badge
                className={` text-white px-2 py-1 rounded ${status === "success" ? "bg-primary" : status === "pending" ? "bg-primary" : "bg-primary"}`}
              >
                {title.split(" ")[0]}
              </Badge>
            </CardContent>
            <CardTitle className="text-lg font-semibold mt-2">
              {description}
            </CardTitle>
            <CardDescription className="text-zinc-400 font-normal mt-1 text-sm">
              {details}
            </CardDescription>
          </Card>
        </div>
      </Card>
    </div>
  );
}
