import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";

export function AppLayout() {
  const location = useLocation();

  const excludedRoutes = ["/sign-in", "/sign-up", "/reset-password"];
  const shouldHideLayout = excludedRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <div className="container-fluid h-100">
        <div className="row h-100">
          {!shouldHideLayout && <Sidebar location={location} />}
          <Outlet />
        </div>
      </div>
    </>
  );
}
