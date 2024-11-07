import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  items: string[];
  onItemSelect: (item: string | null) => void;
  defaultValue?: string;
}

export function FilterDropdown({
  label,
  items,
  onItemSelect,
  defaultValue = "Todos",
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto text-black">
          {label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onItemSelect(null)}>
          {defaultValue}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem key={item} onClick={() => onItemSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
