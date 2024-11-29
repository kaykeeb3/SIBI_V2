import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardHeader({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between p-4">
        <motion.h1
          className="text-3xl font-semibold text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <div className="flex items-center justify-center gap-4">
          <Select disabled>
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
          <div className="text-black flex items-center gap-1">
            <Input
              placeholder="Faça alguma pesquisa"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="button" onClick={handleSearch} className="py-0 px-3">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
