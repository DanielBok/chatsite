import Cookbook from "@/app/Cookbook";
import NinjaCookbookContextProvider from "@/app/Cookbook/category/ninja/context";
import CookbookListing from "@/app/Cookbook/category/ninja/CookbookListing";
import RecipeDetail from "@/app/Cookbook/category/ninja/RecipeDetail";
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
    children: [
      {path: "", element: <Cookbook/>},
      {
        path: "ninja",
        element: <NinjaCookbookContextProvider/>,
        children: [
          {path: "", element: <CookbookListing/>},
          {path: ":recipeId", element: <RecipeDetail/>}
        ]
      },
    ]
  }
];

export default createBrowserRouter(router);
