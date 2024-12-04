import { Link } from "react-router-dom";
import logo from "/assets/logo-light.svg";
import { Location } from "react-router-dom";

interface SidebarProps {
  location: Location;
}

interface SidebarItem {
  to: string;
  icon: string;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { to: "/", icon: "mdi mdi-finance", label: "Dashboard" },
  { to: "/books", icon: "mdi mdi-bookshelf", label: "Livros" },
  { to: "/loans", icon: "mdi mdi-file-account", label: "Empréstimos" },
  { to: "/equipments", icon: "mdi mdi-desktop-classic", label: "Equipamentos" },
  { to: "/appointments", icon: "mdi mdi-card-account-details-outline", label: "Agendamentos" },
  { to: "/notifications", icon: "mdi mdi-bell-ring-outline", label: "Notificações" },
  { to: "/settings", icon: "mdi mdi-cog", label: "Configurações" },
];

export function Sidebar({ location }: SidebarProps) {
  return (
    <aside className="col-2 h-100">
      <img src={logo} alt="Logo" className="img-fluid px-3 py-4" />


      <ul className="px-3 m-0">
        {sidebarItems.map(({ to, icon, label }) => (
          <li key={to}>
            <Link to={to} className={location.pathname === to ? "active" : ""}>
              <span className={icon}></span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
