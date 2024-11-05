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

const navItems = [
  { to: "/books", icon: NotebookTextIcon },
  { to: "", icon: Blend },
  { to: "", icon: Tv },
  { to: "", icon: ClipboardCheck },
  { to: "", icon: CalendarCheck },
  { to: "", icon: Library },
  { to: "", icon: IdCard },
  { to: "", icon: Computer },
  { to: "", icon: UserPenIcon },
];

export function NavBar() {
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  return (
    <div className="h-screen bg-card-foreground flex flex-col items-center justify-start w-20 fixed top-0 left-0 z-20">
      <div className="flex flex-col items-center justify-start">
        <div className="p-2">
          <div className="flex items-center justify-center mb-8 mt-2">
            <Link to="/">
              <span className="text-3xl text-primary font-semibold">S</span>
            </Link>
          </div>

          {navItems.map(({ to, icon: Icon }, index) => (
            <div className="mt-4" key={index}>
              <Link to={to}>
                <div
                  className={`hover:bg-primary/40 transition-all p-2 rounded ${
                    isActive(to) ? "bg-primary/40" : ""
                  }`}
                >
                  <Icon
                    width={20}
                    className={`text-zinc-300 hover:text-white`}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
