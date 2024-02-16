import "./App.css";
import { useState } from "react";
import Login from "./Pages/Login";
import AppRoutes from "./routes";

const App = () => {
  const [token, setToken] = useState("");

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="h-screen pb-8">
      {token ? <AppRoutes token={token} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
