import Home from "@/app/Home";
import MainLayout from "@/components/MainLayout";
import React from "react";
import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const router: RouteObject[] = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/cookbook",
    element: <MainLayout/>,
    children: []
  }
];

export default createBrowserRouter(router);
