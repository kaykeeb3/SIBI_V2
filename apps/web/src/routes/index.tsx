import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Home } from "@/app/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
