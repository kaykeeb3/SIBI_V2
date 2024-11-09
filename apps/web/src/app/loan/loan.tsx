import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, FileEdit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectDropdown } from "@/components/select-dropdown";
import { DataTable } from "@/components/data-table ";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";

export type Loan = {
  id: string;
  name: string;
  course: string;
  startDate: string;
  endDate: string;
  returned: boolean;
};

const generateLoans = (count: number): Loan[] => {
  const loanData: Loan[] = [];
  for (let i = 1; i <= count; i++) {
    loanData.push({
      id: String(i),
      name: `Empréstimo ${i}`,
      course: `Curso ${i}`,
      startDate: `2024-01-01`,
      endDate: `2024-12-31`,
      returned: Math.random() > 0.5,
    });
  }
  return loanData;
};

const loans = generateLoans(100);

// Função para manipular exclusão
const handleDelete = (id: string) => {
  toast({
    title: "Empréstimo excluído",
    description: `O empréstimo com ID ${id} foi excluído.`,
  });
};

export const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-black">{row.getValue("id")}</span>,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "course",
    header: "Série/Curso",
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("course")}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Data Início",
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("startDate")}</span>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Data Fim",
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("endDate")}</span>
    ),
  },
  {
    accessorKey: "returned",
    header: "Devolvido",
    cell: ({ row }: any) => (
      <div className={row.getValue("returned") ? "" : ""}>
        <span
          className={
            row.getValue("returned")
              ? "bg-green-200 py-1 px-2 rounded text-green-600"
              : "bg-red-200 py-1 px-2 rounded text-red-600"
          }
        >
          {row.getValue("returned") ? "Sim" : "Não"}
        </span>
      </div>
    ),
  },

  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <FileEdit className="h-4 w-4 text-blue-500" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar Empréstimo</SheetTitle>
              <SheetClose />
            </SheetHeader>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {/* ID do Empréstimo e Nome */}
                <div>
                  <Label htmlFor="id" className="text-black">
                    ID*
                  </Label>
                  <Input
                    id="id"
                    placeholder="Digite o ID do empréstimo"
                    defaultValue={row.getValue("id")}
                    disabled
                    className="border border-zinc-500 bg-gray-200 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-black">
                    Nome*
                  </Label>
                  <Input
                    id="name"
                    placeholder="Digite o nome do empréstimo"
                    defaultValue={row.getValue("name")}
                    className="border border-zinc-500"
                  />
                </div>
              </div>

              {/* Série/Curso */}
              <div className="grid grid-cols-1">
                <SelectDropdown
                  label="Curso/Série*"
                  items={[
                    "Todos",
                    "1 ADM",
                    "1 INFOR",
                    "1 REDES",
                    "1 TST",
                    "2 ADM",
                    "2 INFOR",
                    "2 REDES",
                    "2 TST",
                    "3 ADM",
                    "3 INFOR",
                    "3 REDES",
                    "3 TST",
                    "3 CONT",
                  ]}
                  defaultValue="Todos"
                  onSelect={(value) => value}
                />
              </div>

              {/* Data Início e Data Fim */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate" className="text-black">
                    Data Início*
                  </Label>
                  <Input
                    id="startDate"
                    placeholder="Digite a data de início"
                    defaultValue={row.getValue("startDate")}
                    className="border border-zinc-500"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-black">
                    Data Fim*
                  </Label>
                  <Input
                    id="endDate"
                    placeholder="Digite a data de fim"
                    defaultValue={row.getValue("endDate")}
                    className="border border-zinc-500"
                  />
                </div>
              </div>

              {/* Devolvido */}
              <div className="grid grid-cols-1">
                <div>
                  <Label htmlFor="returned" className="text-black">
                    Devolvido*
                  </Label>
                  <Select
                    defaultValue={row.getValue("returned") ? "Sim" : "Não"}
                  >
                    <SelectTrigger className="border border-zinc-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sim">Sim</SelectItem>
                      <SelectItem value="Não">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Botão de Salvar */}
              <Button className="w-full bg-green-500 hover:bg-green-600 tezt ">
                Salvar
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash className="h-5 w-5 text-red-600" />
            </Button>
          </DialogTrigger>

          {/* Dialog Overlay - Fundo escuro */}
          <DialogOverlay className="fixed inset-0 w-full bg-black bg-opacity-50 z-40" />

          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-100 p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md z-50">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800">
                Confirmar Exclusão
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Tem certeza que deseja excluir este item? Essa ação não poderá
                ser desfeita.
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 border-t border-gray-300" />

            <div className="flex items-center justify-end space-x-4">
              {/* Botão Cancelar para fechar o Dialog */}
              <Button className="text-black font-semibold px-4 py-2 rounded-md bg-white hover:bg-zinc-100 border border-zinc-400">
                Cancelar
              </Button>

              {/* Botão Excluir */}
              <Button
                onClick={() => handleDelete(row.getValue("id"))}
                className="text-white bg-red-600 font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Excluir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

export function Loan() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [courseFilter, setCourseFilter] = React.useState<string | null>(null);

  const filteredLoans = courseFilter
    ? loans.filter((loan) => loan.course === courseFilter)
    : loans;

  const table = useReactTable({
    data: filteredLoans,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const courses = [
    "Todos",
    "1 ADM",
    "1 INFOR",
    "1 REDES",
    "1 TST",
    "2 ADM",
    "2 INFOR",
    "2 REDES",
    "2 TST",
    "3 ADM",
    "3 INFOR",
    "3 REDES",
    "3 TST",
    "3 CONT",
  ];
  return (
    <DataTable
      data={filteredLoans}
      columns={columns}
      filterLabel="Curso"
      filterItems={courses}
      filterKey="course"
    />
  );
}
