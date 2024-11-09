import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterForm } from "@/components/register-form";
import { Home } from "@/app/home/home";
import { App } from "@/app";
import { Book } from "@/app/book/book";
import { Loan } from "@/app/loan/loan";
import { Login } from "@/app/login/login";
import { ProtectedRoute } from "@/components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <RegisterForm />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/books",
            element: <Book />,
          },
          {
            path: "/loans",
            element: <Loan />,
          },
        ],
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
