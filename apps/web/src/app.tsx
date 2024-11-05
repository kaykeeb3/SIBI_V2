import { NavBar } from "@/components/nav-bar";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Separator } from "./components/ui/separator";

export function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Separator className="bg-zinc-300 w-full" />
      <div className="flex">
        <NavBar />
        <div className="flex-1 flex items-center justify-center text-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
