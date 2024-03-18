import Cookbook from "@/app/Cookbook";
import AddRecipePage from "src/app/Cookbook/add";
import NinjaCookbookContextProvider from "@/app/Cookbook/category/ninja/context";
import CookbookListing from "@/app/Cookbook/category/ninja/CookbookListing";
import RecipeDetail from "@/app/Cookbook/category/ninja/RecipeDetail";
import Home from "@/app/Home";
import ErrorBoundary from "@/components/ErrorBoundary";
import MainLayout from "@/components/MainLayout";
import React from "react";
import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const router: RouteObject[] = [
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorBoundary/>,
  },
  {
    path: "/cookbook",
    element: <MainLayout/>,
    children: [
      {path: "", element: <Cookbook/>},
      {path: "add", element: <AddRecipePage/>},
      {
        path: "ninja",
        element: <NinjaCookbookContextProvider/>,
        children: [
          {path: "", element: <CookbookListing/>},
          {path: ":recipeId", element: <RecipeDetail/>},
        ]
      },
    ]
  }
];

export default createBrowserRouter(router);
