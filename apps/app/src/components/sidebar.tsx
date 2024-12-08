import { Link } from "react-router-dom";
import logo from "../assets/logo-light.svg";

import DonutChartIcon from '@rsuite/icons/DonutChart';
import PageIcon from '@rsuite/icons/Page';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import DeviceIcon from '@rsuite/icons/Device';
import UserBadgeIcon from '@rsuite/icons/UserBadge';

interface SidebarProps {
  location: Location;
}

interface SidebarItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { to: "/", icon: <DonutChartIcon width={20} />, label: "Dashboard" },
  { to: "/books", icon: <PageIcon width={20} />, label: "Livros" },
  { to: "/loans", icon: <UserInfoIcon width={20} />, label: "Empréstimos" },
  { to: "/equipments", icon: <DeviceIcon width={20} />, label: "Equipamentos" },
  { to: "/appointments", icon: <UserBadgeIcon width={20} />, label: "Agendamentos" },
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
