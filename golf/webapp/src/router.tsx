import Home from "@/app";
import ManageAccount from "@/app/account/manage";
import SignIn from "@/app/account/signin";
import Course from "@/app/course";
import AddCourse from "@/app/course/add";
import CoursePerformance from "@/app/performance/course";
import PerformanceLayout from "@/app/performance/PerformanceLayout";
import RangePerformance from "@/app/performance/range";
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
      },
      {
        path: "/performance",
        element: (
          <Protected>
            <PerformanceLayout/>
          </Protected>
        ),
        children: [
          {path: "range", element: <RangePerformance/>},
          {path: "course", element: <CoursePerformance/>},
        ]
      },
    ]
  },
];

export default createBrowserRouter(routes);