import { Input } from "@/components/ui/input";

interface FilterInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  columnKey: string;
}

export const FilterInput: React.FC<FilterInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-sm border-gray-300 text-black"
    />
  );
};
