import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";

export function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Sidebar location={location} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
