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
import { ArrowUpDown, FileEdit, Loader2, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import { useState } from "react";
import { SelectDropdown } from "@/components/select-dropdown";
import { DataTable } from "@/components/data-table ";
import { DialogHeader, DialogOverlay } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";

export type Book = {
  id: string;
  name: string;
  number: number;
  author: string;
  genre: string;
  quantity: number;
  available: boolean;
};

const generateBooks = (count: number): Book[] => {
  const bookData: Book[] = [];
  const genres = [
    "Ficção",
    "Não Ficção",
    "Aventura",
    "Romance",
    "Fantasia",
    "Mistério",
    "Ciência",
    "História",
    "Terror",
    "Comédia",
  ];
  for (let i = 1; i <= count; i++) {
    const genre = genres[i % genres.length];
    bookData.push({
      id: String(i),
      name: `Livro ${i}`,
      number: 1000 + i,
      author: `Autor ${i}`,
      genre: genre,
      quantity: Math.floor(Math.random() * 10) + 1,
      available: Math.random() > 0.5,
    });
  }
  return bookData;
};

const books = generateBooks(100);

// Função para manipular exclusão
const handleDelete = (id: string) => {
  toast({
    title: "Livro excluído",
    description: `O livro com ID ${id} foi excluído.`,
  });
};

export const columns: ColumnDef<Book>[] = [
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
    accessorKey: "number",
    header: "Número",
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("number")}</span>
    ),
  },
  {
    accessorKey: "author",
    header: "Autor",
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("author")}</span>
    ),
  },
  {
    accessorKey: "genre",
    header: "Gênero",
    cell: ({ row }) => (
      <span className="text-black">{row.getValue("genre")}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: ({ row }) => (
      <span className="text-center text-black">{row.getValue("quantity")}</span>
    ),
  },
  {
    accessorKey: "available",
    header: "Disponível",
    cell: ({ row }: any) => (
      <div className={row.getValue("available") ? "" : ""}>
        <span
          className={
            row.getValue("available")
              ? "bg-green-200 py-1 px-2 rounded text-green-600"
              : "bg-red-200 py-1 px-2 rounded text-red-600"
          }
        >
          {row.getValue("available") ? "Sim" : "Não"}
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
              <FileEdit className="h-5 w-5 text-blue-600" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar Livro</SheetTitle>
              <SheetClose />
            </SheetHeader>
            <div className="p-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id" className="text-gray-700">
                    ID*
                  </Label>
                  <Input
                    id="id"
                    placeholder="Digite o ID do livro"
                    defaultValue={row.getValue("id")}
                    disabled
                    className="border border-gray-400 bg-gray-200 cursor-not-allowed rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Nome*
                  </Label>
                  <Input
                    id="name"
                    placeholder="Digite o nome do livro"
                    defaultValue={row.getValue("name")}
                    className="border border-gray-400 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="number" className="text-gray-700">
                    Número*
                  </Label>
                  <Input
                    id="number"
                    placeholder="Digite o número"
                    defaultValue={row.getValue("number")}
                    className="border border-gray-400 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="author" className="text-gray-700">
                    Autor*
                  </Label>
                  <Input
                    id="author"
                    placeholder="Digite o nome do autor"
                    defaultValue={row.getValue("author")}
                    className="border border-gray-400 rounded-md"
                  />
                </div>
              </div>

              <div>
                <SelectDropdown
                  label="Gênero*"
                  items={[
                    "Todos",
                    "Ficção",
                    "Não Ficção",
                    "Aventura",
                    "Romance",
                    "Fantasia",
                    "Mistério",
                    "Ciência",
                    "História",
                    "Terror",
                    "Comédia",
                  ]}
                  defaultValue="Todos"
                  onSelect={(value) => value}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-gray-700">
                    Quantidade*
                  </Label>
                  <Input
                    id="quantity"
                    placeholder="Digite a quantidade"
                    defaultValue={row.getValue("quantity")}
                    className="border border-gray-400 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="available" className="text-gray-700">
                    Disponível*
                  </Label>
                  <Select
                    defaultValue={row.getValue("available") ? "Sim" : "Não"}
                  >
                    <SelectTrigger className="border border-gray-400 rounded-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sim">Sim</SelectItem>
                      <SelectItem value="Não">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <Loader2 className="animate-spin" />
                  Salvar
                </Button>
              </div>
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

export function Book() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  const filteredBooks = genreFilter
    ? books.filter((book) => book.genre === genreFilter)
    : books;

  const table = useReactTable({
    data: filteredBooks,
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

  const genres = [
    "Ficção",
    "Não Ficção",
    "Aventura",
    "Romance",
    "Fantasia",
    "Mistério",
    "Ciência",
    "História",
    "Terror",
    "Comédia",
  ];

  return (
    <DataTable
      data={books}
      columns={columns}
      filterLabel="Gênero"
      filterItems={genres}
      filterKey="genre"
    />
  );
}
