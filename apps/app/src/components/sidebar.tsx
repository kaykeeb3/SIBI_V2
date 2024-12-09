import { Link } from "react-router-dom";
import logo from "../assets/logo-light.svg";

interface SidebarProps {
  location: Location;
}

interface SidebarItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { to: "/", icon: <span className="mdi mdi-chart-donut"></span>, label: "Dashboard" },
  { to: "/books", icon: <span className="mdi mdi-bookshelf"></span>, label: "Livros" },
  { to: "/loans", icon: <span className="mdi mdi-account-multiple"></span>, label: "Empréstimos" },
  { to: "/equipments", icon: <span className="mdi mdi-monitor"></span>, label: "Equipamentos" },
  { to: "/appointments", icon: <span className="mdi mdi-calendar-check"></span>, label: "Agendamentos" },
];

export function Sidebar({ location }: SidebarProps) {
  return (
    <aside className="col-2 h-100">
      <img src={logo} alt="Logo" className="img-fluid px-3 py-4" />

      <ul className="p-0 m-0">
        {sidebarItems.map(({ to, icon, label }) => (
          <li key={to}>
            <Link to={to} className={location.pathname === to ? "active" : ""}>
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
