import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";
import { PowerIcon } from "lucide-react";

interface EditProfileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  newName: string;
  setNewName: (name: string) => void;
  newProfilePicture: string;
  setNewProfilePicture: (url: string) => void;
  handleSaveChanges: () => void;
  handleLogout: () => void;
}

export function EditProfile({
  isOpen,
  setIsOpen,
  isEditing,
  setIsEditing,
  newName,
  setNewName,
  newProfilePicture,
  setNewProfilePicture,
  handleSaveChanges,
  handleLogout,
}: EditProfileProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-white p-6  max-w-sm mx-auto flex flex-col justify-between h-full">
        <div>
          <SheetTitle className="text-2xl font-semibold text-gray-900">
            {isEditing ? "Editar Perfil" : "Menu de Configurações"}
          </SheetTitle>

          {isEditing ? (
            <div className="space-y-6 pt-4">
              <div className="text-sm text-gray-600">
                <p>
                  Você pode editar seu nome e foto de perfil. As demais
                  informações estão bloqueadas para edição. <br />
                  <br />
                  Caso precise de ajuda, entre em contato com nosso{" "}
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-700 underline"
                  >
                    Suporte
                  </Link>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Nome completo*
                  </Label>
                  <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Foto de Perfil (URL)*
                  </Label>
                  <Input
                    type="text"
                    value={newProfilePicture}
                    onChange={(e) => setNewProfilePicture(e.target.value)}
                    placeholder="URL da Foto de Perfil"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <Button
                  onClick={handleSaveChanges}
                  className="w-full bg-primary text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
                >
                  Salvar alterações
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="destructive"
                  className="w-full bg-red-500 text-white hover:bg-red-600 transition duration-200"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-1 pt-4">
              <div className="text-sm text-gray-600 mb-4">
                Gerencie suas configurações, edite seu perfil ou faça logout da
                sua conta.
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-primary text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
              >
                Editar Perfil
              </Button>
            </div>
          )}
        </div>

        {/* Botão de Logout posicionado no final */}
        <Button
          onClick={handleLogout}
          className="w-full text-black border-none shadow-none mt-auto bg-transparent hover:bg-red-100"
        >
          <PowerIcon className="mr-2 text-red-500" />
          Sair
        </Button>
      </SheetContent>
    </Sheet>
  );
}
