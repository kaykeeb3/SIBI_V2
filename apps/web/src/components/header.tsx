import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <header className="w-full bg-zinc-100 px-4 py-2 z-10 relative">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>Olá, Kayke</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm text-black">Olá, Kayke</span>
              <span className="text-xs text-zinc-800">Administrador</span>
            </div>
          </div>

          <button
            onClick={handleOpen}
            className="flex items-center justify-center ml-2"
            aria-label="Abrir menu"
          >
            <ChevronDownIcon className="h-5 w-5 text-black" />
          </button>
        </div>
      </header>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetTitle>Deseja sair?</SheetTitle>
          <p className="text-sm text-zinc-500 mt-1">
            Você realmente deseja sair da sua conta?
          </p>
          <div className="flex justify-end mt-4 space-x-2">
            <Button onClick={handleClose} variant="outline">
              Cancelar
            </Button>
            <Button onClick={() => {}} variant="destructive">
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
