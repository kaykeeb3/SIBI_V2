import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "../pages/auth/sign-in";
import { AppLayout } from "../pages/_layouts/app";
import { Book } from "../pages/app/book/book";
import { NotFound } from "../pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/books",
        element: <Book />,
      },

    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
