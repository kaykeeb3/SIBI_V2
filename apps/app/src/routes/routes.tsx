import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "../pages/auth/sign-in";
import { App } from "../pages/_layouts/app";

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