import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FilterDropdown } from "./filter-dropdown";
import { FilterInput } from "./filter-input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";

interface DataTableProps {
  data: any[];
  columns: any[];
  filterLabel: string;
  filterItems: string[];
  defaultSorting?: any[];
  filterKey: string;
}

export function DataTable({
  data,
  columns,
  filterLabel,
  filterItems,
  defaultSorting = [],
  filterKey,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState(defaultSorting);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [filterValue, setFilterValue] = React.useState<string | null>(null);

  const filteredData = filterValue
    ? data.filter((item) => item[filterKey]?.includes(filterValue))
    : data;

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-4/5 mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <FilterInput
          placeholder={`Pesquisar por ${filterLabel}`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(value: string) =>
            table.getColumn(filterKey)?.setFilterValue(value)
          }
          columnKey={filterKey}
        />
        <FilterDropdown
          label={filterLabel}
          items={filterItems}
          onItemSelect={setFilterValue}
        />
      </div>

      <div className="overflow-x-auto max-h-[400px]">
        <Table className="min-w-full border border-zinc-200 shadow-sm rounded-lg">
          <TableHeader className="bg-foreground text-primary-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="text-sm font-medium text-center"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-white text-center bg-foreground hover:bg-foreground/80 cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-zinc-200/40 transition-all duration-300 group botder border-foreground/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-sm text-muted-foreground text-center group-hover:text-primary-foreground"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-600">
          Exibindo {table.getState().pagination.pageIndex * 10 + 1} a{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * 10,
            table.getRowModel().rows.length
          )}{" "}
          de {table.getRowModel().rows.length} itens
        </div>

        <Pagination>
          <PaginationContent className="flex items-center justify-center gap-4 py-2">
            {/* Página Anterior */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="flex items-center justify-center p-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-200"
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex - 1)
                }
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Página Anterior</span>
              </PaginationPrevious>
            </PaginationItem>

            {/* Números das páginas */}
            {table.getPageCount() > 5 ? (
              <>
                {/* Página 1 */}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 ${
                      table.getState().pagination.pageIndex === 0
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() => table.setPageIndex(0)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {/* "..." antes do número atual */}
                {table.getState().pagination.pageIndex > 2 && (
                  <PaginationItem>
                    <span className="px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                  </PaginationItem>
                )}

                {/* Páginas próximas */}
                {Array.from({ length: 5 }, (_, i) => {
                  const page = table.getState().pagination.pageIndex + i - 2;
                  if (page >= 1 && page < table.getPageCount()) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 ${
                            table.getState().pagination.pageIndex === page
                              ? "bg-blue-100"
                              : ""
                          }`}
                          onClick={() => table.setPageIndex(page)}
                        >
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                {/* "..." depois da última página exibida */}
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 3 && (
                  <PaginationItem>
                    <span className="px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                  </PaginationItem>
                )}

                {/* Última página */}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 ${
                      table.getState().pagination.pageIndex ===
                      table.getPageCount() - 1
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  >
                    {table.getPageCount()}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : (
              // Se houver 5 ou menos páginas, mostrar todas as páginas
              Array.from({ length: table.getPageCount() }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 ${
                      table.getState().pagination.pageIndex === i
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() => table.setPageIndex(i)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            )}

            {/* Página Seguinte */}
            <PaginationItem>
              <PaginationNext
                href="#"
                className="flex items-center justify-center p-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-200"
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex + 1)
                }
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Próxima Página</span>
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
