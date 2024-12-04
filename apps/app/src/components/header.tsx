import { useState, useEffect, useCallback } from "react";
import { getProfile, updateProfile } from "../services/auth/auth-service";
import { Drawer, Button, Form, Input } from "rsuite";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import socketService, { Notification } from "../services/socket/socket-service";

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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: "",
    institution: "",
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);


  const fetchProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        profilePicture: data.profilePicture,
        institution: data.institution,
      });
    } catch {
      if (!handleLogout) {
        toast.error("Erro ao buscar perfil.");
      }
    }
  }, []);

  const handleNotifications = (newNotifications: Notification[]) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...newNotifications,
    ]);
    toast.info(`Você tem ${newNotifications.length} novas notificações!`);
  };


  useEffect(() => {
    fetchProfile();


    socketService.connect();
    socketService.onOverdueNotifications(handleNotifications);


    return () => {
      socketService.disconnect();
    };
  }, [fetchProfile]);

  const getFirstName = (name: string | undefined) => {
    return name?.split(" ")[0] || "Usuário";
  };

  const getInstitutionName = (institution: string | undefined) => {
    if (!institution) return "Instituição desconhecida";
    const words = institution.split(" ");
    return words.slice(0, 3).join(" ");
  };

  const handleInputChange = (value: string, name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (formData: { name: string; profilePicture: string; institution: string }) =>
      updateProfile(profile?.id || "", formData),
    onSuccess: () => {
      setProfile({
        ...profile!,
        ...formData,
      });
      setOpenDrawer(false);
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil!");
    },
  });

  const handleSave = () => {
    mutation.mutate(formData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <header className="container-fluid d-flex justify-content-end py-2 px-5">
        <div className="d-flex align-items-center gap-3">
          {profile ? (
            <>
              <img
                src={profile.profilePicture || "/default-avatar.jpg"}
                alt={profile.name || "Foto de Perfil"}
                className="rounded-circle img-fluid"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />

              <div className="text-right m-0">
                <small className="m-0 p-0 text-white">
                  Olá, {getFirstName(profile.name)}
                </small>
                <span className="d-block m-0 p-0 text-white">
                  {getInstitutionName(profile.institution)}
                </span>
              </div>

              {notifications.length > 0 && (
                <Button className="px-2 py-0 bg-danger text-white shadow-none border-0">
                  {notifications.length > 99 ? "99+" : notifications.length} Novas
                </Button>
              )}
            </>
          ) : (
            <div>
              <span className="text-white">Carregando...</span>
            </div>
          )}

          <Button
            className="px-0 py-0 bg-transparent shadow-none border-0"
            onClick={() => setOpenDrawer(true)}
          >
            <span className="mdi mdi-chevron-down text-white fs-5"></span>
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-transparent border-0 text-white"
            style={{ fontSize: "14px", padding: "5px" }}
          >
            <i className="mdi mdi-logout"></i> Sair
          </Button>
        </div>
      </header>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Drawer.Header>
          <Drawer.Title>Editar Perfil</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <Form fluid>
            <div className="row mb-3">
              {/* Nome */}
              <div className="col-12 col-md-6">
                <Form.Group>
                  <Form.ControlLabel>Nome</Form.ControlLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={(value) => handleInputChange(value, "name")}
                    placeholder="Digite o nome"
                  />
                </Form.Group>
              </div>

              {/* Instituição */}
              <div className="col-12 col-md-6">
                <Form.Group>
                  <Form.ControlLabel>Instituição</Form.ControlLabel>
                  <Input
                    name="institution"
                    value={formData.institution}
                    onChange={(value) => handleInputChange(value, "institution")}
                    placeholder="Digite o nome da instituição"
                  />
                </Form.Group>
              </div>
            </div>

            {/* Foto de Perfil (URL) */}
            <div className="row mb-3">
              <div className="col-12">
                <Form.Group>
                  <Form.ControlLabel>Foto de Perfil (URL)</Form.ControlLabel>
                  <Input
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={(value) => handleInputChange(value, "profilePicture")}
                    placeholder="Digite a URL da foto"
                  />
                </Form.Group>
              </div>
            </div>
          </Form>

          <Drawer.Actions>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
              <Button
                onClick={handleSave}
                block
                disabled={mutation.isPending}
                color="blue"
                appearance="primary"
                className="btn-lg"
                loading={mutation.isPending}
              >
                {mutation.isPending ? "Carregando..." : "Confirmar"}
              </Button>

              <Button
                onClick={() => setOpenDrawer(false)}
                block
                color="red"
                appearance="primary"
                className="btn-lg"
              >
                Cancelar
              </Button>


            </div>
          </Drawer.Actions>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
