import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "@/routes/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
