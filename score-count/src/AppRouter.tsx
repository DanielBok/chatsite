import Home from "@/pages/home";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home/>,
  }
];

export default function AppRouter() {
  return <RouterProvider router={createBrowserRouter(routes)}/>;
}
