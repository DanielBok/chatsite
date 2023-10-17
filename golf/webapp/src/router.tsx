import Home from "@/app";
import ManageAccount from "@/app/account/manage";
import SignIn from "@/app/account/signin";
import ErrorBoundary from "@/components/ErrorBoundary";
import MainLayout from "@/components/MainLayout";
import Protected from "@/components/MainLayout/Protected";
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
      {path: "account/signin", element: <SignIn/>},
      {
        path: "/account",
        // eslint-disable-next-line react/jsx-no-undef
        element: <Protected/>,
        children: [
          {path: "manage", element: <ManageAccount/>}
        ]
      }
    ]
  },
];

export default createBrowserRouter(routes);