import { Link } from "react-router-dom";
import logo from "../assets/logo-light.svg";
import {
  ChartPie,
  Library,
  Blend,
  Monitor,
  IdCard,
} from "lucide-react";

interface SidebarProps {
  location: Location;
}

interface SidebarItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { to: "/", icon: <ChartPie />, label: "Dashboard" },
  { to: "/books", icon: <Library />, label: "Livros" },
  { to: "/loans", icon: <Blend />, label: "Empréstimos" },
  { to: "/equipments", icon: <Monitor />, label: "Equipamentos" },
  { to: "/appointments", icon: <IdCard />, label: "Agendamentos" },
];

export function Sidebar({ location }: SidebarProps) {
  return (
    <aside className="col-2 h-100">
      <img src={logo} alt="Logo" className="img-fluid px-3 py-4" />

      <ul className="p-0 m-0">
        {sidebarItems.map(({ to, icon, label }) => (
          <li key={to}>
            <Link to={to} className={location.pathname === to ? "active" : ""}>
              <span className="icon me-2">{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
