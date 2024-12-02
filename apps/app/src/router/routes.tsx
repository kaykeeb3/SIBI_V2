import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
