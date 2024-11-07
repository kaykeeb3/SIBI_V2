import { Link, useLocation } from "react-router-dom";
import {
  Blend,
  CalendarCheck,
  ClipboardCheck,
  Computer,
  IdCard,
  Library,
  NotebookTextIcon,
  Tv,
  UserPenIcon,
} from "lucide-react";

import Logo from "../public/assets/logo-1.svg";

const navItems = [
  { to: "/books", icon: NotebookTextIcon, label: "Books" },
  { to: "/loans", icon: Blend, label: "Loans" },
  { to: "/profile", icon: Tv, label: "Profile" },
  { to: "/settings", icon: ClipboardCheck, label: "Settings" },
  { to: "/calendar", icon: CalendarCheck, label: "Calendar" },
  { to: "/library", icon: Library, label: "Library" },
  { to: "/card", icon: IdCard, label: "Card" },
  { to: "/computer", icon: Computer, label: "Computer" },
  { to: "/user", icon: UserPenIcon, label: "User" },
];

export function NavBar() {
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  return (
    <div className="h-screen bg-card-foreground flex flex-col items-center justify-start w-20 fixed top-0 left-0 z-20">
      <div className="flex flex-col items-center justify-start">
        <div className="p-2">
          <div className="flex items-center justify-center mb-8 mt-4">
            <Link to="/">
              <img src={Logo} className="w-4" />
            </Link>
          </div>

          {navItems.map(({ to, icon: Icon, label }, index) => (
            <div className="mt-4 relative group" key={index}>
              <Link to={to}>
                <div
                  className={`hover:bg-primary/30 transition-all p-3 rounded sm:p-2 ${
                    isActive(to) ? "bg-primary/40" : ""
                  }`}
                >
                  <Icon
                    width={20}
                    className={`text-zinc-300 hover:text-white`}
                  />
                </div>
              </Link>

              <div
                className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-primary/90 text-white text-sm font-medium rounded py-1 px-3 shadow-lg transition-opacity duration-300"
                style={{ whiteSpace: "nowrap" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
