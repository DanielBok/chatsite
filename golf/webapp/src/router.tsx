import Home from "@/app";
import SignIn from "@/app/account/signin";
import ErrorBoundary from "@/components/ErrorBoundary";
import MainLayout from "@/components/MainLayout";
import React from "react";
import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <ErrorBoundary/>,
    children: [
      {path: "", element: <Home/>},
      {path: "account/signin", element: <SignIn/>}
    ]
  }
];

export default createBrowserRouter(routes);