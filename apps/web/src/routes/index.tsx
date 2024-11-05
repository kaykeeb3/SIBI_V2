import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Home } from "@/app/home/home";
import { Book } from "@/app/book";
import { App } from "@/app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
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
      {
        path: "/books",
        element: <Book />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
