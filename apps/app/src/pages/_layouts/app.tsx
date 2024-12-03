import { useLocation } from "react-router-dom";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";

export function App() {
  const location = useLocation();

  return (
    <div className="text-black h-100">
      <Header />
      <Sidebar location={location} />
    </div>
  );
}
