import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../app";
import { SignIn } from "../pages/auth/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <NotFound />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}