import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectDropdownProps {
  label: string;
  items: string[];
  defaultValue?: string;
  onSelect: (value: string) => void;
}

export function SelectDropdown({
  label,
  items,
  defaultValue = "Todos",
  onSelect,
}: SelectDropdownProps) {
  return (
    <div>
      <label className="block text-black">{label}</label>
      <Select defaultValue={defaultValue} onValueChange={onSelect}>
        <SelectTrigger className="border border-zinc-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
