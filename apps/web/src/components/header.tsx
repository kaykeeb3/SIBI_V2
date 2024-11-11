import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { getProfile, updateProfile } from "@/services/auth/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, BellRing, PowerIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { NotificationDialog } from "./notification-dialog";
import socketService from "@/services/socket/socket-service";
import { Notification } from "@/services/socket/socket-service";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleNotifications = (overdueItems: any[]) => {
    const notifications: Notification[] = overdueItems.map((item) => ({
      id: item.id || crypto.randomUUID(),
      name: item.name || "Notificação",
      message: item.message || "Mensagem não disponível",
      quantity: item.quantity || 0,
      startDate: item.startDate || new Date().toISOString(),
      type: item.type,
    }));

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...notifications,
    ]);
  };

  useEffect(() => {
    fetchProfile();

    socketService.connect();

    socketService.onOverdueNotifications(handleNotifications);

    return () => {
      socketService.disconnect();
    };
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
    window.location.href = "/";
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
        {/* Notificações */}
        <div className="mr-4 items-center justify-center flex group relative">
          <Button
            variant="ghost"
            onClick={() => setIsNotificationOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative p-2 h-12 w-12 hover:bg-zinc-200 transition-all duration-200 rounded-full"
          >
            {isHovered ? (
              <BellRing className="w-6 h-6 text-zinc-700 animate-slight-shake" />
            ) : (
              <Bell className="w-6 h-6 text-zinc-600" />
            )}
            {notifications.length > 0 && (
              <span className="absolute -top-0 -right-1 p-1 inline-flex items-center justify-center font-bold leading-none text-white bg-red-500 rounded-full min-w-[20px] min-h-[20px] text-xs">
                {notifications.length > 99 ? "99+" : notifications.length}
              </span>
            )}
          </Button>
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Notificações
          </span>
        </div>

        {/* Informações do usuário */}
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
                <Skeleton className="h-[16px] w-[100px]" />
                <Skeleton className="h-[14px] w-[100px]" />
              </>
            ) : error ? (
              <span className="text-sm text-red-600">{error}</span>
            ) : (
              <>
                <span className="font-semibold text-base text-black">
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

      {/* Menu de edição */}
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
                  className="w-full border"
                >
                  Editar Perfil
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  <PowerIcon className="mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog de notificações */}
      <NotificationDialog
        notifications={notifications}
        isOpen={isNotificationOpen}
        setIsOpen={setIsNotificationOpen}
      />
    </header>
  );
}
