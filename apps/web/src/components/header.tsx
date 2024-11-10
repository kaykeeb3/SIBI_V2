import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { getProfile, updateProfile } from "@/services/auth/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, PowerIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface Profile {
  id: string;
  name: string;
  profilePicture: string;
  email: string;
  institution: string;
  limit: number;
  role: string;
  phone: string;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    try {
      const data = await getProfile();
      setProfile(data);
      setNewName(data.name);
      setNewProfilePicture(data.profilePicture);
      setLoading(false);
    } catch (error: any) {
      setError("Erro ao buscar perfil");
      console.error("Erro ao buscar perfil", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSaveChanges = async () => {
    if (!newName || !newProfilePicture) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (!profile?.id) {
      toast.error("ID do usuário não encontrado!");
      return;
    }

    try {
      await updateProfile(profile.id, {
        name: newName,
        profilePicture: newProfilePicture,
      });

      await fetchProfile();
      setIsEditing(false);
      setIsOpen(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

  const getRoleDescription = (role: string) => {
    return role === "ADMIN" ? "Administrador" : "Usuário Comum";
  };

  return (
    <header className="w-full bg-zinc-100 px-4 py-2 z-10 relative">
      <div className="flex items-center justify-end mr-6">
        <div className="relative mr-6">
          <Bell size={18} />
          <span className="absolute -top-[1px] right-[1px] w-[7px] h-[7px] bg-red-500 rounded-full"></span>
        </div>

        <div className="flex items-center space-x-2">
          {loading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <Avatar>
              <AvatarImage
                src={profile?.profilePicture || "/default-avatar.jpg"}
                alt={profile?.name || "Avatar"}
              />
              <AvatarFallback>
                {getFirstName(profile?.name || "")}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col">
            {loading ? (
              <>
                <Skeleton className="h-4 w-[100px] mb" />
                <Skeleton className="h-4 w-[100px]" />
              </>
            ) : error ? (
              <span className="text-sm text-red-600">{error}</span>
            ) : (
              <>
                <span className="font-semibold text-sm text-black">
                  Olá, {getFirstName(profile?.name || "Usuário")}
                </span>
                <span className="font-normal text-xs text-zinc-800">
                  {getRoleDescription(profile?.role || "USER")}
                </span>
              </>
            )}
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

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetTitle>
            {isEditing ? "Editar Perfil" : "Menu Principal"}
          </SheetTitle>
          {isEditing ? (
            <div className="space-y-4 pt-4">
              <div>
                <p className="text-sm text-gray-600">
                  Você poderá editar apenas as informações como Nome e Foto de
                  Perfil. <br />
                  <br />
                  As demais informações não serão possíveis de editar. <br />
                  Caso tenha alguma dúvida, entre em contato com o{" "}
                  <Link
                    to="/"
                    className="text-primary-600 hover:text-primary-800 underline"
                  >
                    Suporte
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Nome*
                  </Label>
                  <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Digite o nome"
                    className="w-full focus-visible:border-primary border border-zinc-300"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Foto URL*
                  </Label>
                  <Input
                    type="text"
                    value={newProfilePicture}
                    onChange={(e) => setNewProfilePicture(e.target.value)}
                    placeholder="URL da Foto de Perfil"
                    className="w-full focus-visible:border-primary border border-zinc-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="w-24 bg-red-500 hover:bg-red-600 text-white hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  className="w-24 bg-green-500 hover:bg-green-600 text-white"
                >
                  Salvar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-4 h-[90%]">
              <div className="space-y-2 flex-grow">
                <p className="text-sm text-gray-600 mb-4">
                  Aqui você pode gerenciar suas configurações, editar seu perfil
                  ou sair da conta.
                </p>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="w-full bg-white hover:bg-white/40"
                >
                  Editar Perfil
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="w-full bg-white hover:bg-white/40"
                >
                  Fechar Menu
                </Button>
              </div>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 hover:bg-red-700"
              >
                <PowerIcon className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}
