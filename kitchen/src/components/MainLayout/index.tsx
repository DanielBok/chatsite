import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";


export default function MainLayout({children}: React.PropsWithChildren) {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col w-full">
      <Header/>
      <div className="container mx-auto p-2 bg-white flex-1">
        {children || <Outlet/>}
      </div>
    </div>
  );
}
