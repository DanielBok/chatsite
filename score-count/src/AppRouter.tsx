import Home from "@/pages/home";
import GamePage from "@/pages/home/game";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/game/:gameId",
    element: <GamePage/>
  }
];

export default function AppRouter() {
  return <RouterProvider router={createBrowserRouter(routes)}/>;
}
