import { useState, useEffect, useCallback, useMemo } from "react";
import { getProfile, updateProfile } from "../services/auth/auth-service";
import { Modal, Button, Form, Input, Avatar } from "rsuite";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import socketService, { Notification } from "../services/socket/socket-service";
import { z } from "zod";

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

const initialFormData = {
  name: "",
  profilePicture: "",
  institution: "",
};

// Schema de validação com Zod
const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  institution: z.string().min(1, "Instituição é obrigatória").max(100, "Instituição muito longa"),
  profilePicture: z.string().url("A URL da foto de perfil é inválida").min(1, "A URL da foto de perfil é obrigatória"),
});

export function Header() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const getFirstName = useCallback(
    (name: string | undefined) => name?.split(" ")[0] || "Usuário",
    []
  );

  const getInstitutionName = useCallback((institution: string | undefined) => {
    if (!institution) return "Instituição desconhecida";
    const words = institution.split(" ");
    return words[0] === "EEEP" || words[0] === "Escola"
      ? words.slice(1, 3).join(" ")
      : words.slice(0, 2).join(" ");
  }, []);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        profilePicture: data.profilePicture,
        institution: data.institution,
      });
    } catch {
      toast.error("Erro ao buscar perfil.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNotifications = useCallback((newNotifications: Notification[]) => {
    setNotifications((prev) => [...prev, ...newNotifications]);
    toast.info(`Você tem ${newNotifications.length} novas notificações!`);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
      socketService.connect();
      socketService.onOverdueNotifications(handleNotifications);
    }

    return () => socketService.disconnect();
  }, [fetchProfile, handleNotifications]);

  const mutation = useMutation({
    mutationFn: (data: typeof initialFormData) =>
      updateProfile(profile?.id || "", data),
    onSuccess: () => {
      setProfile((prev) => ({ ...prev!, ...formData }));
      setOpenModal(false);
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: () => toast.error("Erro ao atualizar perfil!"),
  });

  const handleInputChange = useCallback(
    (value: string, name: string) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    },
    []
  );

  const handleSave = () => {
    try {
      // Valida os dados do formulário com Zod
      profileSchema.parse(formData);
      mutation.mutate(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as { [key: string]: string });
        setFormErrors(errors);
      }
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }, []);

  const renderProfileInfo = useMemo(() => {
    if (isLoading) return <span className="text-white">Carregando...</span>;

    if (profile) {
      return (
        <>
          <div className="px-2">
            <span className="d-block m-0 p-0 text-white">
              Olá, {getFirstName(profile.name)}
            </span>
            <small className="m-0 p-0">
              {getInstitutionName(profile.institution)}
            </small>
          </div>
          <Avatar src={profile.profilePicture || undefined} circle />
          {notifications.length > 0 && (
            <Button className="px-2 py-0 bg-danger text-white shadow-none border-0">
              {notifications.length > 99 ? "99+" : notifications.length} Novas
            </Button>
          )}
        </>
      );
    }
    return null;
  }, [isLoading, profile, notifications, getFirstName, getInstitutionName]);

  return (
    <>
      <header className="container-fluid d-flex justify-content-end">
        <div className="d-flex align-items-center">{renderProfileInfo}</div>

        <Button
          onClick={() => setOpenModal(true)}
          className="px-0 py-0 bg-transparent shadow-none border-0"
        >
          <i className="text-white status-line mdi mdi-chevron-down fs-6"></i>
        </Button>

        <Button
          onClick={handleLogout}
          className="bg-transparent border-0 text-white gap-2"
        >
          <i className="text-white mdi mdi-logout fst-normal text-center"> sair</i>
        </Button>
      </header>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        size="sm"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex justify-content-center">
            <Avatar size="xxl" src={formData.profilePicture || undefined} circle />
          </div>
          <Form fluid className="px-1">
            <Form.Group>
              <Form.ControlLabel>
                Nome<span className="text-danger">*</span>
              </Form.ControlLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={(value) => handleInputChange(value, "name")}
                placeholder="Digite o nome"
              />
              {formErrors.name && <span className="text-danger small mt-1">{formErrors.name}</span>}
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>
                Instituição<span className="text-danger">*</span>
              </Form.ControlLabel>
              <Input
                name="institution"
                value={formData.institution}
                onChange={(value) => handleInputChange(value, "institution")}
                placeholder="Digite o nome da instituição"
              />
              {formErrors.institution && <span className="text-danger small mt-1">{formErrors.institution}</span>}
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>
                Foto de Perfil (URL)<span className="text-danger">*</span>
              </Form.ControlLabel>
              <Input
                name="profilePicture"
                value={formData.profilePicture}
                onChange={(value) => handleInputChange(value, "profilePicture")}
                placeholder="Digite a URL da foto"
              />
              {formErrors.profilePicture && <span className="text-danger small mt-1">{formErrors.profilePicture}</span>}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={handleSave}
            loading={mutation.isPending}
            color="blue"
            appearance="primary"
            block
          >
            {mutation.isPending ? "Carregando..." : "Confirmar"}
          </Button>
          <Button
            onClick={() => setOpenModal(false)}
            color="red"
            appearance="primary"
            block
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
