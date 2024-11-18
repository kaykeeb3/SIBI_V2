import { NavBar } from "@/components/nav-bar";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { CustomToaster } from "@/components/custom-toaster";
import { WhatsappButton } from "@/components/whatsapp-button";

export function App() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  return (
    <div className="flex flex-col w-full">
      {!isLoginPage && <Header />}
      {!isLoginPage && <Separator className="bg-zinc-300 w-full" />}
      {!isLoginPage && <WhatsappButton />}
      <div className="flex w-full">
        {!isLoginPage && <NavBar />}
        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>
        <CustomToaster />
      </div>
    </div>
  );
}
