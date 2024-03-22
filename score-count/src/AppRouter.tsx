import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";


const routes: RouteObject[] = [];

export default function AppRouter() {
  return <RouterProvider router={createBrowserRouter(routes)}/>;
}
