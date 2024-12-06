import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "../pages/auth/sign-in";
import { AppLayout } from "../pages/_layouts/app";
import { Book } from "../pages/app/book/book";
import { NotFound } from "../pages/404";
import { ProtectedRoute } from "../pages/protected-route";
import { Dashboard } from "../pages/dashboard/dashboard";
import { ResetPassword } from "../pages/auth/reset-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/books",
            element: <Book />,
          },
        ],
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
