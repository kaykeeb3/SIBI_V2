import { useState, useEffect } from "react";
import { getProfile } from "../services/auth/auth-service"; // Importe sua função de obter perfil

// Definição do tipo Profile
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, []);

  const getFirstName = (name: string | undefined) => {
    return name?.split(" ")[0] || "Usuário";
  };

  const getInstitutionName = (institution: string | undefined) => {
    if (!institution) return "Instituição desconhecida";
    const words = institution.split(" ");
    return words.slice(0, 3).join(" ");
  };

  return (
    <header className="container-fluid d-flex justify-content-end py-2 px-5">
      <div className="d-flex align-items-center gap-3">
        {profile ? (
          <>
            <div className="px-0 py-0">
              <img
                src={profile.profilePicture || "/default-avatar.jpg"}
                alt={profile.name || "Foto de Perfil"}
                className="rounded-circle img-fluid"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </div>

            <div className="text-right mr-3">
              <small className="m-0 p-0 text-white">Olá, {getFirstName(profile.name)}</small>
              <span className="d-block m-0 p-0 text-white">{getInstitutionName(profile.institution)}</span>
            </div>

          </>
        ) : (
          <div>
            <span className="text-white">
              Carregando...
            </span>
          </div>
        )}

        <button className="px-0 py-0 bg-transparent shadow-none border-0">
          <span className="mdi mdi-chevron-down text-white fs-5"></span>
        </button>
      </div>
    </header>
  );
}
