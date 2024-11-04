import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";

const router = createBrowserRouter([
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
