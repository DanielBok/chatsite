import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";


export default function MainLayout({children}: React.PropsWithChildren) {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header/>
      <div className="container mx-auto p-2 bg-white flex-1">
        {children || <Outlet/>}
      </div>
      <Footer/>
    </div>
  );
}
