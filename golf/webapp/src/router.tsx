import Home from "@/app";
import ManageAccount from "@/app/account/manage";
import SignIn from "@/app/account/signin";
import Course from "@/app/course";
import AddCourse from "@/app/course/add";
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
        element: <Protected/>,
        children: [
          {path: "manage", element: <ManageAccount/>}
        ]
      },
      {
        path: "/course",
        element: <Protected/>,
        children: [
          {path: "", element: <Course/>},
          {path: "add", element: <AddCourse/>},
        ]
      }
    ]
  },
];

export default createBrowserRouter(routes);