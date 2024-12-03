import { Link } from "react-router-dom";
import logo from "/assets/logo.svg";
import { Location } from "react-router-dom";

interface SidebarProps {
  location: Location;
}

export function Sidebar({ location }: SidebarProps) {
  return (
    <aside className="col-2 h-100">
      <img src={logo} alt="Logo" className="img-fluid px-3 py-4" />

      <ul className="px-3 m-0">
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            <span className="mdi mdi-home-account"></span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/books"
            className={location.pathname === "/books" ? "active" : ""}
          >
            <span className="mdi mdi-bookshelf"></span>
            <span>Livros</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
