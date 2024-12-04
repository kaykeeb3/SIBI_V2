import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import 'rsuite/dist/rsuite.min.css';

import { ToastContainer } from "react-toastify";
import { Routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </QueryClientProvider>
  </React.StrictMode>
);
