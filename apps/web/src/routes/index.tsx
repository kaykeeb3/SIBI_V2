import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/app/home/home";
import { App } from "@/app";
import { Book } from "@/app/book/book";
import { Loan } from "@/app/loan/loan";
import { SignIn } from "@/app/auth/sign-in";
import { ProtectedRoute } from "@/components/protected-route";
import { SignUp } from "@/app/auth/sign-up";
import { NotFound } from "@/app/404";
import { StatusDashboard } from "@/app/settings/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
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

          {
            path: "/settings",
            element: <StatusDashboard />,
          },
        ],
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
