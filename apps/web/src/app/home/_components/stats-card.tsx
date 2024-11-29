import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="aspect-video rounded-md shadow-md p-4 transition-all duration-500 transform hover:scale-105 flex flex-col justify-between border-b-4 border-b-primary">
        <CardDescription className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <CardTitle className="text-base font-semibold text-zinc-800 break-words">
              {Array.isArray(title)
                ? title.map((t, index) => <span key={index}>{t}</span>)
                : title}
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Icon size={28} className={iconColor} />
          </motion.div>
        </CardDescription>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {isLoading ? (
            <div className="w-full h-16 flex items-center justify-center">
              <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
          ) : (
            <span className="text-4xl font-bold text-gray-900">{count}</span>
          )}
        </motion.div>
      </Card>
    </motion.div>
  );
}
